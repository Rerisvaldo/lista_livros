import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livros from "./paginas/Livros";  
import Edit from "./paginas/Edit";
import Add from "./paginas/Add";
import"./paginas/Livros.css";
import"./paginas/Add.css";
import "./paginas/BotaoUpload.css";
import "./paginas/Edit.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Livros />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />    
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
