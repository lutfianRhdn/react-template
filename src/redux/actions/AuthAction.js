import { api } from '../../config/api'
import { actionType } from '../constants/action-types'

export const LoginAction = (data) =>(dispatch)=>{
     return new Promise((resolve, reject)=>{
          return api().post('/login',{
               email:data.email,
               password:data.password
          }).then(res=>{
               const payload ={
                    name:res.data.name,
                    email:res.data.email,
                    token:res.meta.token
               }
               console.log(res)
               dispatch({type:actionType.SET_USER,payload:payload})
               resolve(payload)
          }).catch(err=>{
                    reject(err)
          })
     })
    
}
export const RegisterAction =(data)=>(dispatch)=>{
     return new Promise((resolve, reject)=>{
          return api().post('/register',{
               name:data.name,
               email:data.email,
               password:data.password
          }).then(res=>{
               const payload ={
                    name:data.name,
                    email:data.email,
                    token:res.data.token
               }
               console.log(res)
               dispatch({type:actionType.SET_USER,payload:payload})
               resolve(payload)
          }).catch(err=>{
               console.log('errs',err)
                    reject(err)
          })
     })
}
export const logoutAction = (data) =>(dispatch)=>{
     return new Promise((resolve, reject)=>{
          api().post('/logout',{},{headers:{Authorization:`Bearer ${data.token}`}}).then(res=>{
               resolve(res)
               dispatch({type:actionType.SET_USER,payload:{}})
          }).catch(err=>reject(err))
     })
}