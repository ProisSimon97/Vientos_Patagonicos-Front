import { useEffect, useState } from 'react'
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
import { Compra } from '../../domain/Compra';   

export default function Compras() {
    const [compras, setCompras] = useState<Compra[]>([]);

    const getCompras = async () => {
        try {
          const res = await fetch('http://localhost:8080/venta/mis-compras?idCliente=1');
          if (res.ok) {
            const data = await res.json();
            setCompras(data);
          } else {
            console.error('Error al cargar las compras');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
    
      useEffect(() => {
        getCompras();
      }, []);


  return (
    <Box>
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Ultimas tres compras</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Numero de Venta</Th>
                        <Th>Fecha</Th>
                        <Th>Cliente</Th>
                        <Th isNumeric>Monto</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {compras.map((compra: Compra) => (
                        <Tr>
                          <Td>{compra.numeroUnico}</Td>
                          <Td>{compra.fecha}</Td>
                          <Td>{compra.cliente}</Td>
                          <Td isNumeric>{compra.montoTotal}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
  )
}
