// =========================
// BANCO DE PERGUNTAS
// =========================

const questions = [

    {
        question: "Qual é a faixa de pH que caracteriza uma substância ácida?",
        options: ["0 - 6", "7", "8 - 14", "Acima de 14"],
        correct: 0,
        feedback: "✅ Correta! Ácidos têm pH menor que 7."
    },

    {
        question: "Qual é o pH da água pura a 25°C?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        feedback: "✅ Exato! Água pura possui pH 7."
    },

    {
        question: "Uma solução com pH 9 é:",
        options: ["Ácida", "Neutra", "Básica", "Anfótera"],
        correct: 2,
        feedback: "✅ Sim! pH 9 é básico."
    }

];

// =========================
// ELEMENTOS DOM
// =========================

const questionNumberEl = document.getElementById('questionNumber');

const questionTextEl = document.getElementById('questionText');

const optionsContainer = document.getElementById('optionsContainer');

const feedbackMessage = document.getElementById('feedbackMessage');

const prevBtn = document.getElementById('prevBtn');

const nextBtn = document.getElementById('nextBtn');

const progressIndicator = document.getElementById('progressIndicator');

// =========================
// ÁUDIOS
// =========================

const bgMusic = document.getElementById('bgMusic');

const correctSound = document.getElementById('correctSound');

const wrongSound = document.getElementById('wrongSound');

const musicBtn = document.getElementById('musicBtn');

// Configuração dos volumes

bgMusic.volume = 0.2;

correctSound.volume = 0.6;

wrongSound.volume = 0.6;

// =========================
// ESTADO
// =========================

let currentIndex = 0;

let userAnswers = new Array(questions.length).fill(null);

let musicPlaying = false;

// =========================
// INICIAR MÚSICA
// =========================

window.addEventListener('load', () => {

    const promise = bgMusic.play();

    if (promise !== undefined) {

        promise
            .then(() => {

                musicPlaying = true;

                musicBtn.textContent = "🔇 Pausar";

            })

            .catch(() => {

                musicBtn.textContent = "🎵 Música";

            });
    }

});

// =========================
// BOTÃO MÚSICA
// =========================

musicBtn.addEventListener('click', () => {

    if (!musicPlaying) {

        bgMusic.play();

        musicPlaying = true;

        musicBtn.textContent = "🔇 Pausar";

    } else {

        bgMusic.pause();

        musicPlaying = false;

        musicBtn.textContent = "🎵 Música";
    }

});

// =========================
// CARREGAR QUESTÃO
// =========================

function loadQuestion(index) {

    const q = questions[index];

    questionNumberEl.textContent =
        `Questão ${index + 1}/${questions.length}`;

    questionTextEl.textContent = q.question;

    progressIndicator.textContent =
        `${index + 1}/${questions.length}`;

    optionsContainer.innerHTML = '';

    q.options.forEach((option, optIndex) => {

        const optionDiv = document.createElement('div');

        optionDiv.className = 'option';

        optionDiv.textContent = option;

        optionDiv.addEventListener('click', () => {

            selectOption(index, optIndex);

        });

        optionsContainer.appendChild(optionDiv);

    });

    feedbackMessage.textContent =
        "Selecione uma alternativa.";

}

// =========================
// SELECIONAR OPÇÃO
// =========================

function selectOption(index, optionIndex) {

    if (userAnswers[index] !== null) return;

    const q = questions[index];

    userAnswers[index] = optionIndex;

    const optionElements =
        document.querySelectorAll('.option');

    optionElements.forEach((opt, idx) => {

        if (idx === q.correct) {

            opt.classList.add('correct-option');

        }

        if (idx === optionIndex && idx !== q.correct) {

            opt.classList.add('wrong-option');

        }

    });

    // CORRETA

    if (optionIndex === q.correct) {

        correctSound.currentTime = 0;

        correctSound.play();

        feedbackMessage.textContent =
            q.feedback;

    }

    // ERRADA

    else {

        wrongSound.currentTime = 0;

        wrongSound.play();

        feedbackMessage.textContent =
            `❌ Resposta incorreta.
            Correta: ${q.options[q.correct]}`;

    }

}

// =========================
// NAVEGAÇÃO
// =========================

prevBtn.addEventListener('click', () => {

    if (currentIndex > 0) {

        currentIndex--;

        loadQuestion(currentIndex);

    }

});

nextBtn.addEventListener('click', () => {

    if (currentIndex < questions.length - 1) {

        currentIndex++;

        loadQuestion(currentIndex);

    }

});

// =========================
// INICIAR
// =========================

loadQuestion(0);