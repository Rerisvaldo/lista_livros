import React from "react";
import "./BotaoUpload.css"; // Importa o arquivo CSS

const BotaoUpload = ({ onFileChange }) => {
  return (
    <div className="upload-container">
      
        <label htmlFor="upload" className="botao_upload">
          Imagem
        </label>
        <input
          type="file"
          id="upload"
          className="input_oculto"
          onChange={onFileChange} // Usa a função onFileChange passada como prop
          accept=".png, .jpeg, .jpg" // Aceita apenas arquivos PNG e JPEG
        />      
    </div>
  );
};

export default BotaoUpload;