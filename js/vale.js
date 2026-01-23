/**
 * ==========================================
 * EFEITO DE CONFETE PARA PÁGINA DE PRÊMIO
 * ==========================================
 */

/**
 * Cria e anima um confete caindo
 */
function createConfetti() {
    const colors = ['#f2d74e', '#a64ac9', '#ff3385', '#25d366'];
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(confetti);
    
    // Remove o confete após a animação
    setTimeout(() => confetti.remove(), 5000);
}

/**
 * Inicializa o efeito de confete
 */
document.addEventListener('DOMContentLoaded', () => {
    // Cria um confete a cada 100ms
    setInterval(createConfetti, 100);
});
