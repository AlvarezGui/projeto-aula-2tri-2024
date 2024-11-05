// const { toFormData } = require("axios");

const protocolo = 'http://';
const baseURL = 'localhost:3000';

function listarFilmes(filmes){
    // posicionar-se no corpo da tabela
    let tabela = document.querySelector('.filmes');
    let corpoTabela = tabela.getElementsByTagName('tbody')[0];

    // destruir tabela
    corpoTabela.innerHTML = "";
 
    // reconstruir o corpo da tabela
    for(let filme of filmes){
        let linha = corpoTabela.insertRow(0);
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    }
}

async function obterFilmes(){
    const FilmesEndPoint = '/filmes';
    const URLcompleta = `http://localhost:3000${FilmesEndPoint}`;
    const filmes = (await axios.get(URLcompleta)).data;
    listarFilmes(filmes);
}

async function cadastrarFilme(){
    const FilmesEndPoint = '/filmes';
    const URLcompleta = `http://localhost:3000${FilmesEndPoint}`;
    // capturar os inputs
    let tituloInput = document.querySelector('#tituloInput');
    let sinopseInput = document.querySelector('#sinopseInput');
    let titulo = tituloInput.value;
    let sinopse = sinopseInput.value;

    if(titulo && sinopse){
        // limpar os campos de digitação
        tituloInput.value = "";
        sinopseInput.value = "";

        // enviar os dados e receber a coleção atualizada
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data;

        listarFilmes(filmes);
    }
    else{
        exibirAlerta('.alert-filme', "Preencha todos os campos", ["show", "alert-danger"], ["d-none"], 2000);;
    }
}

async function cadastrarUsuario(){
    let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput");
    let passwordCadastroInput = document.querySelector("#passwordCadastroInput");
    let usuarioCadastro = usuarioCadastroInput.value;
    let passwordCadastro = passwordCadastroInput.value;

    if(usuarioCadastro && passwordCadastro){
        try{
            
            const cadastroEnpoint = '/signup';
            const URLcompleta = `http://localhost:3000${cadastroEnpoint}`;
            await axios.post(URLcompleta, {login: usuarioCadastro, password: passwordCadastro});
            usuarioCadastroInput.value = "";
            passwordCadastroInput.value = "";
            
            exibirAlerta(".alert-modal-cadastro", "Usuário cadastrado com sucesso!", ["show", "alert-success"], ["d-none"], 2000);
            OcultarModal("#modalCadastro", 2000);
        }
        catch(err){
            console.log(err);
            exibirAlerta(".alert-modal-cadastro", "Não foi possível cadastrar", ["show", "alert-danger"], ["d-none"], 2000);
        }
    }
    else{
        exibirAlerta('.alert-modal-cadastro', "Preencha todos os campos", ["show", "alert-danger"], ["d-none"], 2000);
    }
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout){
    let alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.remove(...classesToAdd);
        alert.classList.add(...classesToRemove);
    }, timeout);
}

function OcultarModal(seletor, timeout){
    setTimeout(() => {
        let modalCadastro = bootstrap.Modal.getInstance(document.querySelector(seletor));
        modalCadastro.hide();
    }, timeout);
}