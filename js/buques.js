const bouquetPhotos = [
    {
        src: '../assets/buque/IMG-20260220-WA0118(2).jpg',
        title: 'Buquê 1',
        caption: 'Um buquê para marcar um momento lindo da nossa história.'
    },
    {
        src: '../assets/buque/IMG-20260721-WA0055.jpg',
        title: 'Buquê 2',
        caption: 'Flores escolhidas com carinho para ela sorrir ainda mais.'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0041.jpg',
        title: 'Buquê 3',
        caption: 'Mais um gesto de amor entregue em forma de flores.'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0040.jpg',
        title: 'Buquê 4',
        caption: 'Cada detalhe desse buquê foi pensando nela.'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0043.jpg',
        title: 'Buquê 5',
        caption: 'Um buquê para lembrar que amar também é surpreender.'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0044.jpg',
        title: 'Buquê 6',
        caption: 'Flores para deixar o dia dela ainda mais bonito.'
    },
    {
        src: '../assets/buque/VID-20260722-WA0042.jpg',
        title: 'Buquê 7',
        caption: 'Mais um buquê entregue com amor de verdade.'
    }
];

const bouquetGrid = document.getElementById('bouquetGrid');
const zoomModal = document.getElementById('zoomModal');
const zoomImage = document.getElementById('zoomImage');
const zoomCaption = document.getElementById('zoomCaption');
const closeZoomBtn = document.getElementById('closeZoomBtn');

function openZoom(photo) {
    if (!zoomModal || !zoomImage || !zoomCaption) {
        return;
    }

    zoomImage.src = photo.src;
    zoomImage.alt = photo.title;
    zoomCaption.textContent = `${photo.title} - ${photo.caption}`;
    zoomModal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    if (!zoomModal || !zoomImage || !zoomCaption) {
        return;
    }

    zoomModal.hidden = true;
    zoomImage.src = '';
    zoomCaption.textContent = '';
    document.body.style.overflow = '';
}

function renderBouquets() {
    if (!bouquetGrid) {
        return;
    }

    bouquetGrid.innerHTML = '';

    bouquetPhotos.forEach((photo, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'bouquet-card';
        card.style.setProperty('--tilt', `${((index % 5) - 2) * 0.8}deg`);
        card.setAttribute('aria-label', `Abrir ${photo.title}`);

        const image = document.createElement('img');
        image.src = photo.src;
        image.alt = photo.title;

        const footer = document.createElement('div');
        footer.className = 'bouquet-card-footer';

        const title = document.createElement('strong');
        title.textContent = photo.title;

        const caption = document.createElement('span');
        caption.textContent = photo.caption;

        footer.appendChild(title);
        footer.appendChild(caption);
        card.appendChild(image);
        card.appendChild(footer);

        card.addEventListener('click', () => openZoom(photo));

        bouquetGrid.appendChild(card);
    });
}

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

renderBouquets();