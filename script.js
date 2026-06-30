document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DO MODO ESCURO ---
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = 'Modo Escuro';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Modo Claro';
        }
    });

    // --- 2. LÓGICA DE VALIDAÇÃO DO QUIZ ---
    const btnVerificar = document.getElementById('btnVerificar');
    const quizFeedback = document.getElementById('quizFeedback');

    btnVerificar.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        
        if (!selectedOption) {
            alert('Por favor, selecione uma das alternativas antes de verificar!');
            return;
        }

        if (selectedOption.value === 'correta') {
            quizFeedback.className = 'feedback-box success';
            quizFeedback.innerHTML = '✓ Correto! O melhor caminho é não compartilhar e verificar a veracidade em portais de notícias e agências de checagem confiáveis.';
        } else {
            quizFeedback.className = 'feedback-box error';
            quizFeedback.innerHTML = '✘ Incorreto. Compartilhar sem checar espalha boatos. Sempre verifique em fontes confiáveis antes de agir.';
        }
    });

    // --- 3. LÓGICA COMPLETA DO JOGO DA MEMÓRIA ---
    // Lista de termos duplicados (total de 12 cartas = 6 pares)
    const cardTerms = [
        'Deepfake', 'Deepfake',
        'Checagem', 'Checagem',
        'Fato', 'Fato',
        'IA', 'IA',
        'Segurança', 'Segurança',
        'Mídia', 'Mídia'
    ];

    let flippedCards = [];
    let matchedPairs = 0;
    const totalPairs = cardTerms.length / 2;
    const gameGrid = document.getElementById('memoryGame');

    // Algoritmo para embaralhar os termos aleatoriamente
    cardTerms.sort(() => 0.5 - Math.random());

    // Renderiza dinamicamente as cartas no HTML
    cardTerms.forEach((term, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.term = term;
        cardElement.dataset.index = index;
        cardElement.textContent = '?';
        
        cardElement.addEventListener('click', handleCardClick);
        gameGrid.appendChild(cardElement);
    });

    function handleCardClick() {
        // Evita cliques se já existirem 2 cartas viradas, ou se clicar na mesma carta/carta já combinada
        if (flippedCards.length === 2) return;
        if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

        // Vira a carta selecionada
        this.classList.add('flipped');
        this.textContent = this.dataset.term;
        flippedCards.push(this);

        // Se duas cartas foram viradas, faz a verificação
        if (flippedCards.length === 2) {
            checkCardMatch();
        }
    }

    function checkCardMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.term === card2.dataset.term) {
            // Se formam um par válido
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;

            // Condição de vitória do jogo
            if (matchedPairs === totalPairs) {
                setTimeout(() => {
                    alert('Excelente! Você encontrou todos os pares de termos sobre Cidadania Digital!');
                }, 400);
            }
        } else {
            // Se as cartas forem diferentes, desvira após 1 segundo
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                flippedCards = [];
            }, 1000);
        }
    }
});
