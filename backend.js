const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}));

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

async function conectarAoMongo(){
    await mongoose.connect(`mongodb+srv://guilherme:1234@aula.jodpq.mongodb.net/?retryWrites=true&w=majority&appName=aula`);
}

// get: http:localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi');
});

// get: http:localhost:3000/filmes
app.get('/filmes', async (req, res) =>{
    const filmes = await Filme.find();
    res.json(filmes);
});

app.post('/filmes', async(req, res) =>{
    // pegar os dados enviados na requisição
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;

    // instanciar um objeto de acordo com o modelo criado
    const filme = new Filme({titulo: titulo, sinopse: sinopse});
    await filme.save();
    const filmes = await Filme.find();

    // mostrar ao usuario a base atualizada
    res.json(filmes);
});

app.post('/signup', async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const usuario = new Usuario({login: login, password: password});
    const respMongo = await usuario.save();
    console.log(respMongo);
    res.end();
});

app.listen(3000, () =>{
    try{
        conectarAoMongo();
        console.log("Server up and running!");
        console.log("Connection ok!");
    }
    catch(err){
        console.log('Erro de conexão', err);
    } 
});