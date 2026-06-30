document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. CONTROLE DO MODO ESCURO
    // ==========================================================================
    const botoesTema = document.querySelectorAll('#toggleTheme');
    
    botoesTema.forEach(botao => {
        botao.addEventListener('click', () => {
            const temaAtual = document.documentElement.getAttribute('data-theme');
            
            if (temaAtual === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                botao.textContent = 'Modo Escuro';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                botao.textContent = 'Modo Claro';
            }
        });
    });

    // ==========================================================================
    // 2. VALIDAÇÃO DAS RESPOSTAS DO QUIZ
    // ==========================================================================
    const btnVerificar = document.getElementById('btnVerificar');
    const resultadoDiv = document.getElementById('resultado-quiz');
    
    if (btnVerificar && resultadoDiv) {
        btnVerificar.addEventListener('click', () => {
            const opcoes = document.getElementsByName('opcao');
            let respostaSelecionada = null;

            // Identifica qual alternativa o usuário marcou
            for (const opcao of opcoes) {
                if (opcao.checked) {
                    respostaSelecionada = opcao.value;
                    break;
                }
            }

            // Torna a caixinha de resultado visível
            resultadoDiv.style.display = 'block';

            // Aplica a cor e a mensagem correta baseada na escolha
            if (!respostaSelecionada) {
                resultadoDiv.style.backgroundColor = '#fff3cd';
                resultadoDiv.style.color = '#664d03';
                resultadoDiv.style.borderColor = '#ffecb5';
                resultadoDiv.textContent = '⚠️ Por favor, selecione uma opção antes de verificar!';
            } 
            else if (respostaSelecionada === 'correta') {
                resultadoDiv.style.backgroundColor = '#d1e7dd';
                resultadoDiv.style.color = '#0f5132';
                resultadoDiv.style.borderColor = '#badbcc';
                resultadoDiv.textContent = '✅ Correto! O melhor caminho é não compartilhar e pesquisar o assunto em portais de notícias confiáveis e agências de checagem.';
            } 
            else {
                resultadoDiv.style.backgroundColor = '#f8d7da';
                resultadoDiv.style.color = '#842029';
                resultadoDiv.style.borderColor = '#f5c2c7';
                resultadoDiv.textContent = '❌ Incorreto. Compartilhar sem checar ajuda a espalhar desinformação. Lembre-se de que vídeos e áudios hoje em dia podem ser criados artificialmente por IA (Deepfakes).';
            }
        });
    }

    // ==========================================================================
    // 3. LÓGICA DO JOGO DA MEMÓRIA
    // ==========================================================================
    const grid = document.getElementById('grid-memoria');
    const msgMemoria = document.getElementById('msg-memoria');
    
    if (grid) {
        // Lista de figuras das cartas (pares idênticos)
        const cardsArray = ['🤖', '🤖', '🔒', '🔒', '📱', '📱', '💻', '💻', '🔍', '🔍', '🌐', '🌐', '📡', '📡', '💡', '💡'];
        
        // Função para embaralhar os itens aleatoriamente
        cardsArray.sort(() => 0.5 - Math.random());

        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let matchesFound = 0;

        // Cria e insere as cartas dentro do HTML dinamicamente
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
            const isMatch = firstCard.dataset.name === secondCard.dataset.name;
            isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchesFound += 2;

            // Se o usuário encontrar todos os 16 cards (8 pares)
            if (matchesFound === cardsArray.length && msgMemoria) {
                msgMemoria.style.display = 'block';
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
    }
});
