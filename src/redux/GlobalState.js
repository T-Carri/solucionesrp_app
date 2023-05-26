import {TYPES} from './Types'


export const GlobalState= (state, action)=>{
    switch (action.type){
        case TYPES.ERROR_ERROR:
            return{
                ...state, 
                thereerror: action.payload
            }
        
         case TYPES.LOGIN:
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true
            }

         case TYPES.LOGOUT:
            return{
                ...state, 
                isAuthenticated: false
            }   
            case TYPES.CLIENTES:
                return{
                    ...state, 
                    clientes: action.payload
                }

            default: 
            return state; 
    }
}