// Aguarda que todo o HTML seja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO MODO ESCURO ---
    const toggleBtn = document.getElementById('toggleTheme');
    
    toggleBtn.addEventListener('click', () => {
        // Verifica se o tema atual já é escuro
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Se for escuro, remove o atributo voltando ao modo claro
            document.documentElement.removeAttribute('data-theme');
            toggleBtn.textContent = 'Modo Escuro';
        } else {
            // Se for claro, adiciona o atributo mudando para o modo escuro
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.textContent = 'Modo Claro';
        }
    });


    // --- LÓGICA DE VALIDAÇÃO DO QUIZ ---
    const btnVerificar = document.getElementById('btnVerificar');
    
    btnVerificar.addEventListener('click', () => {
        const opcoes = document.getElementsByName('opcao');
        let respostaSelecionada = null;

        // Procura qual das opções (radio buttons) foi marcada pelo utilizador
        for (const opcao of opcoes) {
            if (opcao.checked) {
                respostaSelecionada = opcao.value;
                break;
            }
        }

        const resultadoDiv = document.getElementById('resultado-quiz');
        resultadoDiv.style.display = 'block'; // Torna a caixa de resultado visível

        // Se o utilizador clicar sem selecionar nada
        if (!respostaSelecionada) {
            resultadoDiv.style.backgroundColor = '#fff3cd';
            resultadoDiv.style.color = '#664d03';
            resultadoDiv.textContent = 'Por favor, selecione uma opção antes de verificar!';
        } 
        // Se selecionar a opção correta
        else if (respostaSelecionada === 'correta') {
            resultadoDiv.style.backgroundColor = '#d1e7dd';
            resultadoDiv.style.color = '#0f5132';
            resultadoDiv.textContent = 'Correto! Sempre devemos checar as informações em fontes confiáveis e agências de checagem antes de partilhar qualquer conteúdo.';
        } 
        // Se selecionar qualquer uma das respostas erradas
        else {
            resultadoDiv.style.backgroundColor = '#f8d7da';
            resultadoDiv.style.color = '#842029';
            resultadoDiv.textContent = 'Incorreto. Partilhar sem checar ou acreditar cegamente ajuda a espalhar desinformação. O comportamento digital correto é pesquisar em fontes confiáveis.';
        }
    });

});
