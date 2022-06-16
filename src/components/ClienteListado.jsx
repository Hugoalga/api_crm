import style from '../styles/clienteLsitado.css';
import { useNavigate } from 'react-router-dom';


const ClienteListado = ({cliente,handleEliminar}) => {
    const {nombre,empresa,correo,telefono,notas,id} = cliente;

    const navigate = useNavigate();
  
    return (
    <tr className="cte__contenedor">
        <td className="cliente__info">{nombre}</td>
        <td className="cliente__info">{empresa}</td>
        <td className="cliente__info">
            <p className="cliente__contacto">{telefono}</p>
            <p className="cliente__contacto">{correo}</p>
        </td>
       
        <td className="cliente__info">
            {/* funcion para ver los datos del cliente - - - - - - -  */}
            <button 
                className="cliente__btn btn__ver"
                onClick={() => navigate(`/clientes/${id}`)}
            >
                Ver</button>
                
            {/* funcion para ver los datos del cliente - - - - - - -  */}
            <button 
            className="cliente__btn btn__editar"
            onClick={() => navigate(`/clientes/editar/${id}`)}
            >
                Editar</button>

            <button 
                className="cliente__btn btn__eliminar"
                onClick={() => handleEliminar(id)}
            >
                Eliminar
            </button>
        </td>
    </tr>
  )
}

export default ClienteListado



