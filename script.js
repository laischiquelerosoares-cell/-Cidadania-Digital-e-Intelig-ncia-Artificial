document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ALTERNAR MODO ESCURO
    const toggleBtn = document.getElementById('toggleTheme');
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            toggleBtn.textContent = 'Modo Escuro';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.textContent = 'Modo Claro';
        }
    });

    // 2. VALIDAÇÃO E EXIBIÇÃO DE RESULTADOS DO QUIZ
    const btnVerificar = document.getElementById('btnVerificar');
    const resultadoDiv = document.getElementById('resultado-quiz');
    
    btnVerificar.addEventListener('click', () => {
        const opcoes = document.getElementsByName('opcao');
        let respostaSelecionada = null;

        for (const opcao of opcoes) {
            if (opcao.checked) {
                respostaSelecionada = opcao.value;
                break;
            }
        }

        resultadoDiv.style.display = 'block';

        if (!respostaSelecionada) {
            resultadoDiv.style.backgroundColor = '#fff3cd';
            resultadoDiv.style.color = '#664d03';
            resultadoDiv.style.borderColor = '#ffecb5';
            resultadoDiv.textContent = '⚠️ Por favor, selecione uma opção antes de verificar!';
        } else if (respostaSelecionada === 'correta') {
            resultadoDiv.style.backgroundColor = '#d1e7dd';
            resultadoDiv.style.color = '#0f5132';
            resultadoDiv.style.borderColor = '#badbcc';
            resultadoDiv.textContent = '✅ Correto! O melhor caminho é não compartilhar e verificar a veracidade em portais de notícias e agências de checagem confiáveis.';
        } else {
            resultadoDiv.style.backgroundColor = '#f8d7da';
            resultadoDiv.style.color = '#842029';
            resultadoDiv.style.borderColor = '#f5c2c7';
            resultadoDiv.textContent = '❌ Incorreto. Compartilhar sem checar espalha desinformação. Vídeos e áudios hoje podem ser gerados por Inteligência Artificial (Deepfakes).';
        }
    });

    // 3. LÓGICA COMPLETA DO JOGO DA MEMÓRIA
    const cardsArray = ['🤖', '🤖', '🔒', '🔒', '📱', '📱', '💻', '💻', '🔍', '🔍', '🌐', '🌐', '📡', '📡', '💡', '💡'];
    
    // Embaralha as cartas de forma aleatória
    cardsArray.sort(() => 0.5 - Math.random());

    const grid = document.getElementById('grid-memoria');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchesFound = 0;

    // Gera as cartas visualmente na tela
    cardsArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item;
        card.dataset.id = index;
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.name;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchesFound += 2;

        if (matchesFound === cardsArray.length) {
            document.getElementById('msg-memoria').style.display = 'block';
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '?';
            secondCard.textContent = '?';
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
});
