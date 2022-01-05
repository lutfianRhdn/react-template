import { actionType } from '../constants/action-types'

const initialState = {
     user:{}
}
export  function AuthReducer(state = initialState,{type,payload}) {
     switch (type){
          case actionType.SET_USER:
               state.user=payload
                    return {
                         ...state,
                    }
          default:
               return {...state}
     }
}
