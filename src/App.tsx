import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NavBar from './components/common/NavBar';
import MisCompras from "./pages/MisCompras";
import Comprar from "./pages/Comprar";
import ModificarProductosPage from "./pages/ModificarProductosPage";

export default function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/comprar" element={<Comprar/>} />
        <Route path="/modificar-producto/:id" element={<ModificarProductosPage/>} />
        <Route path="/mis-compras" element={<MisCompras/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}
