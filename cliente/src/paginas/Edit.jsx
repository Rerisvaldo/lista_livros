import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotaoUpload from "./BotaoUpload";

const Edit = () => {
    const [livro, setLivro] = useState({
        titulo: "",
        descr: "",
        capa: "", // Adicionado para garantir que a capa atual seja mantida
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchLivro = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8800/livros/${id}`);
                setLivro(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar o livro:", err);
                setError("Erro ao carregar o livro. Por favor, tente novamente.");
                setLoading(false);
            }
        };
        fetchLivro();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limita a descrição a 180 caracteres
        if (name === "descr" && value.length > 180) return;

        setLivro((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!livro.titulo || !livro.descr) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", livro.titulo);
        formData.append("descr", livro.descr);

        // Se um novo arquivo for selecionado, adiciona ao FormData
        if (file) {
            formData.append("file", file);
        } else {
            // Caso contrário, mantém a capa atual
            formData.append("capa", livro.capa);
        }

        try {
            setLoading(true);
            await axios.put(`http://localhost:8800/livros/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
        } catch (err) {
            console.error("Erro ao atualizar o livro:", err);
            setError("Erro ao atualizar o livro. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="mensagem-erro">{error}</p>;

    return (
        <div className="container">
            <div className="container_form">
                <h1>Editar livro</h1>
                <input
                    className="campo-text-titulo"
                    type="text"
                    placeholder="Título"
                    name="titulo"
                    value={livro.titulo}
                    onChange={handleChange}
                />
                <div className="campo_texto">
                    <div className="capa">
                        {file ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview da nova capa"
                                className="preview-imagem"
                            />
                        ) : (
                            livro.capa && (
                                <img
                                    src={`http://localhost:8800${livro.capa}`}
                                    alt="Capa atual do livro"
                                    className="preview-imagem"
                                />
                            )
                        )}
                    </div>
                    <div className="container_descricao_contador">
                        <textarea
                            className="descri"
                            placeholder="Descrição"
                            name="descr"
                            value={livro.descr}
                            onChange={handleChange}
                        />
                        <p className="contador-caracteres"> {livro.descr.length}/180</p>
                    </div>
                </div>

                <div className="container_botoes">
                    <BotaoUpload onFileChange={handleFileChange} />
                    <div className="botoes-container">
                        <button
                            className="botao-cancelar"
                            onClick={() => navigate("/")} // Redireciona para a página inicial ou lista de livros
                        >
                            Cancelar
                        </button>
                        <button className="botao-salvar" onClick={handleClick} disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;