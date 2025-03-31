import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Livros = () => {
    const [livros, setLivros] = useState([]);
    const [mensagem, setMensagem] = useState(""); // Estado para a mensagem de confirmação

    useEffect(() => {
        const fetchAllLivros = async () => {
            try {
                const res = await axios.get("http://localhost:8800/livros");
                setLivros(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllLivros();
    }, []);

    const excluir = async (idlivros, titulo) => {
        const confirmar = window.confirm(`Tem certeza que deseja deletar o livro?\n"${titulo}"`);
        if (!confirmar) return;

        try {
            await axios.delete(`http://localhost:8800/livros/${idlivros}`);
            setLivros((prevLivros) => prevLivros.filter((livro) => livro.idlivros !== idlivros));
            setMensagem(`O livro "${titulo}" foi deletado com sucesso.`);

            // Remove a mensagem após 3 segundos
            setTimeout(() => {
                setMensagem("");
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <header className="cabecalho">
                <h1>Lista de livros</h1>
                <div className="botao_adicionar">
                    <Link to="/add">Adicionar novo livro</Link>
                </div>
            </header>
            {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
            <div className="livros-container">
                {livros.map((livro) => (
                    <div className="livro" key={livro.idlivros}>
                        {livro.capa && (
                            <img src={`http://localhost:8800${livro.capa}`} alt={livro.titulo} />
                        )}
                        <h2 className="titulo">{livro.titulo}</h2>
                        <p className="descr">{livro.descr}</p>
                        <div className="botoes-delete-editar">
                            <button className="delete" onClick={() => excluir(livro.idlivros, livro.titulo)}>Deletar</button>
                            <button className="editar">Editar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Livros;