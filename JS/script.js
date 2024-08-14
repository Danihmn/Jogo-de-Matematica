var respostaCorreta; // Variável global que armazena a resposta correta
var tabuadaEscolhida; // Variável global que armazena a tabuada que será escolhida
var acertos = 0; // Variável global que armazena os acertos para trocar de nível

// Array global para armazenar números aleatórios já sorteados
var arrayNumerosAleatorios = [];

// Cria o elemento de áudio
var audio = new Audio("./SND/Where's My Water - Theme Song.mp3");

// Configura o áudio
audio.loop = true; // Reproduz a música em loop

// Função que faz a pergunta de matemática
function pergunta(numeroSorteado) {
    // Pegando os elementos no HTML
    var perguntaNumero1 = document.getElementById("perguntaNumero1");
    var perguntaNumero2 = document.getElementById("perguntaNumero2");
    var vezes = document.getElementById("sinalVezes");
    var igual = document.getElementById("sinalIgual");

    // Atribuindo para a variável global o parâmetro da função
    tabuadaEscolhida = numeroSorteado; 

    var max = 10; // Número máximo que pode ser sorteado

    var numeroAleatorio; // Variável que armazenará o número sorteado

    // Loop para garantir que o número aleatório não seja repetido
    do {
        numeroAleatorio = Math.floor(Math.random() * max + 1);
    } while (arrayNumerosAleatorios.includes(numeroAleatorio));

    arrayNumerosAleatorios.push(numeroAleatorio); // Adicionando o número sorteado ao array

    // Variável conta com o valor da multiplicação dos dois fatores
    var conta = numeroAleatorio * tabuadaEscolhida;
    console.log(conta); // Exibindo o valor no console

    // Escrevendo na tela os números escolhidos nos inputs HTML
    perguntaNumero1.textContent = numeroAleatorio;
    perguntaNumero2.textContent = tabuadaEscolhida;
    vezes.textContent = "X";
    igual.textContent = "=";

    // Atribuindo para a variável global o valor da multiplicação
    respostaCorreta = conta; 

    // Escondendo as tabuadas da tela enquanto estiver nas contas
    document.getElementById("tabuadas").style.display = "none";
    
    // Exibindo a pergunta
    perguntaNumero1.style.display = "inline";
    perguntaNumero2.style.display = "inline";
    vezes.style.display = "inline";
    igual.style.display = "inline";

    // Exibindo os inputs de resposta
    document.getElementById("escolha1").style.display = "block";
    document.getElementById("escolha2").style.display = "block";
    document.getElementById("escolha3").style.display = "block";
    document.getElementById("escolha4").style.display = "block";

    // Exibindo a imagem de fundo
    document.getElementById("questao").style.display = "block";
}

// Função para resetar os números aleatórios
function resetarNumerosAleatorios() {
    arrayNumerosAleatorios = [];
}

// Função que mostra os resultados dentro dos inputs de respostas
function resultados() {
    // Pegando os elementos no HTML
    var resposta1 = document.getElementById("escolha1");
    var resposta2 = document.getElementById("escolha2");
    var resposta3 = document.getElementById("escolha3");
    var resposta4 = document.getElementById("escolha4");

    // Função arrow que sorteia algum número aleatório até 100
    var sortearRespostaErrada = () => Math.floor(Math.random() * 100 + 1);

    // Função para garantir que as respostas erradas sejam únicas
    function gerarRespostasErradas() {
        let respostasErradas = new Set();
        // Até que tenham 3 respostas erradas únicas, continua gerando
        while(respostasErradas.size < 3) {
            let numeroErrado = sortearRespostaErrada();
            if (numeroErrado !== respostaCorreta) {
                respostasErradas.add(numeroErrado);
            }
        }
        return Array.from(respostasErradas);
    }

    // Array com as respostas erradas únicas
    var respostasErradas = gerarRespostasErradas();

    // Array que armazena as respostas erradas e a resposta correta
    var arrayDeEscolhas = [...respostasErradas, respostaCorreta];

    // Usando o algoritmo de Fisher-Yates para embaralhar o array de escolhas
    function embaralhar(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array; // Atribuindo para a função o valor do array embaralhado
    }

    // Declarando uma variável com o valor do array de escolhas, que agora está embaralhado
    var respostasEmbaralhadas = embaralhar(arrayDeEscolhas);

    // As variáveis de resposta recebem os resultados do array aleatoriamente, apenas um é correto
    resposta1.value = respostasEmbaralhadas[0];
    resposta2.value = respostasEmbaralhadas[1];
    resposta3.value = respostasEmbaralhadas[2];
    resposta4.value = respostasEmbaralhadas[3];

    // Função verificar resposta que trabalhará sempre que clicar em alguma das alternativas
    resposta1.onclick = verificarResposta;
    resposta2.onclick = verificarResposta;
    resposta3.onclick = verificarResposta;
    resposta4.onclick = verificarResposta;
}

// Função que verificará se está certa ou não a resposta
function verificarResposta(event) {
    // variável que recebe o valor que está dentro do input que foi clicado
    var respostaSelecionada = parseInt(event.target.value);

    // Se o input clicado tiver o mesmo valor do resultado correto...
    if (respostaSelecionada === respostaCorreta) {
        acertos++; // Incrementa na variável acertos
        document.getElementById("textoMensagem").textContent = "";
        if (acertos >= 5) {
            // Quando acertar quatro vezes...
            document.getElementById("textoMensagem").style.color = "darkblue"; // Muda a cor do texto para vermelho
            document.getElementById("textoMensagem").textContent = "Parabéns, escolha outra tabuada";
            acertos = 0; // Retorna a variável acertos para 0

            // Chamando as funções em 2 segundos, para dar tempo de ler
            setTimeout(() => telaInicial(), 3000);
            setTimeout(() => resetarNumerosAleatorios(), 3000);
            setTimeout(() => audio.pause(), 3000);
        } else {
            novaPergunta(); // Caso não tiverem os acertos necessários, continua fazendo as perguntas
        }
    } else {
        document.getElementById("textoMensagem").textContent = "";
        document.getElementById("textoMensagem").style.color = "red"; // Muda a cor do texto para vermelho
        document.getElementById("textoMensagem").textContent = "Resposta incorreta, tente novamente";
    }

    // Exibindo no console para teste
    console.log("Resposta correta: " + respostaCorreta);
    console.log("Resposta selecionada: " + respostaSelecionada);
}

// Função que carrega a tela de início
function telaInicial() {
    audio.play(); // Começa a tocar a música

    // Escondendo o texto de mensagem quando a função for chamada novamente
    document.getElementById("textoMensagem").textContent = "";

    var botoes = []; // Criando um array de botões vazio
    for (var i = 1; i <= 10; i++) {
        // Variável que armazena sempre o valor de i, criado no for
        var botao = document.getElementById(i.toString());
        botoes.push(botao); // Adiciona no array o valor do botão, ou seja, de 1 a 10
    }

    // Baseado no botão da tabuada selecionada...
    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            var numeroEscolhido = parseInt(botao.value);
            pergunta(numeroEscolhido); // Exibe as contas com base na tabuada que escolheu
            resultados(); // Exibe os resultados
        });
    });

    // Exibindo os números das tabuadas
    document.getElementById("tabuadas").style.display = "block";

    // Escondendo as respostas, enquanto as tabuadas aparecerem
    document.getElementById("escolha1").style.display = "none";
    document.getElementById("escolha2").style.display = "none";
    document.getElementById("escolha3").style.display = "none";
    document.getElementById("escolha4").style.display = "none";

    // Variável que recebe o valor do id do HTML
    var perguntas = document.getElementsByClassName("perguntinha");

    // Loop for que percorre todos os elementos com Class "perguntinha"
    for (var i = 0; i < perguntas.length; i++) {
        perguntas[i].style.display = "none"; // Esconde eles enquanto a tabuada aparece
    }

    // Esconde o sinal de vezes e o sinal de igual
    document.getElementById("sinalVezes").style.display = "none";
    document.getElementById("sinalIgual").style.display = "none";

    // Escondendo a imagem de jogo da tela
    document.getElementById("questao").style.display = "none";
    
    // Escondendo o botão de jogar da tela
    document.getElementById("btnJogar").style.display = "none";
}

// Função que serve para chamar novas perguntas
function novaPergunta() {
    pergunta(tabuadaEscolhida);
    resultados();
}

telaInicial(); // Chamando a função que inicia o jogo