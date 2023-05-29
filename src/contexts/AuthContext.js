import { createContext, useContext, useEffect, useState, useReducer, useRef } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import PropTypes from 'prop-types'
import GeneralContext from './GeneralContext'
import {TYPES} from '../redux/Types'

const AuthContext = createContext();
export default AuthContext





export const UserAuth = () => {
  return useContext(AuthContext);
};



export const AuthProvider = ({ children }) => {
  
  
  const { state, dispatch}= useContext(GeneralContext)
  
  const userRef = useRef(null)
  const keyRef = useRef(null)
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  let isAuthenticated = false;
  // const dispatch=useDispatch() ;
  //const firestore= getFirestore(app)
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
userRef.current=user

window.sessionStorage.setItem('authenticated', 'true');

dispatch({
  type: TYPES.LOGIN , payload: user
})



        } else {
          setUser(null)
          window.sessionStorage.setItem('authenticated', 'false');
          dispatch({
            type: TYPES.LOGOUT
          })
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


/*   const goahead =async ()=>{
  try {
    keyRef.current= sessionStorage.getItem('authenticated') === 'true';
    
    console.log(isAuthenticated)

  } catch (error) {
    console.log('goahead:', error)
  }  
  
  
  }

  useEffect(()=>{
    goahead()
  }, []) */

  console.log(user)

console.log('TEST:', keyRef.current)

//console.log(isAuthenticated)
 
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, keyRef }}>
      {loading?null:children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};


export const AuthConsumer = AuthContext.Consumer;

