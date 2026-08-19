// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const campoSenha = document.querySelector("#campo-senha");

const botaoGerar = document.querySelector("#botao-gerar");
const botaoCopiar = document.querySelector("#botao-copiar");

const botaoDiminuir = document.querySelector("#botao-diminuir");
const botaoAumentar = document.querySelector("#botao-aumentar");

const numeroCaracteres = document.querySelector("#numero-caracteres");

const checkboxMaiusculas = document.querySelector("#maiusculas");
const checkboxMinusculas = document.querySelector("#minusculas");
const checkboxNumeros = document.querySelector("#numeros");
const checkboxSimbolos = document.querySelector("#simbolos");

const barraForca = document.querySelector("#barra-forca");
const mensagem = document.querySelector("#mensagem");


// ===============================
// CONFIGURAÇÕES
// ===============================

let tamanhoSenha = 12;

const MINIMO = 4;
const MAXIMO = 30;

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";

const numeros = "0123456789";

const simbolos = "!@#$%&*()_+-=[]{}<>?";


// ===============================
// FUNÇÃO PARA PEGAR CARACTERE
// ALEATÓRIO
// ===============================

function caractereAleatorio(texto) {

    const indice = Math.floor(
        Math.random() * texto.length
    );

    return texto[indice];
}


// ===============================
// GERAR SENHA
// ===============================

function gerarSenha() {

    let caracteresDisponiveis = "";

    let senha = "";


    // Verifica as opções selecionadas

    if (checkboxMaiusculas.checked) {
        caracteresDisponiveis += letrasMaiusculas;
    }

    if (checkboxMinusculas.checked) {
        caracteresDisponiveis += letrasMinusculas;
    }

    if (checkboxNumeros.checked) {
        caracteresDisponiveis += numeros;
    }

    if (checkboxSimbolos.checked) {
        caracteresDisponiveis += simbolos;
    }


    // Caso nenhuma opção esteja selecionada

    if (caracteresDisponiveis.length === 0) {

        campoSenha.value = "Selecione uma opção";

        atualizarForca(0);

        mensagem.textContent =
            "Selecione pelo menos uma característica.";

        return;
    }


    // Gera a senha

    for (let i = 0; i < tamanhoSenha; i++) {

        senha += caractereAleatorio(
            caracteresDisponiveis
        );

    }


    campoSenha.value = senha;

    mensagem.textContent = "";

    atualizarForca();
}


// ===============================
// ATUALIZAR TAMANHO
// ===============================

function atualizarTamanho() {

    numeroCaracteres.textContent = tamanhoSenha;

    gerarSenha();
}


// ===============================
// DIMINUIR
// ===============================

botaoDiminuir.addEventListener("click", () => {

    if (tamanhoSenha > MINIMO) {

        tamanhoSenha--;

        atualizarTamanho();
    }

});


// ===============================
// AUMENTAR
// ===============================

botaoAumentar.addEventListener("click", () => {

    if (tamanhoSenha < MAXIMO) {

        tamanhoSenha++;

        atualizarTamanho();
    }

});


// ===============================
// BOTÃO GERAR
// ===============================

botaoGerar.addEventListener("click", () => {

    gerarSenha();

});


// ===============================
// ALTERAÇÃO DOS CHECKBOXES
// ===============================

checkboxMaiusculas.addEventListener(
    "change",
    gerarSenha
);

checkboxMinusculas.addEventListener(
    "change",
    gerarSenha
);

checkboxNumeros.addEventListener(
    "change",
    gerarSenha
);

checkboxSimbolos.addEventListener(
    "change",
    gerarSenha
);


// ===============================
// COPIAR SENHA
// ===============================

botaoCopiar.addEventListener("click", async () => {

    const senha = campoSenha.value;

    if (
        !senha ||
        senha === "Sua senha aparecerá aqui" ||
        senha === "Selecione uma opção"
    ) {
        mensagem.textContent =
            "Gere uma senha antes de copiar.";

        return;
    }


    try {

        await navigator.clipboard.writeText(senha);

        mensagem.textContent =
            "Senha copiada para a área de transferência!";

        botaoCopiar.textContent = "Copiado!";


        setTimeout(() => {

            botaoCopiar.textContent = "Copiar";

        }, 1500);

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível copiar a senha.";

    }

});


// ===============================
// FORÇA DA SENHA
// ===============================

function atualizarForca(valorManual = null) {

    let pontos = 0;

    if (valorManual !== null) {

        pontos = valorManual;

    } else {

        // Pontos pelo tamanho

        if (tamanhoSenha >= 8) {
            pontos++;
        }

        if (tamanhoSenha >= 12) {
            pontos++;
        }

        if (tamanhoSenha >= 16) {
            pontos++;
        }


        // Pontos pelas características

        if (checkboxMaiusculas.checked) {
            pontos++;
        }

        if (checkboxMinusculas.checked) {
            pontos++;
        }

        if (checkboxNumeros.checked) {
            pontos++;
        }

        if (checkboxSimbolos.checked) {
            pontos++;
        }

    }


    // Limita os pontos

    pontos = Math.min(pontos, 7);


    // Senha fraca

    if (pontos <= 2) {

        barraForca.style.width = "25%";
        barraForca.style.background = "#ff304f";

    }

    // Senha média

    else if (pontos <= 4) {

        barraForca.style.width = "50%";
        barraForca.style.background = "#ffcf00";

    }

    // Senha forte

    else if (pontos <= 5) {

        barraForca.style.width = "75%";
        barraForca.style.background = "#70d600";

    }

    // Senha muito forte

    else {

        barraForca.style.width = "100%";
        barraForca.style.background = "#00d084";

    }

}


// ===============================
// INICIALIZAÇÃO
// ===============================

gerarSenha();
