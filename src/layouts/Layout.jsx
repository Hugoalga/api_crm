import{Outlet, Link, useLocation} from 'react-router-dom';
import styles from '../styles/layout.css'

const Layout = () => {

  const location = useLocation();
  const urlActual = location.pathname;

  console.log(urlActual);

  
  return (
    <div className="layout__contenedor">
      <div className="layout__barraLateral">
        <h1 className="barraLateral__titulo">CRM - <span className="titulo__span">Clientes</span> </h1>
        
        <nav className="barraLateral__menu">
          <Link className={`${urlActual === '/clientes' ? 'link__activo' : ''} `} to="/clientes">Clientes</Link>
          <Link className={`${urlActual === '/clientes/nuevo' ? 'link__activo' : ''} `} to="/clientes/nuevo">Nuevo Cliente</Link>
        </nav>
      </div>


      <div className="layaout__contenido">
        <Outlet className="contenido_lateral"/>
      </div>

      

    </div>
  )
}

export default Layout




