document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FUNCIONALIDADE DO MODO ESCURO
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

    // 2. FUNCIONALIDADE DE VALIDAÇÃO DO QUIZ
    const btnVerificar = document.getElementById('btnVerificar');
    const resultadoDiv = document.getElementById('resultado-quiz');
    
    btnVerificar.addEventListener('click', () => {
        const opcoes = document.getElementsByName('opcao');
        let respostaSelecionada = null;

        // Procura qual opção foi marcada
        for (const opcao of opcoes) {
            if (opcao.checked) {
                respostaSelecionada = opcao.value;
                break;
            }
        }

        // Mostra a caixinha de feedback na tela
        resultadoDiv.style.display = 'block';

        // Validações de resposta
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
            resultadoDiv.textContent = '✅ Correto! O melhor caminho é conter o compartilhamento e verificar a veracidade em portais de notícias e agências de checagem de fatos.';
        } 
        else {
            resultadoDiv.style.backgroundColor = '#f8d7da';
            resultadoDiv.style.color = '#842029';
            resultadoDiv.style.borderColor = '#f5c2c7';
            resultadoDiv.textContent = '❌ Incorreto. Compartilhar sem checar espalha desinformação. Lembre-se que hoje em dia mídias em vídeo também podem ser criadas por IA (Deepfakes).';
        }
    });
});
