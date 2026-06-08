let score=0,stars=0,current=0;
const phases=[
{q:"Vinagre + Repolho Roxo?",o:["Verde","Vermelho","Azul"],a:"Vermelho",c:"red",e:"Ácido: repolho roxo fica vermelho."},
{q:"Fenolftaleína no sabão?",o:["Rosa","Incolor"],a:"Rosa",c:"hotpink",e:"Base: fenolftaleína fica rosa."},
{q:"Bromotimol na água?",o:["Verde","Amarelo","Azul"],a:"Verde",c:"green",e:"pH neutro."},
{q:"Tornassol azul no limão?",o:["Vermelho","Azul"],a:"Vermelho",c:"crimson",e:"Ácido torna azul em vermelho."},
{q:"Amônia é?",o:["Ácida","Básica","Neutra"],a:"Básica",c:"blue",e:"Amônia é básica."}
];

function load(){
if(current>=phases.length){finish();return;}
phase.textContent=current+1;
question.textContent=phases[current].q;
answer.innerHTML="";
phases[current].o.forEach(x=>{
let op=document.createElement("option");
op.text=x; answer.add(op);
});
feedback.textContent="";
expBtn.disabled=true;
}

function checkAnswer(){
if(answer.value===phases[current].a){
score+=20; stars++;
feedback.textContent="✅ Correto!";
}else{
feedback.textContent="❌ Tente aprender com o experimento.";
}
scoreEl();
expBtn.disabled=false;
}

function runExperiment(){
liquid.style.background=phases[current].c;
feedback.textContent=phases[current].e;
setTimeout(()=>{current++;load();},1800);
}

function scoreEl(){
document.getElementById("score").textContent=score;
document.getElementById("stars").textContent=stars;
}

function finish(){
let name=prompt("Nome para o ranking:","Jogador")||"Jogador";
let r=JSON.parse(localStorage.getItem("labphrank")||"[]");
r.push({name,score});
r.sort((a,b)=>b.score-a.score);
r=r.slice(0,10);
localStorage.setItem("labphrank",JSON.stringify(r));
showRank();
document.querySelector(".game").innerHTML=`<h1>🏆 Concluído!</h1><h2>${score} pontos</h2>`;
}

function showRank(){
let r=JSON.parse(localStorage.getItem("labphrank")||"[]");
ranking.innerHTML=r.map(x=>`<li>${x.name} - ${x.score}</li>`).join("");
}

const phase=document.getElementById("phase");
const question=document.getElementById("question");
const answer=document.getElementById("answer");
const feedback=document.getElementById("feedback");
const expBtn=document.getElementById("expBtn");
const liquid=document.getElementById("liquid");

showRank();
load();
