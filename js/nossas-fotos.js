const decorationLayer = document.getElementById('fallingDecorations');
const heartInterval = 650;
const kittyInterval = 1800;

function removeAfterAnimation(element, duration) {
    window.setTimeout(() => element.remove(), duration + 300);
}

function createHeart() {
    const heart = document.createElement('span');
    const duration = Math.random() * 3 + 4;
    heart.className = 'falling-heart';
    heart.textContent = '❤️';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${Math.random() * 18 + 14}px`;
    heart.style.animationDuration = `${duration}s`;
    decorationLayer.appendChild(heart);
    removeAfterAnimation(heart, duration * 1000);
}

function createKitty() {
    const kitty = document.createElement('img');
    const duration = Math.random() * 3 + 5;
    kitty.className = 'falling-kitty';
    kitty.src = '../assets/hello%20kitty.gif';
    kitty.alt = '';
    kitty.style.left = `${Math.random() * 100}vw`;
    kitty.style.width = `${Math.random() * 24 + 32}px`;
    kitty.style.animationDuration = `${duration}s`;
    decorationLayer.appendChild(kitty);
    removeAfterAnimation(kitty, duration * 1000);
}

for (let index = 0; index < 6; index += 1) {
    window.setTimeout(createHeart, index * 250);
}

window.setInterval(createHeart, heartInterval);
window.setInterval(createKitty, kittyInterval);