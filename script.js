/**
 * Script de Funcionalidades Interativas - Portal de Cidadania Digital
 * Desenvolvido em conformidade com as diretrizes do projeto de IA e Desinformação.
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // --- FUNCIONALIDADE 1: ACESSIBILIDADE (MODO ESCURO) ---
    const themeToggle = document.getElementById("theme-toggle");
    
    themeToggle.addEventListener("click", function() {
        // Verifica o tema atual no atributo data-theme do elemento HTML raiz
        const currentTheme = document.documentElement.getAttribute("data-theme");
        
        let newTheme = "light";
        if (currentTheme !== "dark") {
            newTheme = "dark";
            themeToggle.textContent = "Modo Claro";
        } else {
            themeToggle.textContent = "Modo Escuro";
        }
        
        // Aplica o novo tema atualizando a propriedade do DOM
        document.documentElement.setAttribute("data-theme", newTheme);
    });

    // --- FUNCIONALIDADE 2: VALIDADOR DE RESPOSTAS DO QUIZ ---
    const quizForm = document.getElementById("quiz-form");
    const feedbackBox = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", function(event) {
        // Previne o comportamento padrão do HTML de recarregar a página ao enviar o form
        event.preventDefault();

        // Captura o input do tipo rádio que foi selecionado pelo usuário
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');
        
        if (!selectedOption) return; // Proteção caso o envio ocorra sem seleção

        const userAnswer = selectedOption.value;
        
        // Limpa classes anteriores da caixa de feedback para evitar sobreposição visual
        feedbackBox.className = "feedback-box";

        // Processa as informações usando variáveis e altera a árvore do DOM textualmente
        if (userAnswer === "correta") {
            feedbackBox.textContent = "Parabéns! Você exerceu sua Cidadania Digital corretamente. Sempre cheque as fontes antes de espalhar qualquer informação.";
            feedbackBox.classList.add("success");
        } else {
            feedbackBox.textContent = "Atenção! Compartilhar sem checar ou acreditar de imediato ajuda a propagar a desinformação automatizada por IA. Tente analisar com mais calma e criticidade.";
            feedbackBox.classList.add("error");
        }

        // Torna a div de feedback visível removendo a classe utility 'hidden'
        feedbackBox.classList.remove("hidden");
    });
});
