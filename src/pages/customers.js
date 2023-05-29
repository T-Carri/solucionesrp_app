import { useCallback, useEffect, useMemo, useState, useContext, useRef } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import Modalcomponent from '@/utils/modal';
import AddNeWClient from '@/sections/customer/FormNewClient';
import { useGeneral } from '@/hooks/use-general';
import GeneralContext from '@/contexts/GeneralContext';
import { setDoc, doc, addDoc, collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

const now = new Date();
//const general =useGeneral();



const useCustomers = ( hack, page, rowsPerPage) => {

  return useMemo(
    () => {
      return applyPagination(hack, page, rowsPerPage);
    },
    [hack, page, rowsPerPage]
  );
};

/* const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.cliente);
    },
    [customers]
  );
}; */

const Page = ({datos}) => {
  const general =useGeneral();
  const [hack, setHack]=useState(datos)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

useEffect(()=>{

  const unsubscribe = onSnapshot(collection(db, "clientes"), (querySnapshot) => {
    const updatedDatos = querySnapshot.docs.map((doc) => doc.data()); // Serializar los datos de los documentos actualizados
    setHack(updatedDatos); // Actualizar los datos en el estado
  });

  return () => unsubscribe();


},[])

 
  /* const customersIds = useCustomerIds(customers); */
/*   const customersSelection = useSelection(customersIds); */
const customers = useCustomers(hack, page, rowsPerPage);
//button agrega constants

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);


/* useEffect(()=>{
general.getTotalClientes()
}, []) */ 

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

console.log(datos)
 
  return (
    <>
      <Head>
        <title>
          Clientes | Soluciones RP
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Clientes
                </Typography>
               {/*  <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Agregar
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={hack.length}
              items={customers}
          /*     onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne} */
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
             /*  onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne} */
              page={page}
              rowsPerPage={rowsPerPage}
              /* selected={customersSelection.selected} */
            />
          </Stack>
        </Container>
        <Modalcomponent open={open} setOpen={setOpen} children={<AddNeWClient open={open} setOpen={setOpen} />}/> 
      </Box>
    
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export const getServerSideProps = async () => {

  const querySnapshot = await getDocs(collection(db, "clientes")); // Obtener instantánea de la colección

  const datos = querySnapshot.docs.map((doc) => doc.data()); // Serializar los datos de los documentos



  return { props : {datos}}

}
 


export default Page;
