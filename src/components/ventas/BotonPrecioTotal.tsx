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

export default function BotonPrecioTotal({ productos, tarjeta }: CalcularPrecio) {
    const [errors, setErrors] = useState<string>();
    const [total, setTotal] = useState<string>();

    const precioTotal = async () => {
      setErrors("")

      if(tarjeta == undefined) {
        tarjeta = 0;
      }
  
      const productosUrl = productos.map((id) => `productos=${id}`).join('&');
      try {
          const res = await fetch(`http://localhost:8080/venta?${productosUrl}&idTarjeta=${tarjeta}`);

          if (res.ok) {
            const data = await res.text();
            setTotal(data);
          
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
            <Button colorScheme='teal' onClick={precioTotal}>Precio Total</Button>
            {errors && <span style={{ color: 'red' }}>Error: {errors}</span>}
            {total && <span style={{ color: 'green' }}>Total: {total}</span>}
          </WrapItem>
        </AbsoluteCenter>
      </Center>
  );
}

