const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let filmes = [
    {
        titulo: 'eu',
        sinopse: 'ele'
    },
    {
        titulo: 'ela',
        sinopse: 'gomes'
    }
]

// get: http:localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi');
});

// get: http:localhost:3000/filmes
app.get('/filmes', (req, res) =>{
    res.json(filmes)
});

app.post('/filmes', (req, res) =>{
    // pegar os dados enviados na requisição
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;

    // montar o json do novo filme
    const novo_filme = {titulo: titulo, sinopse: sinopse};
    filmes.push(novo_filme);

    // mostrar ao usuario a base atualizada
    res.json(filmes);
});

app.listen(3000, () => console.log("Server up and running!"));