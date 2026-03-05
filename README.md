1. Introdução

O pH Quiz é uma aplicação web educativa interativa desenvolvida com o objetivo de auxiliar no aprendizado de conceitos fundamentais da química, especialmente relacionados a ácidos, bases e indicadores de pH.

A plataforma apresenta perguntas de múltipla escolha e fornece feedback imediato, permitindo que o usuário aprenda enquanto responde às questões.

O projeto foi desenvolvido utilizando tecnologias web padrão, sem dependência de bibliotecas externas, garantindo simplicidade, desempenho e fácil manutenção.

2. Objetivo do Projeto

O principal objetivo do pH Quiz é proporcionar uma ferramenta digital que torne o aprendizado de química mais interativo e didático.

A aplicação busca:

Reforçar conceitos básicos de química

Estimular o aprendizado por meio de perguntas

Oferecer explicações educativas após cada resposta

Criar uma experiência simples e intuitiva para o usuário

3. Público-Alvo

O sistema foi projetado para atender principalmente:

Estudantes do ensino fundamental e médio

Professores que desejam utilizar ferramentas digitais em aula

Pessoas interessadas em revisar conceitos básicos de química

4. Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias fundamentais do desenvolvimento web.

Tecnologia	Função
HTML5	Estrutura semântica da página
CSS3	Estilização e layout responsivo
JavaScript	Lógica do quiz e interatividade

Outros recursos utilizados:

Flexbox para organização de layout

Design responsivo para diferentes dispositivos

Manipulação do DOM para atualização dinâmica do conteúdo

5. Estrutura do Projeto

O sistema possui uma estrutura simples e organizada em três arquivos principais.

pH-QUIZ/
│
├── index.html
├── style.css
├── script.js
└── README.md
index.html

Responsável pela estrutura da interface da aplicação.

Contém:

Cabeçalho do site

Barra visual da escala de pH

Cartão principal do quiz

Área de perguntas

Opções de resposta

Área de feedback

Botões de navegação

style.css

Arquivo responsável pela aparência visual da aplicação.

Principais funções:

Definição da paleta de cores

Estilo dos cartões e botões

Layout responsivo para diferentes telas

Ajustes visuais para melhorar a experiência do usuário

script.js

Responsável pela lógica do sistema.

Principais funções:

Armazenamento das perguntas

Controle da pergunta atual

Registro das respostas do usuário

Correção automática das respostas

Exibição de feedback educativo

6. Estrutura da Interface

A interface do sistema foi projetada para ser clara, simples e intuitiva.

Os principais componentes são:

Barra de pH

Localizada na parte superior da página, apresenta uma representação visual da escala de pH, dividida em:

faixa ácida

faixa neutra

faixa básica

Esse elemento ajuda o usuário a associar visualmente os conceitos químicos apresentados no quiz.

Cartão de Pergunta

Elemento central da interface que apresenta:

número da questão

texto da pergunta

quatro alternativas de resposta

área de feedback explicativo

Opções de Resposta

Cada pergunta possui quatro alternativas.

Após a seleção:

a resposta correta é destacada

respostas incorretas são indicadas visualmente

uma explicação educativa é exibida

Navegação entre Questões

O usuário pode navegar entre as perguntas utilizando botões de navegação.

A interface apresenta:

botão de pergunta anterior

botão de próxima pergunta

indicador de progresso (exemplo: 3/10)

7. Funcionamento do Sistema

O fluxo de uso da aplicação ocorre da seguinte forma:

O usuário abre o site no navegador.

A primeira pergunta do quiz é carregada automaticamente.

O usuário seleciona uma das alternativas disponíveis.

O sistema verifica se a resposta está correta ou incorreta.

Um feedback explicativo é exibido ao usuário.

O usuário pode avançar para a próxima pergunta ou retornar à anterior.

O processo continua até que todas as perguntas sejam respondidas.

8. Banco de Perguntas

O sistema possui um conjunto de 10 perguntas educativas organizadas em um banco de dados simples dentro do arquivo JavaScript.

Cada pergunta possui a seguinte estrutura:

{
  question: "Texto da pergunta",
  options: ["alternativa1", "alternativa2", "alternativa3", "alternativa4"],
  correct: índice_da_resposta_correta,
  feedback: "explicação educativa"
}

Os temas abordados incluem:

conceitos de ácidos

conceitos de bases

escala de pH

indicadores naturais

indicadores sintéticos

definição de pH

9. Responsividade

O sistema foi desenvolvido para funcionar em diferentes dispositivos.

Dispositivo	Ajuste
Desktop	Layout completo
Laptop	Ajustes de tamanho de fonte
Mobile	Redução de fontes e espaçamento
10. Execução do Projeto

Para executar o projeto localmente:

Baixar todos os arquivos do projeto.

Manter a estrutura de pastas original.

Abrir o arquivo index.html em um navegador.

Também é possível utilizar um servidor local, como o Live Server.

11. Possíveis Melhorias Futuras

O projeto pode ser expandido com novas funcionalidades, como:

sistema de pontuação

cronômetro por pergunta

ranking de jogadores

aumento do número de perguntas

efeitos sonoros

animações adicionais

12. Conclusão

O pH Quiz demonstra como tecnologias web simples podem ser utilizadas para criar ferramentas educativas interativas.

A aplicação combina conteúdo pedagógico, design intuitivo e interatividade, oferecendo uma forma dinâmica de aprender conceitos importantes da química.