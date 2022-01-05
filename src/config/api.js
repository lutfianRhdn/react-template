import axios from "axios";
export const api =(url="http://localhost:8000/api")=>{
     const get =(path ='/',config={},token)=>{
          return new Promise((resolve,reject)=>{
               const config ={
                    headers:{
                         Authorization: `Bearer ${token}`
                    }
               }
               axios.get(url+path,config).then(response=>{
                    return resolve(response.data)
               }).catch(error=>{
                    return reject(error.response)
               });
          }) 
     }
     const post =(path='/',data={},config={},token)=>{
          return new Promise((resolve,error)=>{
               const config ={
                    headers:{
                         Authorization: `Bearer ${token}`
                    }
               }
               
                axios.post(url+path,data,config).then(res=>{
                    return resolve(res.data)
               })
               .catch((err)=>{
                    return error(err.response.data)
               })
          })
     }
     const put =(path='/',data={},config={},token)=>{
          return new Promise((resolve,error)=>{
               const config ={
                    headers:{
                         Authorization: `Bearer ${token}`
                    }
               }
                axios.put(url+path,data,config).then(res=>{
                    return resolve(res.data)
               }).catch(err=>{
                    return error(err.response)
               })
          })
     }
     const remove =(path='/',config={},token)=>{
          return new Promise((resolve,error)=>{
               const config ={
                    headers:{
                         Authorization: `Bearer ${token}`
                    }
               } 
               axios.delete(url+path,config).then(res=>{
                    return resolve(res.data)
               }).catch(err=>{
                    return error(err.response)
               })
          })
     }
     return {get,post,put,remove}
}