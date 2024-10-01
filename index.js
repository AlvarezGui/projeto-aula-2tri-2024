const express = require('express');
const app = express();
app.use(express.json());

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

// get: hhtp:localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi');
});

// get: hhtp:localhost:3000/filmes
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