// JOGO COM REINICIO DE FASE AO ERRAR PERGUNTA - SEM EMOJIS EXCESSIVOS
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const quizFeedback = document.getElementById('quizFeedback');
const phaseModal = document.getElementById('phaseQuestionModal');
const phaseQuestionText = document.getElementById('phaseQuestionText');
const phaseQuestionOptions = document.getElementById('phaseQuestionOptions');

function resizeCanvas() {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 100;
    if (player) initLevel(currentPhase);
}
window.addEventListener('resize', () => resizeCanvas());

const scoreSpan = document.getElementById('scoreValue');
const collectSpan = document.getElementById('collectCount');
const needCollectSpan = document.getElementById('needCollect');
const phaseSpan = document.getElementById('phaseValue');
const phIndicatorSpan = document.getElementById('phIndicator');
const healthSpan = document.getElementById('healthValue');
const gameMsgDiv = document.getElementById('gameMsg');
const resetBtn = document.getElementById('resetGameBtn');

let score = 0;
let phValue = 7;
let health = 5;
let currentPhase = 1;
let collectiblesInPhase = 0;
let needToCollect = 12;
let waitingQuestion = false;
let modalActive = false;
let gameOver = false;
let waitingPhaseQuestion = false;

let phaseStartScore = 0;      // Pontos no inicio da fase
let phaseStartCollect = 0;    // Coletas no inicio da fase

let player = { x: 100, y: 100, radius: 16, speed: 5 };
let items = [];
let obstacles = [];
let powerUps = [];
let villains = [];

const keys = { w: false, a: false, s: false, d: false };

// Perguntas das fases (obrigatorias)
const phaseQuestions = {
    1: { text: "Qual o pH de uma substancia neutra?", options: ["0", "7", "14", "3"], correct: 1 },
    2: { text: "O que o indicador de pH faz?", options: ["Mede temperatura", "Muda de cor com acidez", "Aquece liquidos", "Filtra particulas"], correct: 1 },
    3: { text: "Suco de limao e classificado como:", options: ["Acido", "Base", "Neutro", "Salino"], correct: 0 },
    4: { text: "Hidroxido de sodio (NaOH) e:", options: ["Acido forte", "Base forte", "Sal neutro", "Indicador"], correct: 1 },
    5: { text: "Qual a cor do indicador universal em meio basico?", options: ["Vermelho", "Verde", "Azul", "Amarelo"], correct: 2 }
};

function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    switch(currentPhase) {
        case 1: grad.addColorStop(0, "#1a3a5c"); grad.addColorStop(1, "#0d2137"); break;
        case 2: grad.addColorStop(0, "#1a4a2a"); grad.addColorStop(1, "#0d2a1a"); break;
        case 3: grad.addColorStop(0, "#3a1a5c"); grad.addColorStop(1, "#1a0d37"); break;
        case 4: grad.addColorStop(0, "#5c3a1a"); grad.addColorStop(1, "#37210d"); break;
        case 5: grad.addColorStop(0, "#5c1a1a"); grad.addColorStop(1, "#370d0d"); break;
        default: grad.addColorStop(0, "#2a2f3e"); grad.addColorStop(1, "#1a1f2e");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }
}

const phases = {
    1: { name: "Laboratorio Inicial", needCollect: 12, itemCount: 14, obstacleCount: 6, villainCount: 1, villainSpeed: 1.5, playerStart: { x: canvas.width/2, y: canvas.height/2 } },
    2: { name: "Floresta Quimica", needCollect: 15, itemCount: 16, obstacleCount: 8, villainCount: 2, villainSpeed: 1.8, playerStart: { x: canvas.width/2, y: canvas.height/2 } },
    3: { name: "Caverna Toxica", needCollect: 18, itemCount: 18, obstacleCount: 10, villainCount: 2, villainSpeed: 2.0, playerStart: { x: canvas.width/2, y: canvas.height/2 } },
    4: { name: "Reator Nuclear", needCollect: 21, itemCount: 20, obstacleCount: 12, villainCount: 3, villainSpeed: 2.3, playerStart: { x: canvas.width/2, y: canvas.height/2 } },
    5: { name: "Camara Final", needCollect: 25, itemCount: 22, obstacleCount: 14, villainCount: 4, villainSpeed: 2.6, playerStart: { x: canvas.width/2, y: canvas.height/2 } }
};

function initLevel(phase) {
    const p = phases[phase];
    if (!p) return;
    
    player.x = p.playerStart.x;
    player.y = p.playerStart.y;
    
    items = [];
    for (let i = 0; i < p.itemCount; i++) {
        let type = Math.random() < 0.5 ? 'acid' : 'base';
        let x, y, safe = false;
        while (!safe) {
            x = 40 + Math.random() * (canvas.width - 80);
            y = 40 + Math.random() * (canvas.height - 80);
            safe = Math.hypot(x - player.x, y - player.y) > 50;
        }
        items.push({ x, y, type, radius: 12 });
    }
    
    obstacles = [];
    for (let i = 0; i < p.obstacleCount; i++) {
        let x, y, safe = false;
        while (!safe) {
            x = 40 + Math.random() * (canvas.width - 80);
            y = 40 + Math.random() * (canvas.height - 80);
            safe = Math.hypot(x - player.x, y - player.y) > 50;
            for (let item of items) if (Math.hypot(x - item.x, y - item.y) < 35) safe = false;
        }
        obstacles.push({ x, y, radius: 10, value: 2 });
    }
    
    powerUps = [];
    let px, py;
    do { px = 50 + Math.random() * (canvas.width - 100); py = 50 + Math.random() * (canvas.height - 100); } 
    while (Math.hypot(px - player.x, py - player.y) < 60);
    powerUps.push({ x: px, y: py, radius: 12, collected: false });
    
    villains = [];
    for (let i = 0; i < p.villainCount; i++) {
        let vx, vy, safe = false;
        while (!safe) {
            vx = 60 + Math.random() * (canvas.width - 120);
            vy = 60 + Math.random() * (canvas.height - 120);
            safe = Math.hypot(vx - player.x, vy - player.y) > 100;
            for (let v of villains) if (Math.hypot(vx - v.x, vy - v.y) < 60) safe = false;
        }
        villains.push({ x: vx, y: vy, radius: 20, speed: p.villainSpeed });
    }
    
    needToCollect = p.needCollect;
    phaseSpan.innerText = phase;
    needCollectSpan.innerText = needToCollect;
    collectSpan.innerText = collectiblesInPhase;
    gameMsgDiv.innerHTML = `Fase ${phase}: colete ${needToCollect} itens e responda a pergunta para avancar`;
}

function resetPhase() {
    // Reinicia os pontos da fase para os valores do inicio da fase
    score = phaseStartScore;
    collectiblesInPhase = phaseStartCollect;
    phValue = 7;
    
    // Recria a fase
    const p = phases[currentPhase];
    if (p) {
        player.x = p.playerStart.x;
        player.y = p.playerStart.y;
        
        items = [];
        for (let i = 0; i < p.itemCount; i++) {
            let type = Math.random() < 0.5 ? 'acid' : 'base';
            let x, y, safe = false;
            while (!safe) {
                x = 40 + Math.random() * (canvas.width - 80);
                y = 40 + Math.random() * (canvas.height - 80);
                safe = Math.hypot(x - player.x, y - player.y) > 50;
            }
            items.push({ x, y, type, radius: 12 });
        }
        
        obstacles = [];
        for (let i = 0; i < p.obstacleCount; i++) {
            let x, y, safe = false;
            while (!safe) {
                x = 40 + Math.random() * (canvas.width - 80);
                y = 40 + Math.random() * (canvas.height - 80);
                safe = Math.hypot(x - player.x, y - player.y) > 50;
                for (let item of items) if (Math.hypot(x - item.x, y - item.y) < 35) safe = false;
            }
            obstacles.push({ x, y, radius: 10, value: 2 });
        }
        
        powerUps = [];
        let px, py;
        do { px = 50 + Math.random() * (canvas.width - 100); py = 50 + Math.random() * (canvas.height - 100); } 
        while (Math.hypot(px - player.x, py - player.y) < 60);
        powerUps.push({ x: px, y: py, radius: 12, collected: false });
        
        villains = [];
        for (let i = 0; i < p.villainCount; i++) {
            let vx, vy, safe = false;
            while (!safe) {
                vx = 60 + Math.random() * (canvas.width - 120);
                vy = 60 + Math.random() * (canvas.height - 120);
                safe = Math.hypot(vx - player.x, vy - player.y) > 100;
                for (let v of villains) if (Math.hypot(vx - v.x, vy - v.y) < 60) safe = false;
            }
            villains.push({ x: vx, y: vy, radius: 20, speed: p.villainSpeed });
        }
    }
    
    updateUI();
    gameMsgDiv.innerHTML = `Fase reiniciada! Voce errou a pergunta. Continue coletando.`;
    showFeedback("FASE REINICIADA! -2 pontos", false);
}

function showFeedback(message, isCorrect) {
    quizFeedback.textContent = message;
    quizFeedback.style.backgroundColor = isCorrect ? 'rgba(0,100,0,0.9)' : 'rgba(100,0,0,0.9)';
    quizFeedback.classList.remove('show');
    void quizFeedback.offsetWidth;
    quizFeedback.classList.add('show');
}

function updateUI() {
    scoreSpan.innerText = score;
    healthSpan.innerText = health;
    collectSpan.innerText = collectiblesInPhase;
    let phText = (phValue <= 6) ? phValue + " (acido)" : (phValue === 7 ? phValue + " (neutro)" : phValue + " (base)");
    phIndicatorSpan.innerText = phText;
}

function showPhaseQuestion() {
    return new Promise((resolve) => {
        waitingPhaseQuestion = true;
        const q = phaseQuestions[currentPhase];
        
        phaseQuestionText.textContent = q.text;
        phaseQuestionOptions.innerHTML = '';
        
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = (idx+1) + ". " + opt;
            btn.addEventListener('click', () => {
                const isCorrect = (idx === q.correct);
                phaseModal.classList.remove('show');
                waitingPhaseQuestion = false;
                resolve({ isCorrect, correctAnswer: q.options[q.correct] });
            });
            phaseQuestionOptions.appendChild(btn);
        });
        
        phaseModal.classList.add('show');
    });
}

async function advanceToNextPhase() {
    const result = await showPhaseQuestion();
    
    if (result.isCorrect) {
        // Acertou - avanca de fase normalmente
        score += 3;
        showFeedback("PERGUNTA ACERTADA! +3 pontos", true);
        
        if (currentPhase < 5) {
            currentPhase++;
            collectiblesInPhase = 0;
            phaseStartScore = score;
            phaseStartCollect = 0;
            initLevel(currentPhase);
            updateUI();
            gameMsgDiv.innerHTML = `Avancou para a fase ${currentPhase}!`;
        } else {
            gameMsgDiv.innerHTML = "Parabens! Voce completou todas as fases!";
            showFeedback("VITORIA!", true);
            gameOver = true;
        }
    } else {
        // Errou - reinicia a fase
        showFeedback("ERROU! Fase reiniciada. Resposta: " + result.correctAnswer, false);
        score = Math.max(0, score - 2);
        resetPhase();
    }
    updateUI();
}

function applyCollect(itemType, extraPoints = 1, isObstacle = false) {
    if (itemType === 'acid') phValue = Math.max(0, phValue - 1);
    else if (itemType === 'base') phValue = Math.min(14, phValue + 1);
    
    score += extraPoints;
    collectiblesInPhase += extraPoints;
    updateUI();
    
    if (isObstacle) {
        gameMsgDiv.innerHTML = `Obstaculo! +${extraPoints} pontos | pH: ${phValue}`;
    } else {
        gameMsgDiv.innerHTML = `${itemType === 'acid' ? 'Acido' : 'Base'}! +${extraPoints} ponto | pH: ${phValue}`;
    }
    
    // Vilao adicional a cada 15 pontos
    if (Math.floor(score / 15) > villains.length - 1 && score > 0 && villains.length < 7) {
        let currentSpeed = phases[currentPhase]?.villainSpeed || 1.8;
        let vx, vy, safe = false;
        while (!safe) {
            vx = 60 + Math.random() * (canvas.width - 120);
            vy = 60 + Math.random() * (canvas.height - 120);
            safe = Math.hypot(vx - player.x, vy - player.y) > 80;
            for (let v of villains) if (Math.hypot(vx - v.x, vy - v.y) < 60) safe = false;
        }
        villains.push({ x: vx, y: vy, radius: 20, speed: currentSpeed + 0.2 });
        gameMsgDiv.innerHTML += ` - Novo vilao apareceu!`;
    }
    
    if (collectiblesInPhase >= needToCollect && !waitingPhaseQuestion && !gameOver) {
        advanceToNextPhase();
    }
}

// POWER-UP QUESTIONS
const powerUpQuestions = [
    { text: "Qual o pH do leite?", options: ["2", "4", "6.5", "8"], correct: 2 },
    { text: "Fenolftaleina fica rosa em meio:", options: ["Acido", "Neutro", "Basico", "Solido"], correct: 2 },
    { text: "Qual desses e acido?", options: ["Sabao", "Cafe", "Leite de magnesia", "Agua sanitaria"], correct: 1 },
    { text: "Qual desses e base?", options: ["Coca-cola", "Suco de laranja", "Sabao em po", "Vinagre"], correct: 2 },
    { text: "A escala de pH vai de:", options: ["0 a 7", "7 a 14", "0 a 14", "1 a 10"], correct: 2 },
    { text: "pH menor que 7 indica:", options: ["Acidez", "Alcalinidade", "Neutralidade", "Salinidade"], correct: 0 },
    { text: "pH maior que 7 indica:", options: ["Acidez", "Alcalinidade", "Neutralidade", "Salinidade"], correct: 1 },
    { text: "O papel tornassol fica vermelho em:", options: ["Base", "Acido", "Neutro", "Sal"], correct: 1 },
    { text: "Qual acido esta na bateria de carro?", options: ["Cloridrico", "Sulfurico", "Nitrico", "Acetico"], correct: 1 },
    { text: "O que acontece com o pH ao adicionar acido?", options: ["Aumenta", "Diminui", "Fica neutro", "Evapora"], correct: 1 },
    { text: "Agua do mar tem pH aproximado:", options: ["5", "7", "8", "10"], correct: 2 },
    { text: "Cafe tem pH:", options: ["Acido", "Basico", "Neutro", "14"], correct: 0 }
];

let usedPowerUpQuestions = [];

function getRandomPowerUpQuestion() {
    if (usedPowerUpQuestions.length >= powerUpQuestions.length) usedPowerUpQuestions = [];
    const available = powerUpQuestions.filter((_, idx) => !usedPowerUpQuestions.includes(idx));
    const randomIndex = Math.floor(Math.random() * available.length);
    const originalIndex = powerUpQuestions.findIndex(q => q.text === available[randomIndex].text);
    usedPowerUpQuestions.push(originalIndex);
    return available[randomIndex];
}

function showPowerUpModal(question) {
    return new Promise((resolve) => {
        modalActive = true;
        const existing = document.getElementById('quizModalDiv');
        if (existing) existing.remove();
        const modalDiv = document.createElement('div');
        modalDiv.id = 'quizModalDiv';
        modalDiv.className = 'quiz-modal';
        modalDiv.innerHTML = `<h3>POWER-UP</h3><p>${question.text}</p>`;
        question.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = (idx+1) + ". " + opt;
            btn.addEventListener('click', () => { resolve(idx); modalDiv.remove(); modalActive = false; });
            modalDiv.appendChild(btn);
        });
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = "Pular";
        cancelBtn.className = 'cancel-btn';
        cancelBtn.addEventListener('click', () => { resolve(-1); modalDiv.remove(); modalActive = false; });
        modalDiv.appendChild(cancelBtn);
        document.body.appendChild(modalDiv);
    });
}

async function collectPowerUp() {
    waitingQuestion = true;
    const q = getRandomPowerUpQuestion();
    gameMsgDiv.innerHTML = `POWER-UP! ${q.text}`;
    
    const selectedIdx = await showPowerUpModal(q);
    waitingQuestion = false;
    
    if (selectedIdx === -1) {
        showFeedback("Pulou! Sem bonus", false);
        return;
    }
    
    const isCorrect = (selectedIdx === q.correct);
    if (isCorrect) {
        score += 5;
        collectiblesInPhase += 5;
        showFeedback("Correto! +5 pontos", true);
        if (phValue < 7) phValue = Math.min(7, phValue + 2);
        else if (phValue > 7) phValue = Math.max(7, phValue - 2);
    } else {
        score = Math.max(0, score - 2);
        showFeedback("Errado! Resposta: " + q.options[q.correct] + " | -2 pontos", false);
    }
    updateUI();
    
    if (collectiblesInPhase >= needToCollect && !waitingPhaseQuestion && !gameOver) {
        advanceToNextPhase();
    }
}

function spawnMoreItems() {
    for (let i = 0; i < 3; i++) {
        let type = Math.random() < 0.5 ? 'acid' : 'base';
        let x, y;
        do { x = 40 + Math.random() * (canvas.width - 80); y = 40 + Math.random() * (canvas.height - 80); } 
        while (Math.hypot(x - player.x, y - player.y) < 50);
        items.push({ x, y, type, radius: 12 });
    }
}

function checkCollisions() {
    if (waitingQuestion || modalActive || gameOver || waitingPhaseQuestion) return;
    
    for (let i = 0; i < items.length; i++) {
        if (Math.hypot(player.x - items[i].x, player.y - items[i].y) < player.radius + items[i].radius) {
            applyCollect(items[i].type, 1, false);
            items.splice(i, 1);
            if (items.length < 6) spawnMoreItems();
            break;
        }
    }
    
    for (let i = 0; i < obstacles.length; i++) {
        if (Math.hypot(player.x - obstacles[i].x, player.y - obstacles[i].y) < player.radius + obstacles[i].radius) {
            applyCollect('base', 2, true);
            obstacles.splice(i, 1);
            break;
        }
    }
    
    for (let i = 0; i < powerUps.length; i++) {
        if (!powerUps[i].collected && Math.hypot(player.x - powerUps[i].x, player.y - powerUps[i].y) < player.radius + powerUps[i].radius) {
            powerUps[i].collected = true;
            collectPowerUp();
            powerUps.splice(i, 1);
            setTimeout(() => {
                if (!gameOver && powerUps.length === 0) {
                    let px, py;
                    do { px = 50 + Math.random() * (canvas.width - 100); py = 50 + Math.random() * (canvas.height - 100); } 
                    while (Math.hypot(px - player.x, py - player.y) < 60);
                    powerUps.push({ x: px, y: py, radius: 12, collected: false });
                }
            }, 10000);
            break;
        }
    }
    
    for (let i = 0; i < villains.length; i++) {
        if (Math.hypot(player.x - villains[i].x, player.y - villains[i].y) < player.radius + villains[i].radius) {
            health--;
            updateUI();
            showFeedback("Vilao acertou! -1 vida", false);
            if (health <= 0) {
                gameOver = true;
                gameMsgDiv.innerHTML = "GAME OVER! Reinicie para continuar.";
                return;
            }
            player.x = phases[currentPhase].playerStart.x;
            player.y = phases[currentPhase].playerStart.y;
            break;
        }
    }
    
    // Hitbox entre viloes
    for (let i = 0; i < villains.length; i++) {
        for (let j = i + 1; j < villains.length; j++) {
            const dist = Math.hypot(villains[i].x - villains[j].x, villains[i].y - villains[j].y);
            const minDist = villains[i].radius + villains[j].radius;
            if (dist < minDist) {
                const angle = Math.atan2(villains[j].y - villains[i].y, villains[j].x - villains[i].x);
                const overlap = minDist - dist;
                const moveX = Math.cos(angle) * overlap / 2;
                const moveY = Math.sin(angle) * overlap / 2;
                villains[i].x -= moveX; villains[i].y -= moveY;
                villains[j].x += moveX; villains[j].y += moveY;
            }
        }
    }
}

function movePlayer() {
    if (waitingQuestion || modalActive || gameOver || waitingPhaseQuestion) return;
    let newX = player.x, newY = player.y;
    if (keys.w) newY -= player.speed;
    if (keys.s) newY += player.speed;
    if (keys.a) newX -= player.speed;
    if (keys.d) newX += player.speed;
    
    player.x = Math.min(Math.max(newX, player.radius + 5), canvas.width - player.radius - 5);
    player.y = Math.min(Math.max(newY, player.radius + 5), canvas.height - player.radius - 5);
}

function moveVillains() {
    for (let v of villains) {
        let dx = player.x - v.x, dy = player.y - v.y;
        let dist = Math.hypot(dx, dy);
        if (dist > 0.1) {
            let moveX = (dx / dist) * v.speed;
            let moveY = (dy / dist) * v.speed;
            v.x = Math.min(Math.max(v.x + moveX, v.radius + 5), canvas.width - v.radius - 5);
            v.y = Math.min(Math.max(v.y + moveY, v.radius + 5), canvas.height - v.radius - 5);
        }
    }
}

function draw() {
    drawBackground();
    
    for (let item of items) {
        ctx.shadowBlur = 3;
        ctx.fillStyle = item.type === 'acid' ? "#e34c3c" : "#3a8ec4";
        ctx.beginPath();
        ctx.roundRect(item.x-8, item.y-10, 16, 20, 5);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "bold 14px monospace";
        ctx.fillText(item.type === 'acid' ? "A" : "B", item.x-4, item.y+2);
    }
    
    for (let obs of obstacles) {
        ctx.fillStyle = "#ffaa44";
        ctx.shadowColor = "#ffaa44";
        ctx.beginPath();
        ctx.ellipse(obs.x, obs.y, 10, 10, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#885500";
        ctx.font = "bold 14px monospace";
        ctx.fillText("*", obs.x-3, obs.y+5);
    }
    
    for (let pu of powerUps) {
        ctx.fillStyle = "#ffcc44";
        ctx.shadowColor = "gold";
        ctx.beginPath();
        ctx.ellipse(pu.x, pu.y, 12, 12, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px monospace";
        ctx.fillText("P", pu.x-4, pu.y+4);
    }
    
    for (let v of villains) {
        ctx.fillStyle = "#4a7a4a";
        ctx.beginPath();
        ctx.ellipse(v.x, v.y, 20, 22, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#2a5a2a";
        ctx.fillRect(v.x-10, v.y-6, 20, 10);
        ctx.fillStyle = "#ff6666";
        ctx.beginPath();
        ctx.ellipse(v.x, v.y+5, 7, 5, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "bold 9px monospace";
        ctx.fillText("V", v.x-3, v.y-10);
    }
    
    ctx.fillStyle = "#4682b4";
    ctx.beginPath();
    ctx.ellipse(player.x, player.y+3, 14, 18, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "#ffccaa";
    ctx.beginPath();
    ctx.arc(player.x, player.y-3, 11, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(player.x-4, player.y-6, 2.5, 3.5, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(player.x+4, player.y-6, 2.5, 3.5, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "#2a4a2a";
    ctx.beginPath();
    ctx.ellipse(player.x, player.y-5, 8, 10, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(player.x-3, player.y-7, 1.8, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x+3, player.y-7, 1.8, 0, Math.PI*2);
    ctx.fill();
    
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(15, 15, 200, 16);
    let phPercent = (phValue / 14) * 200;
    let phColor = phValue <= 6 ? "#e34c3c" : (phValue === 7 ? "#88aa88" : "#3a8ec4");
    ctx.fillStyle = phColor;
    ctx.fillRect(15, 15, phPercent, 16);
    ctx.fillStyle = "white";
    ctx.font = "bold 10px monospace";
    ctx.fillText("pH: " + phValue, 20, 28);
    
    ctx.fillStyle = "#ffaa88";
    ctx.font = "bold 12px monospace";
    ctx.fillText("Viloes: " + villains.length, canvas.width-80, 28);
    
    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffaa66";
        ctx.font = "bold 36px monospace";
        ctx.fillText("GAME OVER", canvas.width/2-110, canvas.height/2);
        ctx.font = "18px monospace";
        ctx.fillStyle = "#ffdd99";
        ctx.fillText("Clique em REINICIAR", canvas.width/2-100, canvas.height/2+70);
    }
    ctx.shadowBlur = 0;
}

function gameLoop() {
    if (!gameOver && !waitingQuestion && !modalActive && !waitingPhaseQuestion) {
        movePlayer();
        moveVillains();
        checkCollisions();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    gameOver = false;
    waitingQuestion = false;
    waitingPhaseQuestion = false;
    usedPowerUpQuestions = [];
    if (modalActive) {
        const modal = document.getElementById('quizModalDiv');
        if (modal) modal.remove();
        modalActive = false;
    }
    phaseModal.classList.remove('show');
    score = 0;
    phValue = 7;
    health = 5;
    currentPhase = 1;
    collectiblesInPhase = 0;
    phaseStartScore = 0;
    phaseStartCollect = 0;
    villains = [];
    resizeCanvas();
    initLevel(1);
    updateUI();
    gameMsgDiv.innerHTML = "Jogo reiniciado! Complete a coleta e responda a pergunta para avancar de fase.";
}

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w') { keys.w = true; e.preventDefault(); }
    if (key === 'a') { keys.a = true; e.preventDefault(); }
    if (key === 's') { keys.s = true; e.preventDefault(); }
    if (key === 'd') { keys.d = true; e.preventDefault(); }
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w') keys.w = false;
    if (key === 'a') keys.a = false;
    if (key === 's') keys.s = false;
    if (key === 'd') keys.d = false;
});

resetBtn.addEventListener('click', resetGame);

if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.moveTo(x+r, y);
        this.lineTo(x+w-r, y);
        this.quadraticCurveTo(x+w, y, x+w, y+r);
        this.lineTo(x+w, y+h-r);
        this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        this.lineTo(x+r, y+h);
        this.quadraticCurveTo(x, y+h, x, y+h-r);
        this.lineTo(x, y+r);
        this.quadraticCurveTo(x, y, x+r, y);
        return this;
    };
}

resizeCanvas();
resetGame();
gameLoop();