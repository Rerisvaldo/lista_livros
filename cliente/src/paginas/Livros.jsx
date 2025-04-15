import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react"; // Importa os componentes do Swiper
import "swiper/css"; // Importa os estilos básicos do Swiper
import "swiper/css/navigation"; // Importa os estilos de navegação do Swiper
import { Autoplay, Scrollbar, Navigation } from "swiper/modules"; // Adicione Navigation // Importa o módulo Autoplay do Swiper

const Livros = () => {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);
    const [mensagem, setMensagem] = useState("");

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

    const renderLivro = (livro) => (
        <div className="livro">
            {livro.capa && (
                <img src={`http://localhost:8800${livro.capa}`} alt={livro.titulo} />
            )}
            <h2 className="titulo">{livro.titulo}</h2>
            <p className="descr">{livro.descr}</p>
            <div className="botoes-delete-editar">
                <button className="delete" onClick={() => excluir(livro.idlivros, livro.titulo)}>Deletar</button>
                <button className="editar" onClick={() => navigate(`/edit/${livro.idlivros}`)}>Editar</button>
            </div>
        </div>
    );

    return (
        <div>
            <header className="cabecalho">
                <h1>Lista de livros</h1>
                <div className="botao_adicionar">
                    <Link to="/add">Adicionar novo livro</Link>
                </div>
            </header>
            {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}

            {/* Exibe o carrossel apenas se houver exatamente 5 livros */}
            {livros.length >= 6 ? ( // Altera a condição para exatamente 5 livros
                <Swiper
                    spaceBetween={20} // Espaçamento entre os slides
                    modules={[Scrollbar, Autoplay,Navigation]} // Ativa os módulos de navegação e autoplay
                    autoplay={{ delay: 3000, disableOnInteraction: false }} // Configura o autoplay
                    navigation // Adiciona botões de navegação
                    slidesPerView={5} // Quantidade de slides visíveis ao mesmo tempo
                    loop // Ativa o loop infinito
                >
                    {livros.map((livro) => (
                        <SwiperSlide key={livro.idlivros}>
                            {renderLivro(livro)} {/* Usa a função para renderizar o livro */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="livros-container">
                    {livros.map((livro) => (
                        <div key={livro.idlivros}>
                            {renderLivro(livro)} {/* Usa a função para renderizar o livro */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Livros;