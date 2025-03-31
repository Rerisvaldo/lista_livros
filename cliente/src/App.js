import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livros from "./paginas/Livros";  
import Update from "./paginas/Update";
import Add from "./paginas/Add";
import"./paginas/Livros.css";
import"./paginas/Add.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Livros />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />     
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
