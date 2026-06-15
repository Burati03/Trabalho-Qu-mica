## Documentação do Jogo - pH Runner: Acid Base Rush

## Índice
1. [Visão Geral](#visão-geral)
2. [Como Jogar](#como-jogar)
3. [Regras do Jogo](#regras-do-jogo)
4. [Mecânicas do Jogo](#mecânicas-do-jogo)
5. [Fases do Jogo](#fases-do-jogo)
6. [Estrutura de Arquivos](#estrutura-de-arquivos)
7. [Personalização](#personalização)
8. [Requisitos Técnicos](#requisitos-técnicos)

---

## Visão Geral

**pH Runner: Acid Base Rush** é um jogo educacional desenvolvido em HTML5, CSS e JavaScript que ensina conceitos de química relacionados a ácidos, bases e pH. O jogador controla um cientista que precisa coletar substâncias e responder perguntas para avançar através de 5 fases com dificuldade progressiva, enquanto foge de criaturas tóxicas.

---

## Como Jogar

### Controles
| Tecla | Ação |
|-------|------|
| W | Mover para cima |
| A | Mover para esquerda |
| S | Mover para baixo |
| D | Mover para direita |

### Objetivo Principal
Completar as 5 fases coletando itens e respondendo corretamente às perguntas obrigatórias de cada fase.

---

## Regras do Jogo

### 1. Sistema de Coleta

| Item | Cor | Efeito | Pontuação |
|------|-----|--------|------------|
| Frasco Ácido (A) | Vermelho | Diminui o pH em 1 ponto | +1 ponto |
| Frasco Base (B) | Azul | Aumenta o pH em 1 ponto | +1 ponto |
| Cristal Especial (*) | Dourado | Coleta rara | +2 pontos |
| Power-Up (P) | Dourado com P | Ativa um quiz bônus | +5 pontos (se acertar) |

### 2. Sistema de pH
- O pH varia de 0 a 14
- pH 7 é considerado neutro
- pH abaixo de 7 indica acidez
- pH acima de 7 indica basicidade
- O pH influencia visualmente o fundo do jogo

### 3. Sistema de Inimigos
- Os inimigos perseguem o jogador automaticamente
- Cada contato com um inimigo reduz 1 ponto de vida
- A cada 15 pontos coletados, um novo inimigo aparece
- Inimigos não podem se sobrepor entre si (sistema de colisão)

### 4. Sistema de Vida
- O jogador começa com 5 pontos de vida
- Ao perder toda a vida, o jogo termina
- O botão Reiniciar permite começar novamente

### 5. Sistema de Fases

| Fase | Nome | Itens Necessários | Inimigos Iniciais |
|------|------|-------------------|-------------------|
| 1 | Alpha Lab | 12 | 1 |
| 2 | Green Zone | 15 | 2 |
| 3 | Purple Chamber | 18 | 2 |
| 4 | Core Reactor | 21 | 3 |
| 5 | Final Rush | 25 | 4 |

### 6. Sistema de Perguntas

#### Pergunta Obrigatória de Fase
- Ao atingir a meta de coletas da fase, uma pergunta aparece
- O jogador deve responder corretamente para avançar
- **Acertar:** +3 pontos e avança para a próxima fase
- **Errar:** -2 pontos e a fase é reiniciada (itens, inimigos e coletas resetam; pontos mantêm os do início da fase)

#### Perguntas das Fases

| Fase | Pergunta | Resposta Correta |
|------|----------|------------------|
| 1 | Qual o pH de uma substancia neutra? | 7 |
| 2 | O que o indicador de pH faz? | Muda de cor com acidez |
| 3 | Suco de limao e classificado como: | Acido |
| 4 | Hidroxido de sodio (NaOH) e: | Base forte |
| 5 | Qual a cor do indicador universal em meio basico? | Azul |

#### Power-Up Quiz
- Ao coletar o item Power-Up, um quiz bônus é ativado
- **Acertar:** +5 pontos, pH ajusta em direção ao neutro
- **Errar:** -2 pontos
- **Pular:** Nenhum bônus ou penalidade
- O power-up reaparece após 10 segundos

### 7. Banco de Perguntas do Power-Up
O jogo contém 12 perguntas variadas sobre química que não se repetem até que todas tenham sido utilizadas.

---

## Mecânicas do Jogo

### Movimentação
- O jogador se move livremente pelo canvas
- Colisão apenas com as bordas da tela (não há paredes internas)
- Movimento suave com velocidade constante

### Geração de Itens
- Itens são gerados aleatoriamente no início de cada fase
- Itens não podem spawnar sobre o jogador
- Quando poucos itens restam, novos são gerados automaticamente

### Inteligência dos Inimigos
- Inimigos perseguem o jogador continuamente
- Velocidade aumenta progressivamente com as fases
- Sistema de colisão entre inimigos evita sobreposição

### Sistema de Feedback
- Mensagens na área de informações mostram ações do jogador
- Feedback visual centralizado aparece para acertos e erros em quizzes
- Cores diferentes indicam sucesso (verde) ou erro (vermelho)

---

## Fases do Jogo

### Fase 1 - Alpha Lab
- Fundo azul escuro
- 1 inimigo de velocidade 1.5
- 12 itens necessários para avançar
- Ideal para aprendizado inicial

### Fase 2 - Green Zone
- Fundo verde escuro
- 2 inimigos de velocidade 1.8
- 15 itens necessários
- Introduz múltiplos perseguidores

### Fase 3 - Purple Chamber
- Fundo roxo escuro
- 2 inimigos de velocidade 2.0
- 18 itens necessários
- Inimigos mais rápidos

### Fase 4 - Core Reactor
- Fundo laranja escuro
- 3 inimigos de velocidade 2.3
- 21 itens necessários
- Aumento significativo na dificuldade

### Fase 5 - Final Rush
- Fundo vermelho escuro
- 4 inimigos de velocidade 2.6
- 25 itens necessários
- Desafio máximo

---

## Estrutura de Arquivos

```
projeto/
├── index.html    # Estrutura HTML do jogo
├── style.css     # Estilos e animações
└── game.js       # Lógica completa do jogo
```

### index.html
Contém a estrutura da página, canvas para renderização, painel de informações e modais para perguntas.

### style.css
Define a aparência do jogo: layout, cores, animações de feedback, estilos dos modais e responsividade.

### game.js
Implementa toda a lógica do jogo:
- Movimentação do jogador
- IA dos inimigos
- Sistema de coleta e pontuação
- Gerenciamento de fases
- Sistema de perguntas e quizzes
- Colisões e hitboxes
- Reinício e reset do jogo

---

## Personalização

### Alterar Número de Fases
Modifique o objeto `phases` em game.js adicionando novas fases com os parâmetros:
- name: Nome da fase
- needCollect: Itens necessários
- itemCount: Total de frascos
- obstacleCount: Total de cristais
- villainCount: Número de inimigos
- villainSpeed: Velocidade dos inimigos
- playerStart: Posição inicial

### Alterar Perguntas
- **Perguntas de fase:** Modifique o objeto `phaseQuestions`
- **Perguntas do Power-Up:** Modifique o array `powerUpQuestions`

### Ajustar Dificuldade
- `player.speed`: Velocidade do jogador (padrão: 5)
- `health`: Vida inicial (padrão: 5)
- `villainSpeed`: Velocidade base dos inimigos
- Frequência de novos inimigos (linha com `score % 15`)

### Cores dos Fundos
As cores de cada fase podem ser alteradas na função `drawBackground()` modificando os valores dos gradientes.

---

## Requisitos Técnicos

### Navegadores Suportados
- Google Chrome (versão 60+)
- Mozilla Firefox (versão 55+)
- Microsoft Edge (versão 79+)
- Opera (versão 47+)
- Safari (versão 12+)

### Tecnologias Utilizadas
- HTML5 Canvas para renderização gráfica
- CSS3 para estilos e animações
- JavaScript ES6+ para lógica do jogo

### Resolução Mínima Recomendada
- Largura: 1024 pixels
- Altura: 768 pixels

### Dependências
Nenhuma dependência externa necessária. O jogo roda puramente com HTML, CSS e JavaScript.

---

## Instalação e Execução

1. Baixe os três arquivos: `index.html`, `style.css` e `game.js`
2. Coloque todos os arquivos na mesma pasta
3. Abra o arquivo `index.html` em qualquer navegador moderno
4. Utilize as teclas WASD para controlar o personagem

Não é necessário servidor web - o jogo funciona localmente.

---

## Créditos

**pH Runner: Acid Base Rush** foi desenvolvido como ferramenta educativa interativa para ensino de química, abordando conceitos fundamentais como:
- Escala de pH (0-14)
- Propriedades de ácidos e bases
- Funcionamento de indicadores de pH
- Aplicações práticas na química do dia a dia

---

## Suporte e Contribuição

### Reportar Bugs
Caso encontre algum bug ou comportamento inesperado:
1. Reinicie o jogo usando o botão "REINICIAR"
2. Atualize a página do navegador
3. Verifique se o navegador está atualizado

### Sugestões de Melhoria
Para sugerir melhorias ou novas funcionalidades:
- Novas perguntas para o banco de dados
- Ajustes de balanceamento das fases
- Novos tipos de obstáculos ou power-ups
- Temas visuais adicionais

---

## Licença

Jogo educacional de código aberto para fins de aprendizado. Pode ser modificado e distribuído livremente para uso educacional não comercial.

---

## Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 2024 | Versão inicial com 5 fases, inimigos, power-ups e sistema de perguntas |
| 1.1 | 2024 | Adicionado reinício de fase ao errar pergunta obrigatória |
| 1.2 | 2024 | Interface mais limpa e otimizada |
| 1.3 | 2024 | Renomeado para pH Runner: Acid Base Rush |

---

**Prepare-se para correr e aprender química!**