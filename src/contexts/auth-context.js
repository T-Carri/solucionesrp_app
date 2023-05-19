import { createContext, useContext, useEffect, useReducer, useRef, useState  } from 'react';

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../config/firebase'

import PropTypes from 'prop-types';


const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT'
  };
  

  const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
  };
  




  const handlers = {
    [HANDLERS.INITIALIZE]: (state, action) => {
      const user = action.payload;
  
      return {
        ...state,
        ...(
          // if payload (user) is provided, then is authenticated
          user
            ? ({
              isAuthenticated: true,
              isLoading: false,
              user
            })
            : ({
              isLoading: false
            })
        )
      };
    },
    [HANDLERS.SIGN_IN]: (state, action) => {
      const user = action.payload;
  
      return {
        ...state,
        isAuthenticated: true,
        user
      };
    },
    [HANDLERS.SIGN_OUT]: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
  };




  const reducer = (state, action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
  );
  


const AuthContext = createContext();
export default AuthContext

export const UserAuth = () => {
  return useContext(AuthContext);
};



export const AuthContextProvider = ({ children }) => {
//ojo en ejemplo usa un prop y luego destructura a children...
//parece ser que yo lo hago directo. En caso de error verificar
//verificar eso.

    const initialized = useRef(false);
    const [state, dispatch] = useReducer(reducer, initialState);


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  // const dispatch=useDispatch() ;

  //function to put at useEffect with reducer func
   
const initialize = async()=>{

    if (initialized.current){
        return;
    }

    initialized.current= true

    


}












  //const firestore= getFirestore(app)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {

          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: user.accessToken
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      })
    return () => unsubscribe();
  },[]);



  //version normal
  const signup  = (email, password) => {
    return  createUserWithEmailAndPassword(auth, email, password)
  };
   const login  = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }
  const logout = () => {
    setUser(null)
      return signOut(auth)
  }
  console.log(user)
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};