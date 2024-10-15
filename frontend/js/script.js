const protocolo = 'http://';
const baseURL = 'localhost:3000';
const endPoint = '/filmes';
const URLcompleta = `${protocolo}${baseURL}${endPoint}`;

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
    const filmes = (await axios.get(URLcompleta)).data;
    listarFilmes(filmes);
}

async function cadastrarFilme(){
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
        let alert = document.querySelector('.alert');
        alert.classList.add('show');
        alert.classList.remove('d-none');
        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('d-none');
        }, 2000);
    }
}