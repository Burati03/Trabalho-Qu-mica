🧪 Química QUIZ 📋
📋 ROTEIRO TÉCNICO
1️⃣ VISÃO GERAL DO PROJETO
text
🎯 OBJETIVO: Desenvolver um quiz interativo educativo sobre ácidos, bases e pH
👥 PÚBLICO-ALVO: Estudantes de química, curiosos e educadores
📱 PLATAFORMA: Web (responsiva para desktop, tablet e mobile)
🎨 ESTILO: Design moderno com tema científico e elementos lúdicos
2️⃣ ARQUITETURA DO SITE
text
📁 ESTRUTURA DE ARQUIVOS
├── 📄 index.html     → Estrutura principal da página
├── 🎨 style.css      → Estilos e aparência visual
└── ⚙️ script.js      → Lógica e interatividade do quiz

🔧 TECNOLOGIAS UTILIZADAS
├── 🌐 HTML5    → Semântica e acessibilidade
├── 🎭 CSS3     → Flexbox, animações, design responsivo
└── 📊 JavaScript → Manipulação DOM, lógica de quiz, eventos
3️⃣ COMPONENTES DO SITE
text
🏗️ ESTRUTURA VISUAL
├── 🎨 Barra de pH decorativa (ácido ⬅️ neutro ➡️ base)
├── 🧪 Cabeçalho com título temático
├── 📦 Cartão principal da questão
├── ❓ Área da pergunta
├── 🔘 Opções de resposta (4 alternativas)
├── 💬 Área de feedback explicativo
└── ⏯️ Botões de navegação (anterior/próximo + contador)
4️⃣ FUNCIONALIDADES PRINCIPAIS
text
⚡ INTERATIVIDADES
├── ✅ Seleção de resposta com clique
├── 🟢 Destaque visual para resposta correta
├── 🔴 Destaque visual para resposta incorreta
├── 📝 Feedback explicativo para cada pergunta
├── ⏮️ Navegação entre questões (anterior/próximo)
├── 📊 Indicador de progresso (X/10)
└── 🔒 Bloqueio de resposta após seleção
5️⃣ BANCO DE PERGUNTAS
text
📚 CONTEÚDO EDUCATIVO (10 QUESTÕES)
├── 🔬 Ácidos (faixa de pH, exemplos)
├── 🧪 Bases (características, exemplos)
├── 📏 Escala de pH (neutro, ácido, básico)
├── 🎨 Indicadores naturais (repolho roxo)
├── ⚗️ Indicadores sintéticos (fenolftaleína, tornassol)
└── 🔤 Definições (significado de pH)
6️⃣ FLUXO DO USUÁRIO
text
🔄 SEQUÊNCIA DE INTERAÇÃO
┌─────────────────────────────────────┐
│  1. Usuário abre o site              │
│   ↓                                  │
│  2. Visualiza primeira pergunta      │
│   ↓                                  │
│  3. Clica em uma alternativa         │
│   ↓                                  │
│  4. Recebe feedback imediato         │
│   ↓                                  │
│  5. Avança para próxima questão      │
│   ↓                                  │
│  6. Completa todas as 10 questões    │
│   ↓                                  │
│  7. Pode revisar respostas           │
└─────────────────────────────────────┘
📚 DOCUMENTAÇÃO TÉCNICA
⚗️ pH QUIZ - DOCUMENTAÇÃO OFICIAL 📖
🔰 1. INTRODUÇÃO
O pH Quiz é uma aplicação web educativa interativa desenvolvida para testar e reforçar conhecimentos sobre ácidos, bases e indicadores de pH. O projeto combina design atrativo com funcionalidade pedagógica, oferecendo uma experiência de aprendizado gamificada.

Versão: 1.0.0
Última atualização: Fevereiro/2026
Autor: Desenvolvedor Front-end

🏗️ 2. ESTRUTURA DO PROJETO
2.1 📁 Hierarquia de Arquivos
text
pH-QUIZ/
│
├── 📄 index.html          # Página principal
├── 🎨 style.css           # Folha de estilos
├── ⚙️ script.js           # Lógica do quiz
└── 📄 README.md           # Documentação (este arquivo)
2.2 🌐 Tecnologias Empregadas
Tecnologia	Versão	Finalidade
HTML5	5.3	Estrutura semântica da página
CSS3	Módulos 3 e 4	Estilização e design responsivo
JavaScript	ES2023	Lógica de programação e interatividade
Flexbox	CSS3	Layout responsivo
Glassmorphism	Moderno	Efeitos visuais (blur)
🎨 3. DESIGN E INTERFACE
3.1 🎭 Paleta de Cores
css
🎨 Cores primárias:
├── 🌊 Fundo: #0b2d3b → #1b4f5c (gradiente marinho)
├── 📦 Cartão: #edfffdf2 (off-white com transparência)
├── 🔴 Ácido: #ff9999 (vermelho suave)
├── 🟡 Neutro: #f4f4b0 (amarelo claro)
├── 🔵 Base: #9fd9f0 (azul claro)
└── 📝 Texto: #01262e (azul petróleo escuro)
3.2 📐 Componentes Visuais
text
🖼️ ELEMENTOS GRÁFICOS
├── 📊 Barra de pH (indicador visual contínuo)
├── 🧪 Ícones científicos (🧪⚗️🔬)
├── 💠 Botões com efeito 3D (sombra e profundidade)
├── 🔲 Cards com bordas arredondadas
└── ✨ Efeito glassmorphism (vidro fosco)
3.3 📱 Responsividade
Dispositivo	Largura	Ajustes
📺 Desktop	> 820px	Layout completo
💻 Laptop	551px - 819px	Leve redução de fontes
📱 Mobile	≤ 550px	Fontes reduzidas, padding ajustado
⚙️ 4. FUNCIONALIDADES TÉCNICAS
4.1 📊 Estrutura de Dados
javascript
📦 Banco de Perguntas (Array de objetos):
└── 📝 Cada pergunta contém:
    ├── ❓ question: "texto da pergunta"
    ├── 🔘 options: ["alt1", "alt2", "alt3", "alt4"]
    ├── ✅ correct: índice da alternativa correta (0-3)
    └── 💬 feedback: "explicação educativa"
4.2 🔄 Estado da Aplicação
javascript
⚡ Variáveis de estado:
├── 📍 currentIndex: posição atual (0-9)
├── 📝 userAnswers: array com respostas do usuário
└── 🔒 null: representa pergunta não respondida
4.3 🎯 Funções Principais
Função	Responsabilidade
loadQuestion(index)	Carrega pergunta e opções na tela
selectOption(index, optionIndex)	Processa clique e feedback
updateNavigation()	Gerencia botões anterior/próximo
applyAnswerStyles()	Aplica cores às opções
4.4 🧠 Lógica de Correção
text
🟢 Resposta correta:
├── Opção correta → fundo verde
└── Demais opções → sem destaque

🔴 Resposta incorreta:
├── Opção correta → fundo verde
├── Opção escolhida (errada) → fundo vermelho
└── Demais opções → sem destaque
📋 5. CONTEÚDO EDUCATIVO
5.1 🧪 Temas Abordados
Módulo	Questões	Tópicos
🔬 Ácidos	1, 4	Faixa de pH, exemplos (limão)
⚖️ Escala pH	3, 7	pH neutro (7), básico (9)
🎨 Indicadores	2, 5, 8, 9, 10	Fenolftaleína, repolho roxo, tornassol
📚 Definições	6	Significado de pH
5.2 ✅ Distribuição de Dificuldade
text
📊 NÍVEIS:
├── 🟢 Fácil (40%): conceitos básicos
├── 🟡 Médio (40%): aplicação de conceitos
└── 🔴 Difícil (20%): detalhes específicos
🚀 6. IMPLEMENTAÇÃO E DEPLOY
6.1 💻 Requisitos de Sistema
Navegador moderno com suporte a:

ES6+ JavaScript

CSS Flexbox/Grid

Backdrop-filter (glassmorphism)

6.2 📦 Como Executar
bash
📌 Passo a passo:
1. 📥 Baixe todos os arquivos
2. 📂 Mantenha a estrutura de pastas
3. 🖱️ Clique duas vezes em index.html
4. 🌐 Ou sirva via servidor local (Live Server)
6.3 🔧 Personalização
javascript
📝 Para modificar perguntas:
1. Abra script.js
2. Localize a constante 'questions'
3. Adicione/remova objetos do array
4. Mantenha o formato: {question, options, correct, feedback}
🧪 7. TESTES REALIZADOS
7.1 ✅ Testes de Funcionalidade
Teste	Resultado
Clique em opções	✅ Funcional
Feedback correto/incorreto	✅ Funcional
Navegação anterior/próximo	✅ Funcional
Bloqueio após resposta	✅ Funcional
Responsividade	✅ Aprovada
7.2 🌐 Compatibilidade
text
🟢 Navegadores suportados:
├── Google Chrome (v90+)
├── Mozilla Firefox (v88+)
├── Microsoft Edge (v90+)
├── Safari (v14+)
└── Opera (v76+)
📈 8. MANUTENÇÃO E ATUALIZAÇÕES
8.1 🔄 Versões Futuras
text
🚧 Roadmap v2.0:
├── 🏆 Sistema de pontuação
├── ⏱️ Timer por questão
├── 📊 Ranking de acertos
├── 🌈 Mais indicadores naturais
└── 🔊 Efeitos sonoros opcionais
8.2 🐛 Reportar Problemas
Em caso de bugs ou sugestões:

📧 Email: suporte@phquiz.dev

🐙 GitHub: /ph-quiz/issues

📄 9. LICENÇA E CRÉDITOS
text
© 2026 pH Quiz - Todos os direitos reservados

📚 Conteúdo educativo: Domínio público para fins didáticos
🎨 Design e código: MIT License

🧪 Desenvolvido com 💙 para educação científica
🎯 10. CONSIDERAÇÕES FINAIS
O pH Quiz foi desenvolvido com foco em:

✅ Educação: Conteúdo preciso e explicativo

✅ Usabilidade: Interface intuitiva e agradável

✅ Acessibilidade: Contraste adequado, design limpo

✅ Desempenho: Leve e rápido (sem dependências externas)

text
╔══════════════════════════════════════╗
║  🧪⚗️🔬  FIM DA DOCUMENTAÇÃO  🔬⚗️🧪  ║
║     "Aprenda química de forma         ║
║        divertida e interativa"        ║
╚══════════════════════════════════════╝
📌 Nota: Esta documentação cobre todos os aspectos técnicos e funcionais do projeto pH Quiz. Para suporte adicional, consulte a seção de contato.