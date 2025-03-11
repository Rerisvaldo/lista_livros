import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [livro, setLivro] = useState({
        titulo: "",
        descr: "",
        preco: "",
        capa: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLivro((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/livros", livro);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(livro);
    return (
        <div className="formulario">
            <h1>Adicionar novo livro</h1>
            <input
                type="text"
                placeholder="Titulo"
                onChange={handleChange}
                name="titulo"
                value={livro.titulo}
            />
            
            <input
                type="number"
                placeholder="Preço"
                onChange={handleChange}
                name="preco"
                value={livro.preco}
            />
            <input
                type="text"
                placeholder="Capa do livro"
                onChange={handleChange}
                name="capa"
                value={livro.capa}
            />
            <textarea                
                placeholder="Descrição"
                onChange={handleChange}
                name="descr"
                value={livro.descr}
            />
            <button className="botao"onClick={handleClick}>Adicionar</button>
        </div>
    );
};

export default Add;