//second version 
import '@/styles/globals.css'
//import { AuthConsumer, AuthProvider } from '@components/src/contexts/auth-context';
//import { AuthConsumer, AuthProvider } from '@/context/AuthContext';
import { AuthConsumer, AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { GeneralProvider, GeneralConsumer } from '@/contexts/GeneralContext';

export default function App({ Component, pageProps }) {
 
  const getLayout = Component.getLayout ?? ((page) => page);
  
 
 
  return(

   <GeneralProvider> 
   {/* <GeneralConsumer> */}
  <AuthProvider>
  <CssBaseline />
  {/* <AuthConsumer> */}

   {
     getLayout(<Component {...pageProps} />)
    } 


    {/* </AuthConsumer> */}
    </AuthProvider>
   {/* /GeneralConsumer> */}
       </GeneralProvider> 
  ) 
              
}
