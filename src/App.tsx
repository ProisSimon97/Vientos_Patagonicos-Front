import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NavBar from './components/common/NavBar';


export default function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/comprar" element={<h1>Holaaa</h1>} />
        <Route path="/productos" element={<h1>Holaaaa</h1>} />
        <Route path="/modificar-producto" element={<h1>Holaaaaaaa</h1>} />
        <Route path="/mis-compras" element={<h1>Holasda</h1>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}
