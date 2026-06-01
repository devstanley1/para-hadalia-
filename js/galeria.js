const STORAGE_KEY = 'museu_da_deusa_fotos';
const SUPABASE_URL = 'https://mohmrkrtewdzrnkcjpkp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vaG1ya3J0ZXdkenJua2NqcGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTI4MDAsImV4cCI6MjA5NTg4ODgwMH0.imcufHrEIV8GUCUbenwahHosuxZBG0k7y1RHecLYaGY';
const SUPABASE_TABLE = 'gallery_photos';

const addPhotosBtn = document.getElementById('addPhotosBtn');
const clearPhotosBtn = document.getElementById('clearPhotosBtn');
const exportGalleryBtn = document.getElementById('exportGalleryBtn');
const importGalleryBtn = document.getElementById('importGalleryBtn');
const galleryFileInput = document.getElementById('galleryFileInput');
const cameraFileInput = document.getElementById('cameraFileInput');
const galleryImportInput = document.getElementById('galleryImportInput');
const galleryGrid = document.getElementById('galleryGrid');
const emptyGallery = document.getElementById('emptyGallery');
const zoomModal = document.getElementById('zoomModal');
const zoomImage = document.getElementById('zoomImage');
const closeZoomBtn = document.getElementById('closeZoomBtn');
const captionComposer = document.getElementById('captionComposer');
const captionList = document.getElementById('captionList');
const publishPhotosBtn = document.getElementById('publishPhotosBtn');
const cancelPublishBtn = document.getElementById('cancelPublishBtn');
const gallerySyncNote = document.getElementById('gallerySyncNote');
const sourcePickerModal = document.getElementById('sourcePickerModal');
const chooseCameraBtn = document.getElementById('chooseCameraBtn');
const chooseGalleryBtn = document.getElementById('chooseGalleryBtn');
const closeSourcePickerBtn = document.getElementById('closeSourcePickerBtn');

let supabaseClient = null;
let remoteReady = false;
let syncTimer = null;
let syncInProgress = false;
let applyingRemote = false;
let lastRemoteSnapshot = '';

let draggedIndex = null;
let selectionMode = false;
let selectedIndexes = new Set();
let pendingFiles = [];

function setSyncNote(text, tone) {
    if (!gallerySyncNote) {
        return;
    }
    gallerySyncNote.textContent = text;
    gallerySyncNote.style.color = tone === 'ok' ? '#8af0b1' : tone === 'warn' ? '#f3c78f' : '#9a9a9a';
}

function normalizePhotos(photos) {
    if (!Array.isArray(photos)) {
        return [];
    }

    return photos
        .map((item) => {
            if (typeof item === 'string') {
                return { src: item, caption: '' };
            }
            return {
                src: item && typeof item.src === 'string' ? item.src : '',
                caption: item && typeof item.caption === 'string' ? item.caption : ''
            };
        })
        .filter((item) => item.src.length > 0);
}

function snapshotPhotos(photos) {
    return JSON.stringify(photos.map((item) => ({ src: item.src, caption: item.caption || '' })));
}

function loadPhotos() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        return normalizePhotos(parsed);
    } catch (error) {
        console.error('Erro ao carregar fotos da galeria:', error);
        return [];
    }
}

function savePhotosLocal(photos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizePhotos(photos)));
}

function persistPhotos(photos, options = {}) {
    savePhotosLocal(photos);
    if (!options.skipRemote) {
        scheduleRemoteSync(normalizePhotos(photos));
    }
}

function renderGallery() {
    const photos = loadPhotos();
    galleryGrid.innerHTML = '';

    clearPhotosBtn.textContent = selectionMode
        ? `Remover selecionadas (${selectedIndexes.size})`
        : 'Selecionar para remover';

    if (photos.length === 0) {
        selectionMode = false;
        selectedIndexes = new Set();
        clearPhotosBtn.textContent = 'Selecionar para remover';
        emptyGallery.style.display = 'block';
        return;
    }

    emptyGallery.style.display = 'none';

    photos.forEach((photoData, index) => {
        const card = document.createElement('article');
        card.className = 'photo-card';
        card.draggable = !selectionMode;
        card.dataset.index = String(index);
        card.style.setProperty('--tilt', `${((index % 5) - 2) * 0.8}deg`);

        if (selectionMode) {
            card.classList.add('selection-mode');
        }
        if (selectedIndexes.has(index)) {
            card.classList.add('selected');
        }

        const image = document.createElement('img');
        image.src = photoData.src;
        image.alt = `Foto ${index + 1} da galeria`;
        image.addEventListener('click', () => {
            if (selectionMode) {
                toggleSelection(index);
                return;
            }
            openZoom(photoData.src, index + 1);
        });

        const footer = document.createElement('div');
        footer.className = 'photo-card-footer';

        const caption = document.createElement('span');
        caption.className = 'photo-caption';
        caption.textContent = (photoData.caption || '').trim() || '\u00a0';

        footer.appendChild(caption);
        card.appendChild(image);
        card.appendChild(footer);

        card.addEventListener('dragstart', () => {
            if (selectionMode) {
                return;
            }
            draggedIndex = index;
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            card.classList.remove('drag-over');
            draggedIndex = null;
        });

        card.addEventListener('dragover', (event) => {
            if (selectionMode) {
                return;
            }
            event.preventDefault();
            card.classList.add('drag-over');
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over');
        });

        card.addEventListener('drop', (event) => {
            if (selectionMode) {
                return;
            }
            event.preventDefault();
            card.classList.remove('drag-over');
            if (draggedIndex === null || draggedIndex === index) {
                return;
            }
            movePhoto(draggedIndex, index);
        });

        galleryGrid.appendChild(card);
    });
}

function toggleSelection(index) {
    if (selectedIndexes.has(index)) {
        selectedIndexes.delete(index);
    } else {
        selectedIndexes.add(index);
    }
    renderGallery();
}

function movePhoto(fromIndex, toIndex) {
    const photos = loadPhotos();
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= photos.length || toIndex >= photos.length) {
        return;
    }

    const [moved] = photos.splice(fromIndex, 1);
    photos.splice(toIndex, 0, moved);
    persistPhotos(photos);
    renderGallery();
}

function openZoom(src, index) {
    if (!zoomModal || !zoomImage) {
        return;
    }
    zoomImage.src = src;
    zoomImage.alt = `Foto ${index} ampliada`;
    zoomModal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    if (!zoomModal || !zoomImage) {
        return;
    }
    zoomModal.hidden = true;
    zoomImage.src = '';
    document.body.style.overflow = '';
}

function filesToDataUrls(files) {
    const jobs = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });
    return Promise.all(jobs);
}

function openSourcePicker() {
    if (sourcePickerModal) {
        sourcePickerModal.hidden = false;
    }
}

function closeSourcePicker() {
    if (sourcePickerModal) {
        sourcePickerModal.hidden = true;
    }
}

function openNativePicker(inputElement) {
    if (!inputElement) {
        return;
    }
    if (typeof inputElement.showPicker === 'function') {
        try {
            inputElement.showPicker();
            return;
        } catch (error) {
            // fallback
        }
    }
    inputElement.click();
}

function handlePickedFiles(fileList) {
    if (!fileList || fileList.length === 0) {
        return;
    }
    pendingFiles = Array.from(fileList);
    renderCaptionComposer();
}

function renderCaptionComposer() {
    if (!captionComposer || !captionList) {
        return;
    }

    if (pendingFiles.length === 0) {
        captionComposer.hidden = true;
        captionList.innerHTML = '';
        return;
    }

    captionComposer.hidden = false;
    captionList.innerHTML = '';

    pendingFiles.forEach((file, index) => {
        const row = document.createElement('article');
        row.className = 'caption-item';

        const preview = document.createElement('img');
        preview.src = URL.createObjectURL(file);
        preview.alt = `Preview ${index + 1}`;
        preview.addEventListener('load', () => URL.revokeObjectURL(preview.src));

        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 80;
        input.placeholder = 'Digite a legenda dessa foto';
        input.dataset.captionIndex = String(index);

        row.appendChild(preview);
        row.appendChild(input);
        captionList.appendChild(row);
    });
}

async function publishPendingPhotos() {
    if (pendingFiles.length === 0) {
        return;
    }

    try {
        const dataUrls = await filesToDataUrls(pendingFiles);
        const captionInputs = captionList ? captionList.querySelectorAll('input[data-caption-index]') : [];
        const current = loadPhotos();

        const incoming = dataUrls.map((src, index) => {
            const input = Array.from(captionInputs).find((item) => Number(item.dataset.captionIndex) === index);
            return {
                src,
                caption: input ? input.value.trim() : ''
            };
        });

        const updated = current.concat(incoming).slice(0, 120);
        persistPhotos(updated);
        pendingFiles = [];
        renderCaptionComposer();
        renderGallery();
    } catch (error) {
        console.error('Erro ao adicionar fotos:', error);
        alert('Nao foi possivel adicionar as fotos. Tente novamente.');
    }
}

async function fetchRemotePhotos() {
    if (!supabaseClient) {
        return [];
    }

    const { data, error } = await supabaseClient
        .from(SUPABASE_TABLE)
        .select('src, caption, position')
        .order('position', { ascending: true });

    if (error) {
        throw error;
    }

    return normalizePhotos(data || []);
}

async function replaceRemotePhotos(photos) {
    if (!supabaseClient) {
        return;
    }

    await supabaseClient.from(SUPABASE_TABLE).delete().gte('position', 0);

    if (photos.length === 0) {
        return;
    }

    const payload = photos.map((item, index) => ({
        position: index,
        src: item.src,
        caption: item.caption || ''
    }));

    const { error } = await supabaseClient.from(SUPABASE_TABLE).insert(payload);
    if (error) {
        throw error;
    }
}

function scheduleRemoteSync(photos) {
    if (!remoteReady || applyingRemote) {
        return;
    }

    if (syncTimer) {
        clearTimeout(syncTimer);
    }

    syncTimer = setTimeout(async () => {
        if (!remoteReady || syncInProgress) {
            return;
        }

        syncInProgress = true;
        try {
            await replaceRemotePhotos(photos);
            lastRemoteSnapshot = snapshotPhotos(photos);
            setSyncNote('Sincronizacao em tempo real: online', 'ok');
        } catch (error) {
            console.error('Erro ao sincronizar no Supabase:', error);
            setSyncNote('Sincronizacao com falha. Verifique tabela/permissoes no Supabase.', 'warn');
        } finally {
            syncInProgress = false;
        }
    }, 400);
}

async function applyRemoteToLocal() {
    if (!remoteReady || syncInProgress) {
        return;
    }

    try {
        const remotePhotos = await fetchRemotePhotos();
        const remoteSnapshot = snapshotPhotos(remotePhotos);

        if (remoteSnapshot === lastRemoteSnapshot) {
            return;
        }

        applyingRemote = true;
        savePhotosLocal(remotePhotos);
        lastRemoteSnapshot = remoteSnapshot;
        renderGallery();
        setSyncNote('Sincronizacao em tempo real: online', 'ok');
    } catch (error) {
        console.error('Erro ao receber atualizacao remota:', error);
        setSyncNote('Sincronizacao com falha. Verifique tabela/permissoes no Supabase.', 'warn');
    } finally {
        applyingRemote = false;
    }
}

async function initialRemoteSync() {
    if (!remoteReady) {
        return;
    }

    try {
        const remotePhotos = await fetchRemotePhotos();
        const localPhotos = loadPhotos();

        if (remotePhotos.length > 0) {
            savePhotosLocal(remotePhotos);
            lastRemoteSnapshot = snapshotPhotos(remotePhotos);
            renderGallery();
        } else if (localPhotos.length > 0) {
            await replaceRemotePhotos(localPhotos);
            lastRemoteSnapshot = snapshotPhotos(localPhotos);
        }

        setSyncNote('Sincronizacao em tempo real: online', 'ok');
    } catch (error) {
        console.error('Erro na sincronizacao inicial:', error);
        setSyncNote('Sincronizacao indisponivel. Usando modo local neste aparelho.', 'warn');
    }
}

function setupSupabase() {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        setSyncNote('Biblioteca do Supabase nao carregou. Usando modo local.', 'warn');
        return;
    }

    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        remoteReady = true;
        setSyncNote('Sincronizacao em tempo real: conectando...');
    } catch (error) {
        console.error('Erro ao iniciar Supabase:', error);
        setSyncNote('Nao foi possivel iniciar sincronizacao em tempo real.', 'warn');
        remoteReady = false;
    }
}

function startRealtimeListeners() {
    if (!remoteReady || !supabaseClient) {
        return;
    }

    supabaseClient
        .channel('gallery-photos-live')
        .on('postgres_changes', { event: '*', schema: 'public', table: SUPABASE_TABLE }, () => {
            applyRemoteToLocal();
        })
        .subscribe();

    setInterval(() => {
        applyRemoteToLocal();
    }, 4000);
}

function bindEvents() {
    addPhotosBtn.addEventListener('click', openSourcePicker);

    if (chooseCameraBtn) {
        chooseCameraBtn.addEventListener('click', () => {
            closeSourcePicker();
            openNativePicker(cameraFileInput);
        });
    }

    if (chooseGalleryBtn) {
        chooseGalleryBtn.addEventListener('click', () => {
            closeSourcePicker();
            openNativePicker(galleryFileInput);
        });
    }

    if (closeSourcePickerBtn) {
        closeSourcePickerBtn.addEventListener('click', closeSourcePicker);
    }

    if (sourcePickerModal) {
        sourcePickerModal.addEventListener('click', (event) => {
            if (event.target === sourcePickerModal) {
                closeSourcePicker();
            }
        });
    }

    galleryFileInput.addEventListener('change', (event) => {
        handlePickedFiles(event.target.files);
        galleryFileInput.value = '';
    });

    cameraFileInput.addEventListener('change', (event) => {
        handlePickedFiles(event.target.files);
        cameraFileInput.value = '';
    });

    clearPhotosBtn.addEventListener('click', () => {
        const photos = loadPhotos();
        if (photos.length === 0) {
            return;
        }

        if (!selectionMode) {
            selectionMode = true;
            selectedIndexes = new Set();
            renderGallery();
            return;
        }

        if (selectedIndexes.size === 0) {
            alert('Selecione as fotos que deseja remover.');
            return;
        }

        const confirmed = confirm('Deseja remover as fotos selecionadas?');
        if (!confirmed) {
            return;
        }

        const updated = photos.filter((_, index) => !selectedIndexes.has(index));
        persistPhotos(updated);
        selectionMode = false;
        selectedIndexes = new Set();
        renderGallery();
    });

    if (publishPhotosBtn) {
        publishPhotosBtn.addEventListener('click', publishPendingPhotos);
    }

    if (cancelPublishBtn) {
        cancelPublishBtn.addEventListener('click', () => {
            pendingFiles = [];
            renderCaptionComposer();
        });
    }

    if (exportGalleryBtn) {
        exportGalleryBtn.addEventListener('click', () => {
            const photos = loadPhotos();
            if (photos.length === 0) {
                alert('Nao ha fotos para exportar.');
                return;
            }

            const payload = {
                version: 1,
                exportedAt: new Date().toISOString(),
                photos
            };

            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'museu-da-deusa-galeria.json';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(link.href);
        });
    }

    if (importGalleryBtn && galleryImportInput) {
        importGalleryBtn.addEventListener('click', () => galleryImportInput.click());
        galleryImportInput.addEventListener('change', async (event) => {
            const file = event.target.files && event.target.files[0];
            if (!file) {
                return;
            }

            try {
                const text = await file.text();
                const parsed = JSON.parse(text);
                const incoming = normalizePhotos(parsed.photos);

                if (incoming.length === 0) {
                    alert('Arquivo invalido ou sem fotos.');
                    return;
                }

                persistPhotos(incoming.slice(0, 120));
                selectionMode = false;
                selectedIndexes = new Set();
                renderGallery();
                alert('Galeria importada com sucesso neste celular.');
            } catch (error) {
                console.error('Erro ao importar galeria:', error);
                alert('Nao foi possivel importar esse arquivo.');
            } finally {
                galleryImportInput.value = '';
            }
        });
    }

    galleryGrid.addEventListener('click', (event) => {
        if (!selectionMode) {
            return;
        }

        const card = event.target.closest('.photo-card');
        if (!card) {
            return;
        }

        const index = Number(card.dataset.index);
        if (Number.isNaN(index)) {
            return;
        }

        toggleSelection(index);
    });

    if (closeZoomBtn) {
        closeZoomBtn.addEventListener('click', closeZoom);
    }

    if (zoomModal) {
        zoomModal.addEventListener('click', (event) => {
            if (event.target === zoomModal) {
                closeZoom();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sourcePickerModal && !sourcePickerModal.hidden) {
            closeSourcePicker();
            return;
        }

        if (event.key === 'Escape' && zoomModal && !zoomModal.hidden) {
            closeZoom();
            return;
        }

        if (event.key === 'Escape' && selectionMode) {
            selectionMode = false;
            selectedIndexes = new Set();
            renderGallery();
        }
    });
}

renderGallery();
bindEvents();
setupSupabase();
initialRemoteSync();
startRealtimeListeners();
