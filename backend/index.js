import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json()); // Middleware para JSON

const db = mysql.createConnection({
    host: "localhost",
    user: "hoot",
    password: "Reris@18362310*",
    database: "databese_teste" // Nome do banco de dados correto
});

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
    const q = "INSET INTO livros (`titulo,`desc,`capa`) VALUES (?)"
    const values = ["titulo do backend","desc do backend", "capa img backend"]

    db.query(q,[values],(err,data) =>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8800, () => {
    console.log("Conectado ao backend!");
});
