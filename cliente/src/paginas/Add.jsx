import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add.css"; // Importa o arquivo CSS
import BotaoUpload from "./BotaoUpload"; // Importa o componente BotaoUpload

const Add = () => {
    const [livro, setLivro] = useState({
        titulo: "",
        descr: "",
    });
    const [file, setFile] = useState(null); // Novo estado para o arquivo
    const [errors, setErrors] = useState({}); // Estado para armazenar erros de validação
    const [charCount, setCharCount] = useState(0); // Estado para contar caracteres
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLivro((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name === "descr") {
            setCharCount(e.target.value.length); // Atualiza a contagem de caracteres
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Manipula o upload do arquivo
    };

    const validate = () => {
        let tempErrors = {};
        if (!livro.titulo) tempErrors.titulo = "O título é obrigatório.";
        if (!livro.descr) tempErrors.descr = "A descrição é obrigatória.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append("titulo", livro.titulo);
        formData.append("descr", livro.descr);
        formData.append("file", file); // Adiciona o arquivo ao FormData

        try {
            // Use o endpoint correto para adicionar livros ao banco
            await axios.post("http://localhost:8800/livros", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container_formulario">
            <div className="formulario">
                <h1>Adicionar novo livro</h1>
                <input
                    className={`campo-texto-titulo ${errors.titulo ? "error" : ""}`}
                    type="text"
                    placeholder="Titulo"
                    onChange={handleChange}
                    name="titulo"
                    value={livro.titulo}
                    maxlength="40"
                />
                {errors.titulo && <span className="error-message">{errors.titulo}</span>}
                <textarea
                    className={`descricao ${errors.descr ? "error" : ""}`}
                    placeholder="Descrição"
                    onChange={handleChange}
                    name="descr"
                    value={livro.descr}
                    maxlength="180" // Define o limite de caracteres
                />
                <div className="char-count">{charCount}/180 caracteres</div>
                {errors.descr && <span className="error-message">{errors.descr}</span>}
                <div className="container_botoes">
                    <BotaoUpload onFileChange={handleFileChange} /> {/* Usa o componente BotaoUpload */}
                    <button className="botao" onClick={handleClick}>Adicionar</button>
                </div>
            </div>
        </div>
    );
};

export default Add;