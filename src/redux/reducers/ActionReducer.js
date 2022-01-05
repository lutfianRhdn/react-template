import { actionType } from '../constants/action-types'

const initialState = {
     message:{},
     isLoading:false
}

export  function ActionReducer(state=initialState,{type,payload}) {
  switch(type){
     case actionType.SET_MESSAGE:
          state.message=payload
          return {
               ...state
          }
     case actionType.SET_LOADING:
          state.isLoading = payload
          return {
               ...state
          }
     default:
          return {...state}
  }
}
