import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [livro, setLivro] = useState({
        titulo: "",
        descr: "",
    });
    const [file, setFile] = useState(null); // Novo estado para o arquivo
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchLivro = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/livros/${id}`);
                setLivro(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLivro();
    }, [id]);

    const handleChange = (e) => {
        setLivro((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Manipula o upload do arquivo
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", livro.titulo);
        formData.append("descr", livro.descr);
        formData.append("file", file); // Adiciona o arquivo ao FormData

        try {
            await axios.put(`http://localhost:8800/livros/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="formulario">
            <h1>Editar livro</h1>
            <input
                type="text"
                placeholder="Titulo"
                onChange={handleChange}
                name="titulo"
                value={livro.titulo}
            />
            <input
                type="file"
                onChange={handleFileChange} // Campo de upload do arquivo
            />
            <textarea
                placeholder="Descrição"
                onChange={handleChange}
                name="descr"
                value={livro.descr}
            />
            <button className="botao" onClick={handleClick}>Salvar</button>
        </div>
    );
};

export default Edit;