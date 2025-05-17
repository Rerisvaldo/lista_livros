# Lista de Livros 📚

Este projeto é uma aplicação web para gerenciar uma lista de livros. Ele permite que os usuários adicionem, editem, excluam e visualizem livros. A aplicação utiliza um frontend em React e um backend em Node.js com banco de dados MySQL.

---

## Funcionalidades

### **Frontend**
- **Listagem de Livros**: Exibe uma lista de livros com título, descrição e capa.
- **Adicionar Livro**: Formulário para adicionar novos livros com título, descrição e upload de capa.
- **Editar Livro**: Permite atualizar as informações de um livro existente, incluindo título, descrição e capa.
  - Limite de 180 caracteres para a descrição.
  - Pré-visualização da nova capa antes de salvar.
- **Excluir Livro**: Remove um livro da lista com confirmação antes da exclusão.
- **Carrossel de Livros**: Exibe os livros em um carrossel interativo (Swiper) quando há mais de 5 livros.

### **Backend**
- **API REST**:
  - **GET /livros**: Retorna todos os livros.
  - **GET /livros/:id**: Retorna os detalhes de um livro específico.
  - **POST /livros**: Adiciona um novo livro.
  - **PUT /livros/:id**: Atualiza as informações de um livro.
  - **DELETE /livros/:id**: Exclui um livro do banco de dados.
- **Persistência de Dados**: Utiliza MySQL para armazenar os dados dos livros.
- **Upload de Arquivos**: Gerencia o upload e armazenamento de imagens de capa.

---

## Tecnologias Utilizadas

### **Frontend**
- React.js
- Swiper.js (para o carrossel)
- Axios (para requisições HTTP)
- CSS (para estilização)

### **Backend**
- Node.js
- Express.js
- MySQL
- Multer (para upload de arquivos)

---

## Como Executar o Projeto

### **Pré-requisitos**
- Node.js instalado
- MySQL instalado
- Gerenciador de pacotes `npm` ou `yarn`

### **Passos para Configuração**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd lista_livros
