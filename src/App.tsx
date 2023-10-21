import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NavBar from './components/common/NavBar';
import MisCompras from "./pages/MisCompras";
import Comprar from "./pages/Comprar";

export default function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/comprar" element={<Comprar/>} />
        <Route path="/productos" element={<h1>Holaaaa</h1>}/>
        <Route path="/modificar-producto" element={<h1>Holaaaaaaa</h1>} />
        <Route path="/mis-compras" element={<MisCompras/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}
