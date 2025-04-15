import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware para JSON
app.use(cors({
    origin: "*",
}));

// Configuração do banco de dados usando pool
const db = mysql.createPool({
    host: "localhost",
    user: "hoot",
    password: "Reris@18362310*",
    database: "databese_teste", // Nome do banco de dados correto
});

// Criar pasta "uploads" automaticamente, se ela não existir
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Define o diretório correto
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({ storage });

// Rota inicial
app.get("/", (req, res) => {
    res.json("Olá, isso é o backend");
});

// Rota para listar livros
app.get("/livros", (req, res) => {
    const q = "SELECT idlivros, titulo, descr, capa FROM databese_teste.livros";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Erro ao listar livros:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

// Rota para buscar um único livro
app.get("/livros/:idlivros", (req, res) => {
    const q = "SELECT idlivros, titulo, descr, capa FROM livros WHERE idlivros = ?";
    const livroid = req.params.idlivros;

    db.query(q, [livroid], (err, data) => {
        if (err) {
            console.error("Erro ao buscar livro:", err);
            return res.status(500).json({ error: "Erro ao buscar livro" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }
        return res.json(data[0]); // Retorna apenas o livro encontrado
    });
});

// Rota para adicionar livro
app.post("/livros", upload.single('file'), (req, res) => {
    console.log("Corpo da requisição recebido:", req.body);

    // Define o caminho da capa ou um valor padrão
    const capaPath = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.jpg'; // Caminho padrão
    const { titulo, descr } = req.body;

    const q = "INSERT INTO livros (`titulo`, `descr`, `capa`) VALUES (?)";
    const values = [titulo, descr, capaPath];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Erro ao adicionar livro:", err);
            return res.status(500).json(err);
        }
        return res.json("Livro adicionado com sucesso");
    });
});

// Rota para deletar livro
app.delete("/livros/:idlivros", (req, res) => {
    const q = "DELETE FROM livros WHERE idlivros = ?";
    const livroid = req.params.idlivros;

    db.query(q, [livroid], (err, data) => {
        if (err) {
            console.error("Erro ao deletar livro:", err);
            return res.status(500).json(err);
        }
        return res.json("Livro deletado com sucesso");
    });
});

// Rota para atualizar um livro
app.put("/livros/:idlivros", upload.single("file"), (req, res) => {
    const livroid = req.params.idlivros;

    // Verifica se um novo arquivo foi enviado
    const capaPath = req.file ? `/uploads/${req.file.filename}` : req.body.capa;

    const { titulo, descr } = req.body;

    const q = "UPDATE livros SET titulo = ?, descr = ?, capa = ? WHERE idlivros = ?";
    const values = [titulo, descr, capaPath];

    db.query(q, [...values, livroid], (err, data) => {
        if (err) {
            console.error("Erro ao atualizar livro:", err);
            return res.status(500).json({ error: "Erro ao atualizar livro" });
        }
        return res.json("Livro atualizado com sucesso");
    });
});
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Middleware para servir arquivos estáticos

// Rota para upload de imagens
app.post("/uploads", upload.single("file"), (req, res) => {
    console.log("Requisição recebida para /uploads");
    const file = req.file;
    if (!file) {
        console.error("Nenhum arquivo enviado.");
        return res.status(400).send("Nenhum arquivo enviado.");
    }
    console.log("Arquivo enviado:", file);
    res.send("Arquivo enviado com sucesso.");
});

// Inicia o servidor
app.listen(8800, () => {
    console.log("Conectado ao backend na porta 8800!");
});