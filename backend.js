const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}));

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://guilherme:1234@aula.jodpq.mongodb.net/?retryWrites=true&w=majority&appName=aula`);
}

// get: http:localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi');
});

// get: http:localhost:3000/filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes);
});

app.post('/filmes', async (req, res) => {
    // pegar os dados enviados na requisição
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;

    // instanciar um objeto de acordo com o modelo criado
    const filme = new Filme({ titulo: titulo, sinopse: sinopse });
    await filme.save();
    const filmes = await Filme.find();

    // mostrar ao usuario a base atualizada
    res.json(filmes);
});

app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login;
        const password = req.body.password;
        const senhaCriptografada = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ login: login, password: senhaCriptografada });
        const respMongo = await usuario.save();
        console.log(respMongo);
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(409).end();
    }
});

app.post('/login', async (req, res) => {
    // pega os dados que o usuario digitou
    const login = req.body.login;
    const password = req.body.password;

    // verifica se o usuario existe no banco
    const usuarioExiste = await Usuario.findOne({ login: login });
    if (!usuarioExiste) {
        return res.status(401).json({ mensagem: "Login inválido" });
    }

    // se o usuario existe verificamos a senha
    const senhaValida = await bcrypt.compare(password, usuarioExiste.password);
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha inválida" });
    }

    // gerar o token
    const token = jwt.sign(
        { login: login },
        "chave-temporaria",
        { expiresIn: "1h" }
    );
    res.status(200).json({ token: token });
});

app.listen(3000, () => {
    try {
        conectarAoMongo();
        console.log("Server up and running!");
        console.log("Connection ok!");
    }
    catch (err) {
        console.log('Erro de conexão', err);
    }
});