import { useState, useEffect, ChangeEvent } from 'react';
import Tarjeta from '../../domain/Tarjeta';
import {
  Select, 
  Center,
  AbsoluteCenter
} from '@chakra-ui/react'

type TarjetaPropType = {
  setSelectedTarjeta: any;
};

export default function Tarjetas({
  setSelectedTarjeta
}: TarjetaPropType) {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);

  const getTarjetasCredito = async () => {
    try {
      const res = await fetch('http://localhost:8080/cliente?id=1');
      if (res.ok) {
        const data = await res.json();
        setTarjetas(data);
      } else {
        console.error('Error al cargar las tarjetas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    getTarjetasCredito();
  }, []);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected: number = parseInt(e.target.value);
    setSelectedTarjeta(selected);
  };

  return (
    <Center position='relative' h='100px'>
      <AbsoluteCenter p='4' color='white' axis='both'>
        <Select
          onChange={handleSelectionChange}
          placeholder='Seleccione una tarjeta de crédito'
        >
          {tarjetas.map((tarjeta: Tarjeta) => (
            <option key={tarjeta.id} value={tarjeta.id}>
              {tarjeta.nombre} - {tarjeta.numeroTarjeta}
            </option>
          ))}
        </Select>
      </AbsoluteCenter>
      
    </Center>
  );
}
