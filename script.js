document.addEventListener('DOMContentLoaded', () => {
    
    // Controle do Modo Escuro
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

    // Controle do Quiz
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
            resultadoDiv.textContent = '❌ Incorreto. Compartilhar sem checar espalha desinformação. Vídeos e áudios hoje em dia podem ser gerados facilmente por IA (Deepfakes).';
        }
    });
});
