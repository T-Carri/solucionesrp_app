import { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { GlobalState } from '../redux/GlobalState';
import PropTypes from 'prop-types';
import { db } from '@/config/firebase';
import { setDoc, doc, addDoc, collection, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import {TYPES} from '../redux/Types'
const GeneralContext = createContext();
export default GeneralContext




export const GeneralProvider = ({children})=>{

  const  initialState={
       
      clientes:''
    }

    
const [state, dispatch] = useReducer(GlobalState, initialState);

//AGREGANDO UN CLIENTE AL DIRECTORIO
/* 
const agregaCliente = async ( datos) => {
  await  addDoc(collection(db, "clientes"),datos);
  }
 */
 const agregaCliente = async ( datos, id) => {
    await  setDoc(doc(db, "clientes", id),datos);
    }






//GET LOS CLIENTES

  const getTotalClientes =async()=>{
  
    const q = query(collection(db, "clientes") )
    await onSnapshot(q, (query)=>{
    const data=[]
    query.forEach((doc)=>{
    data.push(doc.data() )
  
                 })
                
     dispatch({type:TYPES.CLIENTES, payload: data }) 
    })} 


//EDITA CLIENTE? 
  const editaCliente = async(id, campo, valor)=>{
    const AP = doc(db, "asignaciones", `${id}`)

    await updateDoc(AP, {
      [campo]: valor,
  
    
    })
  }

  //ELIMINA CLIENTE 
   

const eliminaCliente = async (id)=>{
  const d= doc(db, "clientes", id)
  await deleteDoc(d)
}





//CUENTAS

const agregaCuenta = async (datos, id) => {
  await  setDoc(doc(db, "cuentas", id),datos);
  }





  


return(
<GeneralContext.Provider value={{
  state, 
  dispatch, 
  agregaCliente, 
  getTotalClientes, 
  eliminaCliente, 
  agregaCuenta}}>
{children}
</GeneralContext.Provider>

)



}

/* 
GeneralProvider.propTypes = {
  children: PropTypes.node
}; */
export const GeneralConsumer = GeneralContext.Consumer;






