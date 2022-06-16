import Formulario from '../components/Formulario';
import styles from '../styles/nuevoCliente.css'

const NuevoCliente = () => {
  return (
    <>
    <h1 className="nvoCliente__titulo">Agregar un nuevo cliente</h1>
    <p className="nvoCliente__subtitulo">Llena todos los campos</p>
    <div className="formulario__contenedor">
      <Formulario/>
    </div>
    </>
  )
}

export default NuevoCliente;


