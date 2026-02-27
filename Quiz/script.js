// Banco de perguntas sobre ácidos, bases e indicadores de pH
const questions = [
    {
        question: "Qual é a faixa de pH que caracteriza uma substância ácida?",
        options: ["0 - 6", "7", "8 - 14", "Acima de 14"],
        correct: 0,
        feedback: "✅ Correta! Ácidos têm pH menor que 7 (0 a 6)."
    },
    {
        question: "O que a fenolftaleína indica em meio básico?",
        options: ["Vermelho / Rosa", "Incolor", "Azul", "Amarelo"],
        correct: 0,
        feedback: "✅ Isso! Fenolftaleína fica rosa/vermelha em pH básico (>8,2)."
    },
    {
        question: "Qual é o pH da água pura a 25°C?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        feedback: "✅ Exato! Água pura tem pH 7 (neutro)."
    },
    {
        question: "O suco de limão é um exemplo de:",
        options: ["Base forte", "Ácido fraco", "Ácido forte", "Base fraca"],
        correct: 1,
        feedback: "✅ Correto! Limão contém ácido cítrico (fraco)."
    },
    {
        question: "Qual indicador natural fica vermelho em ácidos e azul em bases?",
        options: ["Chá preto", "Repolho roxo", "Cúrcuma", "Hibisco"],
        correct: 1,
        feedback: "✅ Isso! O repolho roxo muda de vermelho (ácido) para azul/verde (base)."
    },
    {
        question: "O que significa pH?",
        options: ["Peso de Hidrogênio", "Potencial Hidrogeniônico", "Pureza Hídrica", "Ponto de Hidratação"],
        correct: 1,
        feedback: "✅ Correto! pH significa 'potencial hidrogeniônico'."
    },
    {
        question: "Uma solução com pH = 9 é considerada:",
        options: ["Ácida", "Neutra", "Básica", "Anfótera"],
        correct: 2,
        feedback: "✅ Sim! pH 9 é básico (ou alcalino)."
    },
    {
        question: "Qual destes é um indicador ácido-base sintético?",
        options: ["Suco de uva", "Tornassol", "Café", "Beterraba"],
        correct: 1,
        feedback: "✅ Tornassol (azul de tornassol) é um indicador clássico."
    },
    {
        question: "O que acontece com o papel de tornassol azul em meio ácido?",
        options: ["Fica vermelho", "Fica verde", "Não muda", "Fica amarelo"],
        correct: 0,
        feedback: "✅ Correto! Tornassol azul → vermelho em ácido."
    },
    {
        question: "Qual a cor da fenolftaleína em meio neutro?",
        options: ["Rosa", "Incolor", "Azul", "Laranja"],
        correct: 1,
        feedback: "✅ Em pH < 8,2 a fenolftaleína é incolor."
    }
];

// Elementos DOM
const questionNumberEl = document.getElementById('questionNumber');
const questionTextEl = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressIndicator = document.getElementById('progressIndicator');

// Estado do quiz
let currentIndex = 0;
let userAnswers = new Array(questions.length).fill(null);  // null = não respondida
let totalQuestions = questions.length;

// Inicialização
function loadQuestion(index) {
    const q = questions[index];
    
    // Atualiza número e texto
    questionNumberEl.textContent = `Questão ${index + 1}/${totalQuestions}`;
    questionTextEl.textContent = q.question;
    progressIndicator.textContent = `${index + 1}/${totalQuestions}`;
    
    // Gerar opções
    optionsContainer.innerHTML = '';
    q.options.forEach((option, optIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.dataset.index = optIndex;
        
        // Se já tiver resposta para essa pergunta, aplicar estilo
        if (userAnswers[index] !== null) {
            if (optIndex === q.correct) {
                optionDiv.classList.add('correct-option');
            } else if (optIndex === userAnswers[index] && optIndex !== q.correct) {
                optionDiv.classList.add('wrong-option');
            }
            
            // Se a resposta do usuário for a correta, só a correta fica verde (as outras sem classe extra)
            if (userAnswers[index] === q.correct) {
                if (optIndex === q.correct) optionDiv.classList.add('correct-option');
            } else {
                // Se errou: a correta fica verde e a escolhida errada fica vermelha
                if (optIndex === q.correct) optionDiv.classList.add('correct-option');
                if (optIndex === userAnswers[index] && optIndex !== q.correct) optionDiv.classList.add('wrong-option');
            }
        }
        
        optionDiv.addEventListener('click', () => selectOption(index, optIndex));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Atualizar feedback se já respondeu
    if (userAnswers[index] !== null) {
        const isCorrect = (userAnswers[index] === q.correct);
        if (isCorrect) {
            feedbackMessage.textContent = q.feedback + ' ⚗️';
        } else {
            const correctOptionText = q.options[q.correct];
            feedbackMessage.textContent = `❌ Resposta incorreta. A correta é: ${correctOptionText}. ${q.feedback.replace('✅', '')}`;
        }
    } else {
        feedbackMessage.textContent = 'Selecione uma alternativa para ver o feedback.';
    }
    
    // Habilitar/desabilitar botões de navegação
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === totalQuestions - 1);
}

// Função chamada ao clicar em uma opção
function selectOption(index, optionIndex) {
    // Se já respondeu essa pergunta, não permite alterar (para manter simplicidade)
    if (userAnswers[index] !== null) return;
    
    const q = questions[index];
    userAnswers[index] = optionIndex;
    
    // Realçar opções
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach((opt, idx) => {
        if (idx === q.correct) {
            opt.classList.add('correct-option');
        } else if (idx === optionIndex && idx !== q.correct) {
            opt.classList.add('wrong-option');
        }
    });
    
    // Feedback
    if (optionIndex === q.correct) {
        feedbackMessage.textContent = q.feedback + ' ⚗️';
    } else {
        const correctText = q.options[q.correct];
        feedbackMessage.textContent = `❌ Você escolheu: ${q.options[optionIndex]}. Resposta certa: ${correctText}. ${q.feedback.replace('✅', '')}`;
    }
}

// Navegação
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion(currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalQuestions - 1) {
        currentIndex++;
        loadQuestion(currentIndex);
    }
});

// Carregar primeira pergunta
loadQuestion(0);