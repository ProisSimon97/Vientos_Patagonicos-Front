import React, { useState } from 'react'
import Descuentos from '../components/ventas/Descuentos';
import Productos from '../components/ventas/Productos';
import Tarjetas from '../components/ventas/Tarjetas';
import BotonPrecioTotal from '../components/ventas/BotonPrecioTotal';
import BotonComprar from '../components/ventas/BotonComprar';

export default function Comprar() {
    const [selectedProductos, setSelectedProductos] = useState<number[]>([]);
    const [selectedTarjeta, setSelectedTarjeta] = useState<number>();
  
  return (
    <>
     <Descuentos/>
     <Productos selectedProductos={selectedProductos} setSelectedProductos={setSelectedProductos} />
     <Tarjetas setSelectedTarjeta={setSelectedTarjeta}/>
     <BotonPrecioTotal productos={selectedProductos} tarjeta={selectedTarjeta}/>
     <BotonComprar productos={selectedProductos} tarjeta={selectedTarjeta}/>
    </>
  )
}
