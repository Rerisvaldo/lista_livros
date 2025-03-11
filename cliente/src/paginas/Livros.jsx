import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Livros = () => {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const fetchAllLivros = async () => {
            try {
                const res = await axios.get("http://localhost:8800/livros");
                console.log(res.data); // Adicionado para verificar os dados recebidos
                setLivros(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllLivros();
    }, []);

    const excluir = async (idlivros) => {
        try {
            await axios.delete(`http://localhost:8800/livros/${idlivros}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <header className="cabecalho">
                <h1>Lista de livros</h1>
                <button className="botao_adicionar">
                    <Link to="/add">Adicionar novo livro</Link>
                </button>
                
            </header>
            <div className="livros-container">
                {livros.map((livro) => {
                    console.log(livro.idlivros); // Adicionado para verificar se livro.idlivros está presente
                    return (
                        <div className="livro" key={livro.idlivros}>
                            {livro.capa && <img src={livro.capa} alt={livro.Titulo} />}
                            <h2>{livro.Titulo}</h2>
                            <p className='descr'>{livro.descr}</p>
                            <button className="delete" onClick={() => excluir(livro.idlivros)}>Deletar</button>
                            <button className="editar">Editar</button>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Livros;