import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "hoot",
    password: "Reris@18362310*",
    database: "databese_teste" // Nome do banco de dados correto
});

app.use(express.json()); // Middleware para JSON
app.use(cors({
    origin: "*",
}));

app.get("/", (req, res) => {
    res.json("Olá, isso é o backend");
});

app.get("/livros", (req, res) => {
    const q = "SELECT * FROM databese_teste.livros"; // Selecionando a tabela correta
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/livros",(req,res) =>{
    const q = "INSERT INTO livros (`titulo`,`descr`,`preco`,`capa`) VALUES (?)"
    const values = [
        req.body.titulo,
        req.body.descr,
        req.body.preco,
        req.body.capa,
    ]

    db.query(q,[values],(err,data) =>{
        if (err) return res.json(err);
        return res.json("Livro adicionado com sucesso");
    })
})

app.delete("/livros/:idlivros",(req,res) =>{
    const q = "DELETE FROM livros WHERE idlivros = ?"
    const livroid = req.params.id;

    db.query(q,[livroid],(err,data) =>{
        if (err) return res.json(err);
        return res.json("Livro deletado com sucesso");
    })
})

app.listen(8800, () => {
    console.log("Conectado ao backend!");
});