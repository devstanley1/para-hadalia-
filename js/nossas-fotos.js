const mediaFiles = [
    '20260906_151623.jpg',
    '20260906_181119.jpg',
    '20260907_131339.jpg',
    '20260907_171628_001.jpg',
    'IMG-20260906-WA0066.jpg',
    'IMG-20260906-WA0091.jpg',
    'IMG-20260906-WA0021.jpg',
    'IMG-20260906-WA0023.jpg',
    'IMG-20260906-WA0053.jpg',
    'AISelect_20260907_005205_Gallery.jpg',
    'IMG-20260906-WA0060.jpg',
    'IMG-20260906-WA0073.jpg',
    'IMG-20260906-WA0084.jpg',
    'IMG-20260907-WA0035.jpg',
    'IMG-20260907-WA0038.jpg',
    'IMG-20260907-WA0039.jpg',
    'IMG-20260907-WA0044.jpg',
    'IMG-20260908-WA0064.jpg',
    'IMG-20260906-WA0086.jpg',
    'IMG-20260907-WA0036.jpg',
    'IMG-20260907-WA0040.jpg',
    'IMG-20260907-WA0043.jpg',
    'IMG-20260907-WA0046.jpg'
];

const memoriesGrid = document.getElementById('memoriesGrid');
const zoomModal = document.getElementById('zoomModal');
const zoomImage = document.getElementById('zoomImage');
const closeZoomBtn = document.getElementById('closeZoomBtn');

function openZoom(src) {
    zoomImage.src = src;
    zoomModal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    zoomModal.hidden = true;
    zoomImage.src = '';
    document.body.style.overflow = '';
}

function startHeartRain() {
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.textContent = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    };

    const createKitty = () => {
        const kitty = document.createElement('img');
        kitty.className = 'kitty-rain';
        kitty.src = '../assets/hello%20kitty.gif';
        kitty.alt = '';
        kitty.style.left = `${Math.random() * 100}vw`;
        kitty.style.width = `${Math.random() * 24 + 28}px`;
        kitty.style.animationDuration = `${Math.random() * 3 + 4}s`;
        document.body.appendChild(kitty);
        setTimeout(() => kitty.remove(), 7000);
    };

    setInterval(createHeart, 600);
    setInterval(createKitty, 1700);
    createHeart();
    createKitty();
}

mediaFiles.forEach((file, index) => {
    const path = `../assets/nossas%20fotos/${encodeURIComponent(file)}`;
    const card = document.createElement('article');
    card.className = 'memory-card';
    card.style.setProperty('--tilt', `${((index % 5) - 2) * 0.8}deg`);

    const image = document.createElement('img');
    image.src = path;
    image.alt = `Nossa memória ${index + 1}`;
    image.loading = 'lazy';
    image.addEventListener('click', () => openZoom(path));
    card.appendChild(image);

    memoriesGrid.appendChild(card);
});

closeZoomBtn.addEventListener('click', closeZoom);
zoomModal.addEventListener('click', (event) => {
    if (event.target === zoomModal) {
        closeZoom();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !zoomModal.hidden) {
        closeZoom();
    }
});

startHeartRain();