//second version 
//import '@/styles/globals.css'
//import { AuthConsumer, AuthProvider } from '@components/src/contexts/auth-context';
//import { AuthConsumer, AuthProvider } from '@/context/AuthContext';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'simplebar-react/dist/simplebar.min.css';
import Head from 'next/head';
//useNProgress
import { useNProgress } from '@/hooks/use-nprogress';


//createTheme
import { createTheme } from '@/theme';

//createEmotionCache
import { createEmotionCache } from '@/utils/create-emotion-cache';

import { AuthConsumer, AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { GeneralProvider, GeneralConsumer } from '@/contexts/GeneralContext';




const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;



const App = (props)=>{

  const {Component, emotionCache= clientSideEmotionCache, pageProps} = props;

  useNProgress();


  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = createTheme();

return(
<CacheProvider value={emotionCache}>

<Head>
        <title>
          Soluciones RP
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>

      <LocalizationProvider dateAdapter={AdapterDateFns}>




      <GeneralProvider> 
  
  <AuthProvider>
  <ThemeProvider theme={theme}>
  <CssBaseline />
  

   {
     getLayout(<Component {...pageProps} />)
    } 


</ThemeProvider>
    </AuthProvider>
  
       </GeneralProvider> 




      </LocalizationProvider>



</CacheProvider>


)
}



export default App;






//old version
/* export default function App({ Component, pageProps }) {
 
  const getLayout = Component.getLayout ?? ((page) => page);
  
 
 
  return(

   <GeneralProvider> 
   
  <AuthProvider>
  <CssBaseline />
  

   {
     getLayout(<Component {...pageProps} />)
    } 


  
    </AuthProvider>
  
       </GeneralProvider> 
  ) 
              
}
 */