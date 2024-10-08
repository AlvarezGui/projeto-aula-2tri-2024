const protocolo = 'http://';
const baseURL = 'localhost:3000';
const endPoint = '/filmes';

async function obterFilmes(){
    const URLcompleta = `${protocolo}${baseURL}${endPoint}`;
    const filmes = (await axios.get(URLcompleta)).data;
    console.log(filmes);
}