/**
 * ==========================================
 * BANCO DE DADOS DAS CARTAS (MENSAGENS ALEATÓRIAS)
 * ==========================================
 */
const letterDatabase = {
    triste: [
        "Ei, olhe para mim (virtualmente). Você é maior que qualquer problema que esteja enfrentando hoje. Respira fundo, eu to contigo.",
        "Não se esqueça que dias ruins também chegam ao fim. Amanhã é um novo dia e eu estarei lá pra te fazer sorrir.",
        "Se o mundo estiver pesado aí, divide o peso comigo. Eu aguento. Te amo!",
        "Você é a mulher mais forte que eu conheço. Isso é só uma fase ruim, não uma vida ruim. Ergue a cabeça, minha princesa.",
        "Você é amada. Você é importante. Você é preciosa. Nunca duvide disso, nem por um segundo.",
        "Mesmo longe, eu sou seu porto seguro. Me liga? Quero te ouvir e te fazer esquecer os problemas."
    ],
    saudades: [
        "A distância é só um teste pra ver o quão longe o amor consegue viajar. O meu já chegou aí?",
        "Feche os olhos e imagine eu te dando aquele abraço apertado agora. Sentiu? To com saudade, Hadalia.",
        "Nenhuma mensagem substitui seu cheiro, mas espero que essa te lembre o quanto eu te quero por perto.",
        "Contando os dias, as horas e os segundos para olhar nos seus olhos de novo.",
        "A saudade é a prova de que tudo o que vivemos vale a pena. Logo, logo estou aí pra gente matar essa vontade.",
        "Teresina e Brasília nunca pareceram tão longe, né? Mas meu amor por você encurta qualquer mapa. ❤️"
    ],
    brava: [
        "Eu sei que às vezes eu sou lerdo. Me perdoa? Prometo compensar com beijos e comida.",
        "Ok, eu errei. Você tem razão (como sempre 🛐). Vamos fazer as pazes?",
        "Não fica brava com seu amorzinho... Eu sou imperfeito, mas te amo perfeitamente!",
        "Levante a mão quem ama a Hadalia mais que tudo! 🙋‍♂️🛐 (Agora para de ficar brava, vai...)",
        "Sabe que você fica linda até quando está brava? Mas prefiro você sorrindo. Me dá um sorriso, vai?"
    ],
    rir: [
        "Passei aqui só pra te contar uma piada: O que o pagodeiro foi fazer na igreja? Foi cantar 'Pá god'. (Ri vai, por favor, eu me esforcei kkkk)",
        "Se você fosse um pum, eu jamais te soltaria... (Desculpa, essa foi horrível kkkkk)",
        "Você é a única pessoa no mundo que eu dividiria meu lanche. E olha que eu amo comer.",
        "Lembra de quando tu deu crise de risos lá no culto? Só de imaginar eu já racho KKKKKKKKKK!",
        "Hadalia sabe porque não existe flor preta... pera essa não, errei kkkk"
    ]
};

/**
 * Abre uma carta aleatória da categoria especificada
 * @param {string} category - Categoria da carta (triste, saudades, brava, rir)
 * @param {string} title - Título para exibir no modal
 */
function openRandomLetter(category, title) {
    const messages = letterDatabase[category];
    if (!messages || messages.length === 0) {
        console.error(`Categoria "${category}" não encontrada ou vazia.`);
        return;
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    openModal(title, messages[randomIndex]);
}

/**
 * ==========================================
 * CONFIGURAÇÃO DO CALENDÁRIO
 * ==========================================
 */

/**
 * ==========================================
 * FUNÇÕES DO MODAL
 * ==========================================
 */

/**
 * Abre o modal com título e texto especificados
 * @param {string} title - Título do modal
 * @param {string} text - Texto/mensagem do modal
 */
function openModal(title, text) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    if (!modal || !modalTitle || !modalText) {
        console.error('Elementos do modal não encontrados.');
        return;
    }
    
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.style.display = 'flex';
    
    // Foco no modal para acessibilidade
    modal.focus();
}

/**
 * Alterna a visibilidade do modal
 * @param {boolean} show - true para mostrar, false para esconder
 */
function toggleModal(show) {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Fecha o modal quando clica fora do conteúdo
 * @param {Event} event - Evento de clique
 */
function closeModal(event) {
    if (event.target.id === 'modal') {
        toggleModal(false);
    }
}

/**
 * Fecha o modal com a tecla Escape
 */
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        toggleModal(false);
    }
}

/**
 * ==========================================
 * EFEITO CHUVA DE CORAÇÕES
 * ==========================================
 */
const HEART_INTERVAL = 600; // ms entre cada coração
const KITTY_INTERVAL = 1700; // ms entre cada hello kitty
const HEART_LIFETIME = 5000; // ms de duração do coração

/**
 * Cria um coração flutuante animado
 */
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.setAttribute('aria-hidden', 'true'); // Esconde dos leitores de tela
    
    document.body.appendChild(heart);
    
    // Remove o coração após a animação
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, HEART_LIFETIME);
}

/**
 * Cria um gif da Hello Kitty caindo ao fundo
 */
function createFallingKitty() {
    const kitty = document.createElement('img');
    kitty.classList.add('kitty-rain');
    kitty.src = 'assets/hello%20kitty.gif';
    kitty.alt = '';
    kitty.setAttribute('aria-hidden', 'true');
    kitty.style.left = `${Math.random() * 100}vw`;
    kitty.style.width = `${Math.random() * 24 + 28}px`;
    kitty.style.animationDuration = `${Math.random() * 3 + 4}s`;

    document.body.appendChild(kitty);

    setTimeout(() => {
        if (kitty.parentNode) {
            kitty.remove();
        }
    }, HEART_LIFETIME + 2000);
}

/**
 * Inicia o efeito de chuva de corações
 */
function startHeartRain() {
    setInterval(createHeart, HEART_INTERVAL);
    setInterval(createFallingKitty, KITTY_INTERVAL);
}

/**
 * Dispara vários corações em sequência
 */
function createHearts() {
    createHeart();
    setTimeout(createHeart, 300);
    setTimeout(createHeart, 600);
}

/**
 * ==========================================
 * SEÇÃO SURPRESA
 * ==========================================
 */

/**
 * Revela a surpresa quando clicada
 * @param {HTMLElement} element - Elemento da caixa surpresa
 */
function revealSurprise(element) {
    element.classList.add('revealed');
}

/**
 * ==========================================
 * RASPADINHA (REVELAR PRÊMIO)
 * ==========================================
 */
function revealPrize(element) {
    element.classList.add('scratched');
    createHearts();
}

/**
 * ==========================================
 * CERTIDÃO (ASSINATURA)
 * ==========================================
 */
function getTodayDate() {
    const today = new Date();
    return today.toLocaleDateString('pt-BR');
}

function showSignatureInput() {
    document.getElementById('phase1-intro').style.display = 'none';
    document.getElementById('phase2-input').style.display = 'block';
    setTimeout(() => document.getElementById('signature-field').focus(), 100);
}

function generateCertificate() {
    const inputField = document.getElementById('signature-field');
    const signatureName = inputField.value.trim();

    if (signatureName === "") {
        alert("Por favor, assine seu nome para continuarmos! ❤️");
        inputField.focus();
        return;
    }

    document.getElementById('final-signature').innerText = signatureName;
    document.getElementById('current-date').innerText = getTodayDate();

    document.getElementById('phase2-input').style.display = 'none';
    const certDiv = document.getElementById('phase3-certificate');
    certDiv.style.display = 'block';

    certDiv.style.opacity = 0;
    let fadeEffect = setInterval(function () {
        if (!certDiv.style.opacity) { certDiv.style.opacity = 0; }
        if (certDiv.style.opacity < 1) {
            certDiv.style.opacity = parseFloat(certDiv.style.opacity) + 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);

    createHearts();
}

/**
 * ==========================================
 * INICIALIZAÇÃO
 * ==========================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicia o efeito de corações
    startHeartRain();
    
    // Adiciona listener para tecla Escape
    document.addEventListener('keydown', handleEscapeKey);
    
    // Configura a caixa surpresa
    const surpriseBox = document.querySelector('.surprise-box');
    if (surpriseBox) {
        surpriseBox.onclick = function() {
            revealSurprise(this);
        };
    }

});
 // Atualiza a data do jornal para o dia atual
function updateNewsDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('pt-BR', options);
    
    // Deixa a primeira letra maiúscula
    const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    
    document.getElementById('news-date').innerText = formattedDate;
}

// Chame esta função ao carregar a página
updateNewsDate();