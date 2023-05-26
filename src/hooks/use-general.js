import { useContext } from 'react';
import GeneralContext from '@/contexts/GeneralContext';

export const useGeneral = () => useContext(GeneralContext)
