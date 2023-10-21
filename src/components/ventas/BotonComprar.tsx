import {useState} from 'react';
import {
  Button, 
  WrapItem,
  Center,
  AbsoluteCenter
} from '@chakra-ui/react'

type CalcularPrecio = {
    productos: number[];
    tarjeta: number;
}

export default function BotonComprar({ productos, tarjeta }: CalcularPrecio) {
    const [errors, setErrors] = useState<string>();
    const [venta, setVenta] = useState<string>();

    const body = {
      idCliente: 1,
      productos: productos,
      idTarjeta: tarjeta
    }
    
    const realizarCompra = async () => {
      setErrors("")
      setVenta("")

      if(tarjeta == undefined) {
        tarjeta = 0;
      }
      
      try {
          const res = await fetch(`http://localhost:8080/venta?idCliente=1&idTarjeta=${tarjeta}`, {
            method: 'POST',
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(body),
            }
          );

          if (res.ok) {
            const data = await res.text();
            setVenta(data);
          
          } else {
            const errorMessage = await res.json();
            setErrors(errorMessage.error);
          }

        } catch (error: any) {
          console.log(error)
        }
    }
  
    return (
      <Center position='relative' h='100px'>
        <AbsoluteCenter p='4' color='white' axis='both'>
          <WrapItem>
          <Button colorScheme='teal' onClick={realizarCompra}>Comprar</Button>
          {errors && <span style={{ color: 'red' }}>Error: {errors}</span>}
          {venta && <span style={{ color: 'green' }}>{venta}</span>}
          </WrapItem>
        </AbsoluteCenter>
      </Center>
  );
}

