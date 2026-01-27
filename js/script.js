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
const calendarMessages = [
    "Dia 1: Bem-vinda ao nosso mês, Hadalia! Mesmo de longe, prometo me fazer presente em cada minuto do seu dia. ❤️",
    "Dia 2: Sextou! Sua missão hoje: Escolher um filme para a gente assistir sincronizado à noite.",
    "Dia 3: Sábado! Dia de curtir. Se sinta abraçada por mim aí em Brasília. Feche os olhos e imagine que estou do seu lado.",
    "Dia 4: Domingo. Dia oficial da preguiça. Vamos passar o dia conectados? Nem que seja com a câmera ligada sem falar nada.",
    "Dia 5: Segunda-feira... Eu sei que a rotina cansa, mas lembre-se que em Teresina tem alguém torcendo muito por você.",
    "Dia 6: Terça. Olhe para o céu hoje à noite. É o mesmo céu que eu estou vendo. Estamos longe, mas sob a mesma lua.",
    "Dia 7: Quarta. Prepare a pipoca. Hoje é noite de maratona de série via Discord/Meet!",
    // Semana 2
    "Dia 8: Quinta... A distância só me dá mais certeza de que você é a pessoa certa, saudades de você minha princesa 🛐.",
    "Dia 9: Sexta! 🍔 VALE-IFOOD: Hoje o jantar é por minha conta aí em Brasília. Escolha o que quiser que eu peço daqui!",
    "Dia 10: Sábado. A tecnologia é boa, mas o que eu sinto por você é o que mantém a gente conectado de verdade. Te amo!",
    "Dia 11: Domingo. Desafio: Criar nossa playlist no Spotify juntos. Coloque músicas que te lembram de mim.",
    "Dia 12: Segunda. Você é incrível e capaz de tudo. Estou aqui para te apoiar em qualquer decisão.",
    "Dia 13: Terça. Sorte do dia: ter um garoto de programa tatuado que, mesmo longe, faz de tudo pra te ver sorrir.",
    "Dia 14: Quarta. Metade do mês! A saudade aperta, mas o orgulho de ter você comigo é muito maior.",
    // Semana 3
    "Dia 15: Quinta. Hoje acordei pensando no seu sorriso. Manda uma selfie agora? Preciso recarregar minhas energias.",
    "Dia 16: Sexta! 📞 VALE-DESABAFO: Hoje a videochamada é só pra te ouvir. Pode reclamar, fofocar ou chorar. Sou todo ouvidos.",
    "Dia 17: Sábado. Vamos jogar algo online? Hoje o dia é pra gente se divertir juntos, pode até ser teu roblox KKKK",
    "Dia 18: Domingo. Planejando nosso futuro... Onde será nossa próxima viagem? Sonhar com você é minha parte favorita do dia.",
    "Dia 19: Segunda. Começando a semana te enviando as melhores energias daqui. Sinta meu carinho chegando aí!",
    "Dia 20: Terça. Você é meu pensamento constante, do bom dia até a hora que eu vou dormir.",
    "Dia 21: Quarta. 🍬 VALE-DOCE: Vou mandar entregar um chocolatinho ou sobremesa aí na sua casa. Fique atenta!",
    // Semana 4
    "Dia 22: Quinta. A distância separa corpos, não corações. O meu tá aí com você agora. 🛐",
    "Dia 23: Já te disse hoje que sua voz é meu som favorito? Mande um áudio contando como foi seu dia.",
    "Dia 24: Sábado. Se eu pudesse me teletransportar, adivinha onde eu estaria agora? (Dica: começa com 'Bra' e termina com 'sília'. KKKKKKKK).",
    "Dia 25: Domingo. Bom dia, meu amor. Aproveite seu domingo aí, descanse bastante. Te amo!",
    "Dia 26: Segunda. Mais uma semana de batalhas. Lembre-se: Você é forte, inteligente e eu sou seu fã nº 1.",
    "Dia 27: Terça. Obrigado por ser minha parceira e confiar em nós, mesmo com os quilômetros no meio.",
    "Dia 28: Quarta. Falta pouco para o mês acabar, mas minha vontade de estar perto só aumenta.",
    // Reta Final
    "Dia 29: Quinta. 🧞‍♂️ VALE-PEDIDO VIRTUAL: Escolha um presente online (livro, jogo, curso, algo digital) que eu compro pra você.",
    "Dia 30: Sexta. Quase fim do mês. Obrigado por me fazer tão feliz, mesmo através de uma tela.",
    "Dia 31: Sábado! Fechamos com chave de ouro. A distância é um detalhe perto do tamanho do meu amor por você, Hadalia ❤️"
];

const DAYS_OF_WEEK = ["Quinta", "Sexta", "Sábado", "Domingo", "Segunda", "Terça", "Quarta"];

/**
 * Inicializa o calendário na página
 */
function initCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    
    if (!calendarContainer) {
        console.error('Elemento #calendarContainer não encontrado.');
        return;
    }

    for (let i = 1; i <= 31; i++) {
        const dayName = DAYS_OF_WEEK[(i - 1) % 7];
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-card';
        dayDiv.setAttribute('role', 'button');
        dayDiv.setAttribute('tabindex', '0');
        dayDiv.setAttribute('aria-label', `Dia ${i}, ${dayName}`);
        
        // Suporte para clique e teclado
        dayDiv.onclick = () => openModal(`Dia ${i} (${dayName})`, calendarMessages[i - 1]);
        dayDiv.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(`Dia ${i} (${dayName})`, calendarMessages[i - 1]);
            }
        };
        
        dayDiv.innerHTML = `
            <div class="day-number">${i}</div>
            <div class="day-label">${dayName}</div>
        `;
        calendarContainer.appendChild(dayDiv);
    }
}

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
 * Inicia o efeito de chuva de corações
 */
function startHeartRain() {
    setInterval(createHeart, HEART_INTERVAL);
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
    // Inicializa o calendário
    initCalendar();
    
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
