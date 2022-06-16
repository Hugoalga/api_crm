import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Formulario from '../components/Formulario';
import styles from '../styles/editarCliente.css';


const EditarCliente = () => {

      //estado para almacenar los datos de la api
      const [datosCliente,setDatosCliente] = useState({});

      const params = useParams();
  
      //consultar la api de nuestro bd - - - - - - 
      useEffect(() => {
          const obtenerClienteAPI = async () => {
              try {
                  const url = `  http://localhost:4000/clientes/${params.id}`;
                  const respuesta = await fetch(url);
                  const resultado = await respuesta.json();
  
                  setDatosCliente(resultado);
                  // console.log(datosCliente);
                  
              } catch (error) {
                  console.log(error);
              }
  
          }
          obtenerClienteAPI();
      },[])


  return (
    <div className="editarCte__contenedor">
      <h1 className="editarCte__titulo">Editar cliente</h1>
      <Formulario
        datosCliente={datosCliente}
      />
    </div>


  )
}

export default EditarCliente