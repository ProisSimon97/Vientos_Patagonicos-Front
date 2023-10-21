import { useState, useEffect } from 'react';
import Producto from '../../domain/Producto';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Checkbox
} from '@chakra-ui/react'
import { Link } from "react-router-dom";


type ProductoPropType = {
  selectedProductos: number[];
  setSelectedProductos: (selectedIds: number[]) => void;
};

export default function Productos({
  selectedProductos,
  setSelectedProductos
}: ProductoPropType) {
  const [productos, setProductos] = useState<Producto[]>([]);

  const getProductos = async () => {
    try {
      const res = await fetch('http://localhost:8080/producto');
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      } else {
        console.error('Error al cargar los productos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const handleProductoSelect = (idProducto: number) => {
    if (selectedProductos.includes(idProducto)) {
      setSelectedProductos(selectedProductos.filter((id) => id !== idProducto));
    } else {
      setSelectedProductos([...selectedProductos, idProducto]);
    }
  };

  return (
      <Box mt={100}>
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Productos</TableCaption>
                <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Codigo</Th>
                      <Th>Descripcion</Th>
                      <Th>Categoria</Th>
                      <Th>Precio</Th>
                      <Th>Marca</Th>
                      <Th>Editar</Th>
                      <Th>Agregar al carrito</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {productos.map((producto) => (
                  <Tr key={producto.id}>
                    <Td>{producto.id}</Td>
                    <Td>{producto.codigo}</Td>
                    <Td>{producto.descripcion}</Td>
                    <Td>{producto.categoria}</Td>
                    <Td>{producto.precio || '-'}</Td>
                    <Td>{producto.marca}</Td>
                    <Td>
                      <Link to={'/modificar-producto'}>*</Link>
                    </Td>
                    <Td>
                      <Checkbox colorScheme='green'
                        value={producto.id}
                        checked={selectedProductos.includes(producto.id)}
                        onChange={() => handleProductoSelect(producto.id)}
                      />
                    </Td>
                  </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
  );
}
