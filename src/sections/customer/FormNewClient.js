import { useRouter } from 'next/navigation';
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
import { useGeneral } from '@/hooks/use-general';
import { useState } from 'react';
import GeneralContext from '@/contexts/GeneralContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';

const currencies = [
  {
    value: null,
    label: '--',
  },
    {
      value: 'Factura mensual',
      label: 'Factura mensual',
    },
    {
      value: 'Factura por servicio',
      label: 'Factura por servicio',
    },
    {
      value: 'Factura por hora',
      label: 'Factura por hora',
    },
    {
      value: 'Poliza',
      label: 'Poliza',
    },
  ];



const AddNeWClient = (props) =>{
const [activaBackdrop, setActivaBackdrop] = useState(false)
const [succesful, setSuccesful]=useState(false)
const [error, setError]=useState(false) 
const [IdUsario, setIdUsuario]= useState(uuidv4())
const {setOpen}=props



  const general= useGeneral()




/*   useEffect(
    ()=>{
      setIdUsuario(uuidv4())
    }, []
  )
 */


  
const formik = useFormik({
    initialValues:{
        uid:IdUsario,
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




return(
    <>
    <form onSubmit={formik.handleSubmit} >
    <Stack spacing={3}>
    <Typography variant="h5">
                  + Agrega cliente
                </Typography>
    <TextField
                    error={!!(formik.touched.cliente && formik.errors.cliente)}
                    fullWidth
                    helperText={formik.touched.cliente && formik.errors.cliente}
                    label="Cliente"
                    name="cliente"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    
                    value={formik.values.cliente}
                  />
    <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />


<TextField
                    error={!!(formik.touched.direccion && formik.errors.direccion)}
                    fullWidth
                    helperText={formik.touched.direccion && formik.errors.direccion}
                    label="Dirección"
                    name="direccion"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    
                    value={formik.values.direccion}
                  />

<TextField
                    error={!!(formik.touched.telefono && formik.errors.telefono)}
                    fullWidth
                    helperText={formik.touched.telefono && formik.errors.telefono}
                    label="Telefono"
                    name="telefono"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    
                    value={formik.values.telefono}
                  />

<TextField   
                  
                  label="Selecciona tipo de factura"
                  name="tipoFactura"
                  onChange={formik.handleChange}
                  error={!!(formik.touched.tipoFactura && formik.errors.tipoFactura)}
                  fullWidth
                  helperText={formik.touched.tipoFactura && formik.errors.tipoFactura}
            
                  required
                  select
                  SelectProps={{ native: true }}
                   value={formik.values.tipoFactura} 
                >
                  {currencies.map((option) => (
                    <option
                      key={option.value}
                       value={option.value} 
                    >
                       {option.label} 
                    </option>
                  ))}
                </TextField>

<Button   fullWidth color="success" variant="contained" type='submit'> añadir </Button>
    </Stack>

    </form>

    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={activaBackdrop}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>

   {succesful&& <Alert severity="success">Agregado</Alert>}   
   {error&&<Alert severity="error">Hubo un error</Alert>}   
    </>
)
}


export default AddNeWClient;
