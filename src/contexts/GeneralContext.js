import { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { GlobalState } from '../redux/GlobalState';
import PropTypes from 'prop-types';
import { db } from '@/config/firebase';
import { setDoc, doc, addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import {TYPES} from '../redux/Types'
const GeneralContext = createContext();
export default GeneralContext




export const GeneralProvider = ({children})=>{

  const  initialState={
       
      clientes:''
    }

    
const [state, dispatch] = useReducer(GlobalState, initialState);

const agregaCliente = async ( datos) => {
  await  addDoc(collection(db, "clientes"),datos);
  }

  const getTotalClientes =async()=>{
  
    const q = query(collection(db, "clientes") )
    await onSnapshot(q, (query)=>{
    const data=[]
    query.forEach((doc)=>{
    data.push(doc.data() )
  
                 })
                
     dispatch({type:TYPES.CLIENTES, payload: data }) 
    })} 



  const editaCliente = async(id, campo, valor)=>{
    const AP = doc(db, "asignaciones", `${id}`)

    await updateDoc(AP, {
      [campo]: valor,
  
    
    })
  }


  


return(
<GeneralContext.Provider value={{state, dispatch, agregaCliente, getTotalClientes}}>
{children}
</GeneralContext.Provider>

)



}

/* 
GeneralProvider.propTypes = {
  children: PropTypes.node
}; */
export const GeneralConsumer = GeneralContext.Consumer;






