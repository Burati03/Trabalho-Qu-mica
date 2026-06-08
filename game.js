// ========== DADOS DAS FASES (15 fases com dificuldade, ácidos/bases/pH e indicadores) ==========
const phases = [
    { id:1, substancia:"Vinagre", phReal:3, categoria:"ácido", desc:"Vinagre (ácido acético)", difficulty:"Fácil",
      pergunta:"O vinagre é uma substância:", opcoes:["Ácida","Básica","Neutra"], correta:0,
      explicacao:"Vinagre contém ácido acético, pH ~3, portanto é ácido." },
    { id:2, substancia:"Água com sabão", phReal:10, categoria:"base", desc:"Sabão neutro pH ~10", difficulty:"Fácil",
      pergunta:"Sabão líquido comum é:", opcoes:["Ácido","Base","Neutro"], correta:1,
      explicacao:"Sabões são bases fracas, pH entre 9 e 11." },
    { id:3, substancia:"Suco de limão", phReal:2, categoria:"ácido", desc:"Limão (ácido cítrico)", difficulty:"Fácil",
      pergunta:"Qual a faixa de pH do limão?", opcoes:["pH 1-2","pH 7","pH 12-13"], correta:0,
      explicacao:"Limão tem pH ~2, ácido forte." },
    { id:4, substancia:"Amônia caseira", phReal:11.5, categoria:"base", desc:"Amônia (NH₃)", difficulty:"Média",
      pergunta:"A amônia em contato com fenolftaleína fica:", opcoes:["Incolor","Rosa intenso","Azul"], correta:1,
      explicacao:"Fenolftaleína em meio básico (pH>8.2) fica rosa/magenta." },
    { id:5, substancia:"Refrigerante Cola", phReal:2.5, categoria:"ácido", desc:"Ácido fosfórico", difficulty:"Média",
      pergunta:"Papel tornassol azul ao tocar no refrigerante fica:", opcoes:["Azul","Vermelho","Verde"], correta:1,
      explicacao:"Tornassol azul → vermelho em ácido." },
    { id:6, substancia:"Leite de magnésia", phReal:10.3, categoria:"base", desc:"Hidróxido de magnésio", difficulty:"Média",
      pergunta:"Leite de magnésia tem caráter:", opcoes:["Ácido","Base","Neutro"], correta:1,
      explicacao:"Antiácido básico, neutraliza ácidos estomacais." },
    { id:7, substancia:"Água pura", phReal:7, categoria:"neutro", desc:"H₂O neutra", difficulty:"Fácil",
      pergunta:"Indicador azul de bromotimol em pH neutro fica:", opcoes:["Amarelo","Verde","Azul"], correta:1,
      explicacao:"Azul de bromotimol: amarelo ácido, verde neutro, azul básico." },
    { id:8, substancia:"Soda cáustica", phReal:13, categoria:"base", desc:"NaOH forte", difficulty:"Difícil",
      pergunta:"Em contato com repolho roxo, soda cáustica produz cor:", opcoes:["Vermelha","Roxa","Verde/Amarelada"], correta:2,
      explicacao:"Repolho roxo (antocianina): ácido=vermelho, neutro=roxo, base=verde/amarelo." },
    { id:9, substancia:"Café", phReal:5, categoria:"ácido", desc:"Café levemente ácido", difficulty:"Média",
      pergunta:"Qual dos indicadores ficaria vermelho/rosa no café?", opcoes:["Fenolftaleína","Tornassol azul","Azul de bromotimol"], correta:1,
      explicacao:"Tornassol azul → vermelho em meio ácido." },
    { id:10, substancia:"Clara de ovo", phReal:8, categoria:"base", desc:"pH levemente básico", difficulty:"Média",
      pergunta:"Fenolftaleína na clara de ovo fica:", opcoes:["Incolor","Rosa claro","Laranja"], correta:1,
      explicacao:"pH > 8 ativa viragem rosa." },
    { id:11, substancia:"Suco gástrico", phReal:1.5, categoria:"ácido", desc:"HCl diluído", difficulty:"Difícil",
      pergunta:"Que cor o repolho roxo apresentará no suco gástrico?", opcoes:["Vermelho","Verde","Azul"], correta:0,
      explicacao:"pH extremamente ácido → antocianina vermelha intensa." },
    { id:12, substancia:"Bicarbonato de sódio", phReal:8.3, categoria:"base", desc:"NaHCO₃", difficulty:"Média",
      pergunta:"Azul de bromotimol no bicarbonato fica:", opcoes:["Amarelo","Verde","Azul"], correta:2,
      explicacao:"pH básico (8.3) -> azul." },
    { id:13, substancia:"Leite", phReal:6.7, categoria:"ácido fraco", desc:"Leite ligeiramente ácido", difficulty:"Média",
      pergunta:"Papel tornassol vermelho no leite:", opcoes:["Continua vermelho","Fica azul","Fica roxo"], correta:0,
      explicacao:"Tornassol vermelho em ácido/neutro mantém vermelho, só fica azul se base." },
    { id:14, substancia:"Vinagre + Bicarbonato (mistura)", phReal:7, categoria:"neutro", desc:"Reação de neutralização", difficulty:"Difícil",
      pergunta:"Após neutralização, qual cor esperada com fenolftaleína?", opcoes:["Incolor","Rosa","Laranja"], correta:0,
      explicacao:"Neutralização forma sal e água, pH neutro, fenolftaleína incolor." },
    { id:15, substancia:"Detergente líquido", phReal:9, categoria:"base", desc:"Base fraca", difficulty:"Difícil",
      pergunta:"Qual indicador melhor para diferenciar pH 9 do neutro?", opcoes:["Fenolftaleína","Azul de bromotimol","Repolho roxo"], correta:1,
      explicacao:"Azul de bromotimol transita verde-azul, diferenciando bem." }
];

// Mapeamento cores reais para cada indicador e pH
function getIndicatorColor(indicator, pH) {
    if(indicator === 'Fenolftaleína') {
        if(pH <= 8.2) return '#f0f0f0';
        else return '#ff66b2';
    }
    if(indicator === 'Papel Tornassol') {
        if(pH < 4.5) return '#cc3f3f';
        else if(pH > 8.3) return '#3f6fcc';
        else return '#a569bd';
    }
    if(indicator === 'Azul de Bromotimol') {
        if(pH < 6.0) return '#e6b422';
        else if(pH > 7.6) return '#2a6f8f';
        else return '#5f9e6e';
    }
    if(indicator === 'Repolho Roxo') {
        if(pH < 4) return '#d64545';
        else if(pH < 7) return '#b85c8e';
        else if(pH < 11) return '#7c9e6e';
        else return '#bbbb66';
    }
    return '#cfd8dc';
}

// Variáveis globais
let currentPhaseIndex = 0;
let totalPoints = 0;
let starsEarned = 0;
let answered = false;
let currentPhase = null;
let selectedIndicator = 'Fenolftaleína';
let expTested = false;
let lastAnswerWasCorrect = false;
let ranking = JSON.parse(localStorage.getItem('labRanking')) || [];

// Elementos DOM
const liquidFill = document.getElementById('liquidFill');
const pointsSpan = document.getElementById('pointsDisplay');
const starsSpan = document.getElementById('starsDisplay');
const questionTxt = document.getElementById('questionTxt');
const optionsDiv = document.getElementById('optionsContainer');
const feedbackArea = document.getElementById('feedbackArea');
const nextBtn = document.getElementById('nextBtn');
const medalArea = document.getElementById('medalArea');
const expResultMsg = document.getElementById('expResultMsg');
const rankListSpan = document.getElementById('rankList');

// Funções auxiliares
function updateRankingDisplay() {
    if(ranking.length === 0) rankListSpan.innerText = 'Nenhum resultado ainda';
    else {
        let top3 = ranking.slice(0,3).map((r,idx)=> `${idx+1}. ${r} pts`).join(' | ');
        rankListSpan.innerText = top3;
    }
}

function saveRanking() {
    ranking.push(totalPoints);
    ranking.sort((a,b)=>b-a);
    if(ranking.length > 5) ranking.pop();
    localStorage.setItem('labRanking', JSON.stringify(ranking));
    updateRankingDisplay();
}

function updatePointsAndStars() {
    pointsSpan.innerText = totalPoints;
    let starElements = document.querySelectorAll('.star');
    starElements.forEach((star, idx) => {
        if(idx < starsEarned) star.classList.remove('inactive');
        else star.classList.add('inactive');
    });
    
    if(starsEarned === 3) medalArea.innerHTML = '🏅 MEDALHA OURO - MESTRE DO pH!';
    else if(starsEarned === 2) medalArea.innerHTML = '🥈 MEDALHA PRATA - BOM QUÍMICO!';
    else if(starsEarned === 1) medalArea.innerHTML = '🥉 MEDALHA BRONZE - APRENDENDO!';
    else medalArea.innerHTML = '⚗️ Continue para ganhar medalhas!';
}

function loadPhase(index) {
    answered = false;
    expTested = false;
    currentPhase = phases[index];
    questionTxt.innerText = `🔬 ${currentPhase.pergunta}`;
    
    optionsDiv.innerHTML = '';
    currentPhase.opcoes.forEach((opt, idx) => {
        let optDiv = document.createElement('div');
        optDiv.className = 'option';
        optDiv.innerText = opt;
        optDiv.onclick = () => handleAnswer(idx);
        optionsDiv.appendChild(optDiv);
    });
    
    feedbackArea.innerHTML = '🧪 Escolha uma resposta e depois teste um indicador na bancada!';
    liquidFill.style.backgroundColor = '#cfd8dc';
    liquidFill.style.height = '70%';
    expResultMsg.innerHTML = `💧 Substância: ${currentPhase.substancia}. Clique num indicador para testar.`;
    
    document.querySelectorAll('.indicator-btn').forEach(btn => {
        if(btn.innerText.includes(selectedIndicator)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
}

function handleAnswer(selectedIdx) {
    if(answered) {
        feedbackArea.innerHTML = '⚠️ Você já respondeu essa pergunta! Prossiga ou teste indicadores.';
        return;
    }
    
    const isCorrect = (selectedIdx === currentPhase.correta);
    lastAnswerWasCorrect = isCorrect;
    
    if(isCorrect) {
        totalPoints += 10;
        feedbackArea.innerHTML = `✅ ACERTOU! ${currentPhase.explicacao} +10 pontos. Agora realize o experimento virtual clicando em um indicador.`;
    } else {
        totalPoints = Math.max(0, totalPoints - 3);
        feedbackArea.innerHTML = `❌ ERRO! ${currentPhase.explicacao} Resposta correta: ${currentPhase.opcoes[currentPhase.correta]}. -3 pontos. Teste o experimento para entender.`;
    }
    
    answered = true;
    updatePointsAndStars();
}

function testIndicator(indicatorName) {
    if(!currentPhase) return;
    
    selectedIndicator = indicatorName;
    document.querySelectorAll('.indicator-btn').forEach(btn => {
        if(btn.innerText.includes(indicatorName)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    const pH = currentPhase.phReal;
    const realColor = getIndicatorColor(indicatorName, pH);
    liquidFill.style.backgroundColor = realColor;
    liquidFill.style.height = '78%';
    
    let explicacaoExtra = "";
    if(indicatorName === "Fenolftaleína") {
        explicacaoExtra = `Fenolftaleína: incolor em pH<8.2 e rosa em básico. pH=${pH} → cor ${realColor === '#ff66b2' ? 'Rosa' : 'Incolor'}.`;
    } else if(indicatorName === "Papel Tornassol") {
        explicacaoExtra = `Tornassol: vermelho em ácido, azul em base. pH=${pH} → ${pH<5?'Vermelho':(pH>8?'Azul':'Transição')}.`;
    } else if(indicatorName === "Azul de Bromotimol") {
        explicacaoExtra = `Azul de Bromotimol: amarelo (ácido), verde (neutro), azul (base). pH=${pH} → ${pH<6?'Amarelo':(pH>7.6?'Azul':'Verde')}.`;
    } else if(indicatorName === "Repolho Roxo") {
        explicacaoExtra = `Antocianina: vermelho (ácido), roxo (neutro), verde/amarelo (base). pH=${pH} → cor característica.`;
    }
    
    expResultMsg.innerHTML = `🧴 ${indicatorName} + ${currentPhase.substancia} (pH ${pH}) → ${explicacaoExtra}<br>✅ Conceito: ${currentPhase.explicacao}`;
    
    if(!expTested && answered) {
        expTested = true;
        totalPoints += 5;
        
        if(lastAnswerWasCorrect) {
            starsEarned = Math.min(3, starsEarned + 1);
        }
        
        updatePointsAndStars();
        feedbackArea.innerHTML += `<br>🧪 Bônus laboratório! +5 pontos por testar o indicador.`;
    } else if(!answered) {
        expResultMsg.innerHTML += `<br>⚠️ Responda a pergunta primeiro para ganhar bônus completo!`;
    }
}

function nextPhase() {
    if(!answered) {
        feedbackArea.innerHTML = '⚠️ Responda a pergunta primeiro antes de avançar!';
        return;
    }
    
    if(currentPhaseIndex + 1 < phases.length) {
        currentPhaseIndex++;
        loadPhase(currentPhaseIndex);
        lastAnswerWasCorrect = false;
        updatePointsAndStars();
    } else {
        feedbackArea.innerHTML = '🏆 PARABÉNS! Você completou todas as fases! Mestre em pH e indicadores! 🎉';
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.6';
        saveRanking();
        medalArea.innerHTML = '🏅🏅🏅 MESTRE DA QUÍMICA! DOMINOU ÁCIDOS, BASES E INDICADORES!';
    }
}

function buildIndicatorsUI() {
    const indicators = ['Fenolftaleína', 'Papel Tornassol', 'Azul de Bromotimol', 'Repolho Roxo'];
    const bar = document.getElementById('indicatorsBar');
    bar.innerHTML = '';
    indicators.forEach(ind => {
        const btn = document.createElement('button');
        btn.innerText = ind;
        btn.className = 'indicator-btn';
        btn.onclick = () => testIndicator(ind);
        bar.appendChild(btn);
    });
}

// Inicialização
function init() {
    buildIndicatorsUI();
    loadPhase(0);
    updatePointsAndStars();
    updateRankingDisplay();
    nextBtn.onclick = nextPhase;
    starsEarned = 0;
    updatePointsAndStars();
    liquidFill.style.transition = 'background-color 0.3s, height 0.2s';
}

init();