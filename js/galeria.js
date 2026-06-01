const STORAGE_KEY = 'museu_da_deusa_fotos';

const addPhotosBtn = document.getElementById('addPhotosBtn');
const clearPhotosBtn = document.getElementById('clearPhotosBtn');
const fileInput = document.getElementById('galleryFileInput');
const galleryGrid = document.getElementById('galleryGrid');
const emptyGallery = document.getElementById('emptyGallery');
const zoomModal = document.getElementById('zoomModal');
const zoomImage = document.getElementById('zoomImage');
const closeZoomBtn = document.getElementById('closeZoomBtn');

let draggedIndex = null;

function loadPhotos() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Erro ao carregar fotos da galeria:', error);
        return [];
    }
}

function savePhotos(photos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

function renderGallery() {
    const photos = loadPhotos();
    galleryGrid.innerHTML = '';

    if (photos.length === 0) {
        emptyGallery.style.display = 'block';
        return;
    }

    emptyGallery.style.display = 'none';

    photos.forEach((photoSrc, index) => {
        const card = document.createElement('article');
        card.className = 'photo-card';
        card.draggable = true;
        card.dataset.index = String(index);
        const tilt = ((index % 5) - 2) * 0.8;
        card.style.setProperty('--tilt', `${tilt}deg`);

        const image = document.createElement('img');
        image.src = photoSrc;
        image.alt = `Foto ${index + 1} da galeria`;
        image.addEventListener('click', () => openZoom(photoSrc, index + 1));

        const footer = document.createElement('div');
        footer.className = 'photo-card-footer';

        const label = document.createElement('span');
        label.className = 'photo-label';
        label.textContent = `Foto ${index + 1}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-photo-btn';
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remover';
        removeBtn.addEventListener('click', () => {
            const current = loadPhotos();
            current.splice(index, 1);
            savePhotos(current);
            renderGallery();
        });

        footer.appendChild(label);
        footer.appendChild(removeBtn);

        card.addEventListener('dragstart', () => {
            draggedIndex = index;
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            card.classList.remove('drag-over');
            draggedIndex = null;
        });

        card.addEventListener('dragover', (event) => {
            event.preventDefault();
            card.classList.add('drag-over');
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over');
        });

        card.addEventListener('drop', (event) => {
            event.preventDefault();
            card.classList.remove('drag-over');
            if (draggedIndex === null || draggedIndex === index) {
                return;
            }
            movePhoto(draggedIndex, index);
        });

        card.appendChild(image);
        card.appendChild(footer);
        galleryGrid.appendChild(card);
    });
}

function movePhoto(fromIndex, toIndex) {
    const photos = loadPhotos();
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= photos.length || toIndex >= photos.length) {
        return;
    }
    const [moved] = photos.splice(fromIndex, 1);
    photos.splice(toIndex, 0, moved);
    savePhotos(photos);
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

addPhotosBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
        return;
    }

    try {
        const dataUrls = await filesToDataUrls(files);
        const current = loadPhotos();
        const updated = current.concat(dataUrls).slice(0, 120);
        savePhotos(updated);
        renderGallery();
    } catch (error) {
        console.error('Erro ao adicionar fotos:', error);
        alert('Nao foi possivel adicionar as fotos. Tente novamente.');
    } finally {
        fileInput.value = '';
    }
});

clearPhotosBtn.addEventListener('click', () => {
    const confirmed = confirm('Tem certeza que deseja remover todas as fotos da galeria?');
    if (!confirmed) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    renderGallery();
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
    if (event.key === 'Escape' && zoomModal && !zoomModal.hidden) {
        closeZoom();
    }
});

renderGallery();
