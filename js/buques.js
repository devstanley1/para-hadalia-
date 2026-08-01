const bouquetPhotos = [
    {
        src: '../assets/buque/IMG-20260220-WA0118(2).jpg',
        title: 'o primeiro buquê',
        caption: 'Um buquê para marcar um momento lindo da nossa história.❤️❤️❤️'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0041.jpg',
        title: 'Buque avenged sevenfold',
        caption: 'Mais um gesto de amor entregue em forma de flores com a banda favorita da minha Deusa.🤍🖤🤍🖤'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0040.jpg',
        title: 'Buque macaquitos',
        caption: 'Cada detalhe desse buquê foi pensando em você, com os macaquitos que você tanto ama 💜💜💜.'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0043.jpg',
        title: 'Buque do aniversário da minha princesinha',
        caption: 'Um buque para celebrar o aniversario da pessoa que eu mais amo, e a mais especial, importante e preciosa da minha vida.💘💘💘'
    },
    {
        src: '../assets/buque/IMG-20260722-WA0044.jpg',
        title: 'Buque para lembrar o quanto ela é especial',
        caption: 'Flores para deixar o seu dia ainda mais bonito.❤️❤️❤️'
    },
    {
        src: '../assets/buque/VID-20260722-WA0042.jpg',
        title: 'Buque da helllo kitty',
        caption: 'Mais um buquê entregue com amor de verdade, tematico da hello kitty que minha princesinha ama muitooo, seu favorito.🩷🩷🩷'
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