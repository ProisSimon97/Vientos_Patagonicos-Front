import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useParams, useNavigate } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  Select, 
  Card, 
  CardBody, 
  CardFooter,
  Divider,
  Button,
  ButtonGroup,
  Center,
  Flex
} from '@chakra-ui/react'
import { Categoria } from '../../domain/Categoria'

type Inputs = {
  id: number
  codigo: string
  descripcion: string
  precio: number
  marca: string
  categoria: number 
  version: number
}

export default function ModificarProductoForm() {
  
  const { id } = useParams()
  const [errores, setErrores] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async datos => {
    try {
      console.log(datos)
      const res = 
        await fetch(`http://localhost:8080/producto`, {
          method: 'PUT', 
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(datos),
        }
      );

      if (res.ok) {
        const data = await res.text();
        setSuccess(data)
      } else {
        const error = await res.text();
        setErrores(error);
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  const getProducto = async function fetchData() {
    try {
      const res = await fetch(`http://localhost:8080/producto/${id}`);

      if (res.ok) {
        const data = await res.json();
        reset(data)
      } else {
        const error = await res.json();
        setErrores(error);
        return;
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  const getCategorias = async function fetchCategorias() {
    try {
      const res = await fetch(`http://localhost:8080/categoria`);

      if (res.ok) {
        const data = await res.json();
        setCategorias(data)
      } 

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  const goBack = () => {
    navigate('/comprar')
  }

  useEffect(() => {
    getProducto();
    getCategorias();
  }, []);
  
  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"} mt="250px">
      <Center position='absolute' h='100px'>
        <Card maxW='sm' boxShadow='dark-lg' p='6' rounded='md'>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl >
                <Controller
                  name="id" 
                  control={control}
                  render={({ field }) => (
                    <Input {...field} hidden/>
                  )}
                />

                <Controller
                  name="codigo" 
                  control={control}
                  render={({ field }) => (
                    <Input {...field} hidden/>
                  )}
                />

                <FormLabel>Nombre: </FormLabel>
                <Controller
                  name="descripcion" 
                  control={control}
                  render={({ field }) => (
                    <Input {...field}/>
                  )}
                />
              
                <div>
                  <FormLabel>Precio: </FormLabel>
                  <Controller
                    name="precio" 
                    control={control}
                    render={({ field }) => (
                    <Input {...field}/>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Categoria: </FormLabel>
                  <Select {...register("categoria")}>
                    {categorias.map((categoria: Categoria) => (
                      <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
                    ))}
                  </Select>
                </div>

                <Controller
                  name="version" 
                  control={control}
                  render={({ field }) => (
                    <Input {...field} hidden/>
                  )}
                />

                <div>
                <FormLabel>Marca: </FormLabel>
                <Controller
                    name="marca" 
                    control={control}
                    render={({ field }) => (
                    <Input {...field}/>
                    )}
                  />
                </div>

                <Divider />

                <CardFooter>
                  <ButtonGroup spacing='10'>
                    <Button colorScheme='teal' type='submit'>
                      Enviar
                    </Button>
                
                    <Button onClick={goBack} variant='ghost' colorScheme='blue'>
                      Cancelar
                    </Button>
                  </ButtonGroup>
                  {errores && <span style={{ color: 'red' }}>Errores: {errores}</span>}
                  {success && <span style={{ color: 'green' }}>{success}</span>}
                </CardFooter>
              </FormControl>
            </form>
          </CardBody>
      </Card>
    </Center>
  </Flex>
  )
}