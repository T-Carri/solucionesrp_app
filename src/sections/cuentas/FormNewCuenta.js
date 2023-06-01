import React from 'react'
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    Box,
    Button,
    FormHelperText,
    Link,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
    MenuItem 
  } from '@mui/material';
  
import { v4 as uuidv4 } from 'uuid';


export const FormNewCuenta = (props) => {
    
    const [IdCuenta, setIdCuenta]= useState(uuidv4())

     
  
const formik = useFormik({
    initialValues:{
        uid:IdCuenta,
        cliente:'',
        email:'', 
        direccion: '',
        telefono: '',
        tipoFactura:''
       

    },

    validationSchema: Yup.object(
        {
    cliente: Yup
    .string()
    .max(255)
    .required('No dejes este campo vacio'),
     email: Yup
     .string()
     .email('Ingresa un correo valido')
     .max(255)
     .required('El correo es requerido'),

     direccion: Yup
     .string()
     .max(255)
     .required('Llena este campo'),

     telefono: Yup
        .string()
        .max(10)
        .required('Llena'), 

      tipoFactura: Yup 
      .string()
      .max(255)
      .required('Elige tipo de factura'),

        }
    ), 

    onSubmit: async(values, helpers) => {
        try {
          setActivaBackdrop(true)
         //Aqui vas a montar los valores en POST 
         await general.agregaCliente(values, IdUsario ).then(console.log('la  info es: ', values))
            
         setActivaBackdrop(false)
         setSuccesful(true)
         setOpen(false)
         setSuccesful(false)
        } catch (err) {
            helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        setError(true)
        }
    }

})







  return (
    <>
    
    
    
    </>
  )
}




/* 
planeacion

 darle vida al boton de agrega cuenta donde pregunte por 
  
 Servicio o empresa 

 descripcion

 link o imagen de empresa

 
 cuenta  y contrasena 

 boton de agregar otra cuenta








 TARJETA TERMINADA MOSTARA DATOS Y  BOTON DE VER DATOS  Y BOTON DE AGREGAR CUENTA
 */

