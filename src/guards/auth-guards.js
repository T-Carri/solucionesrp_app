import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import GeneralContext from '@/contexts/GeneralContext';
 import { useAuth } from '@/hooks/use-auth';
//aqui un analisis porque estas metiendo firebase
//import { user } from 'src/contexts/auth-context';
import AuthContext from '@/contexts/AuthContext';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const auth = useAuth()

  const { state}= useContext(GeneralContext)



//aqui el punto de interseccion para el resolve



//const { isAuthenticated } = useAuthContext();

//const isAuthenticated = false;

  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.
    
  //console.log(auth.user)
  
  
   useEffect(
    () => { 
       if (!router.isReady) {
        return;
      } 

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;
//aqui un analisis porque estas metiendo firebase
console.log('guard dice:', window.sessionStorage.getItem('authenticated') === 'false' )
      if (!auth.user) {
        console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
     
        setChecked(true);
      }
    },
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};


