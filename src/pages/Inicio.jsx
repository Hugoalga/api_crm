import { useState ,useEffect } from "react"
import ClienteListado from "../components/ClienteListado";
import styles from "../styles/inicio.css";


const Inicio = () => {


  //estado inicial para guardar los clientes - - - - - - --  
  const [listaClientes, SetListaClientes] = useState([]);


  //funcion para obtener losregistros en la base de datos - - - - - - - 
  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = 'http://localhost:4000/clientes';
        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        SetListaClientes(resultado);

      } catch (error) {
        console.log(error);
      }
    }
    obtenerClientesApi();
  },[]);

  //funcion para eliminar un registro - - - - - - - - - - - - 
  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Desear eliminar el cliente?');

    if(confirmar){
      try {
        const url = `  http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })

        await respuesta.json();
        const nuevosCliente =   listaClientes.filter((cliente) => cliente.id !== id);
        SetListaClientes(nuevosCliente);
      } 
      
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="contenedor__inicio">
     <h1 className="contenedor__inicio__titulo">Listado de clientes</h1>



     <table className="inicio__tabla">
        {/* cabecera de la tabla */}
       <thead>
         <tr className="inicio__tabla__head">
           <th className="inicio__tabla__titulo">Nombre</th>
           <th className="inicio__tabla__titulo">Empresa</th>
           <th className="inicio__tabla__titulo">Contacto</th>
           <th className="inicio__tabla__titulo">Acciones</th>

         </tr>
       </thead>

        {/* Cuerpo de la tabla */}
       <tbody className="inicio__tabla__cuerpo">
       {
        listaClientes.map((cliente) => (
          <ClienteListado
            key={cliente.id}
            cliente={cliente}
            handleEliminar={handleEliminar}
          />
        ))
      }
       </tbody>
     </table>
    </div>
  )
}

export default Inicio