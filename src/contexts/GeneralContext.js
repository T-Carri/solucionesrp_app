import { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { GlobalState } from '../redux/GlobalState';
import PropTypes from 'prop-types';


const GeneralContext = createContext();
export default GeneralContext




export const GeneralProvider = ({children})=>{

  const  initialState={
      thereerror:'',
      user: '',
      isAuthenticated: false
    }

    
const [state, dispatch] = useReducer(GlobalState, initialState);




return(
<GeneralContext.Provider value={{state, dispatch}}>
{children}
</GeneralContext.Provider>

)



}

/* 
GeneralProvider.propTypes = {
  children: PropTypes.node
}; */
export const GeneralConsumer = GeneralContext.Consumer;






