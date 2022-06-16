import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styles from '../styles/verCliente.css';

const VerCliente = () => {

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
                
            } catch (error) {
                console.log(error);
            }

        }

        obtenerClienteAPI();

    },[])

   

  return (
    <div className="verCte__contenedor">
        <h2 className="verCte__titulo">Información del cliente: <span className="verCte__subtitulo">{datosCliente.nombre}</span></h2>
        <p className="verCte__info">Cliente: <span className="verCte__info__span">{datosCliente.nombre}</span></p>
        <p className="verCte__info">Empresa: <span className="verCte__info__span">{datosCliente.empresa}</span></p>
        <p className="verCte__info">Correo: <span className="verCte__info__span">{datosCliente.correo}</span></p>
        <p className="verCte__info">Teléfono: <span className="verCte__info__span">{datosCliente.telefono}</span></p>
        <p className="verCte__info">Notas: <span className="verCte__info__span">{datosCliente.notas}</span></p>

    </div>
  )
}

export default VerCliente





