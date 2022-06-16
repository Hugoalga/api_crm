import styles from '../styles/formulario.css';
import {Formik, Form, Field} from 'formik';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';

const Formulario = ({datosCliente}) => {

    const navigate = useNavigate();

    //funcion de validación para el formulario - - - - - - - - - - - - -- - - - - - - - - - - - 
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(4,'El nombre es muy corto')
                   .max(20,'El nombre es muy largo')
                   .required('Ingresa un nombre'),
        empresa:Yup.string().required('Ingresa un nombre de empresa'),
        correo:Yup.string()
        .email('Email no valido')
        .required('Ingresa un correo valido'),
        telefono:Yup.number()
        .min(10,'El número es muy corto')
        .positive('formato de número no válido')
        .typeError('El número no es valido')
        .integer('Númro no válido')
        .required('Ingresa un teléfono valido'),
        notas:Yup.string().required('Ingresa información'),
    });



    //funcion de enviar - - - - - - - - - - - - -- - - - - - - - - - - - 
    const handleSubmit =  async (data) => {
       try {
           //revisar si el cliente que estamos recibiendo tiene un id - - - - - - - - 
           if(datosCliente.id){
               //editando un registro
            const url = `http://localhost:4000/clientes/${datosCliente.id}`
            const respuesta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                const resultado = await respuesta.json();
                console.log(resultado);
                
                //redirecionamiento despues de enviar el form
                navigate('/clientes');
           }else{
               //si el cliente no tiene id lo agregamos a la base de datos - - - - - - - 
            const url = 'http://localhost:4000/clientes'
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const resultado = await respuesta.json();
            console.log(resultado);
            
            //redirecionamiento despues de enviar el form
            navigate('/clientes');
           }
       } catch (error) {
            console.log(error);
       }
    }



  return (
        <div className="formulario__form">
            {/* <h3 className="formulario__titulo">Agregar cliente</h3> */}


        <Formik
            initialValues={{
                nombre: datosCliente?.nombre ?? '',
                empresa:datosCliente?.empresa ?? '',
                correo:datosCliente?.correo ?? '',
                telefono:datosCliente?.telefono ?? '',
                notas:datosCliente?.notas ?? '',
            }}
            //habilitar la conxion a la bd - - - - - - - - - - - - 
            enableReinitialize={true}

            //funcion de enviar - - - - - - - - - - - - - - - 
            onSubmit={ async (values, {resetForm}) => {
                await handleSubmit(values);
                resetForm();
            }}
            //parametros para validación - - - - - - - - - - - - - - 
            validationSchema={nuevoClienteSchema}
        >
            {({errors, touched}) => {
                
                // console.log(errors);
                return(

                <Form>
                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="nombre">Nombre</label>
                        <Field name="nombre" id="nombre" type="text" className="formulario__input"   placeholder="Nombre del cliente"/>
                        {errors.nombre && touched.nombre ? (
                                <p className="formulario__error">{errors.nombre}</p>
                            ) : null }
                    </div>
                    

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="empresa">Empresa</label>
                        <Field name="empresa" id="empresa" type="text" className="formulario__input" placeholder="Nombre de la empresa"/>
                        {errors.empresa && touched.empresa ? (
                                <p className="formulario__error">{errors.empresa}</p>
                            ) : null }
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="correo">Correo</label>
                        <Field  name="correo" id="correo" type="email" className="formulario__input" placeholder="Ingresa un correo"/>
                        {errors.correo && touched.correo ? (
                                <p className="formulario__error">{errors.correo}</p>
                            ) : null }
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="telefono">Teléfono</label>
                        <Field name="telefono" id="telefono" type="phone" className="formulario__input" placeholder="Ingresa un Teléfono"/>
                        {errors.telefono && touched.telefono ? (
                                <p className="formulario__error">{errors.telefono}</p>
                            ) : null }
                    </div>

                    <div className="formulario__grupo">
                        <label className="formulario__label" htmlFor="notas">Notas</label>
                        <Field  as="textarea" name="notas" id="notas" type="text" className="formulario__input" placeholder="Notas"/>
                        {errors.notas && touched.notas ? (
                                <p className="formulario__error">{errors.notas}</p>
                            ) : null }
                    </div>

                    <input className="formulario__btn" type="submit" value={datosCliente.id ? 'Editar Cliente' : 'Agregar Cliente'} />
                </Form>
            )}}
        </Formik>
        </div>

  )
}

Formulario.defaultProps = {
    datosCliente:{}
}

export default Formulario