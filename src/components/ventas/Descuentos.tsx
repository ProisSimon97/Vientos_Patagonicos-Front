import { useState, useEffect } from 'react';
import Descuento from '../../domain/Descuento';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box
} from '@chakra-ui/react'

export default function Descuentos() {
  const [descuentos, setDescuentos] = useState<[]>([]);
  
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
  const day = String(fechaActual.getDate()).padStart(2, '0');
  
  const fechaFormateada = `${year}-${month}-${day}`;
  

const getProductos = async function fetchData() {
    try {
      const res = await fetch(`http://localhost:8080/descuento?fecha=${fechaFormateada}`);
      if (res.ok) {
        const data = await res.json();
        setDescuentos(data);
      } else {
        console.error('Error al cargar los descuentos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  useEffect(() => {
    getProductos();
  }, []);

  return (
      <Box>
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Descuentos</TableCaption>
                <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Fecha de Inicio</Th>
                      <Th>Fecha de Fin</Th>
                      <Th>Descuento (%)</Th>
                      <Th>Marca</Th>
                      <Th>Tarjeta</Th>
                    </Tr>
                </Thead>
                <Tbody>
                  {descuentos.map((descuento: Descuento) => (
                  <Tr key={descuento.id}>
                    <Td>{descuento.id}</Td>
                    <Td>{descuento.fechaInicio}</Td>
                    <Td>{descuento.fechaFin}</Td>
                    <Td>{descuento.descuento}%</Td>
                    <Td>{descuento.marca || '-'}</Td>
                    <Td>{descuento.tarjeta || '-'}</Td>
                  </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
  );
}
