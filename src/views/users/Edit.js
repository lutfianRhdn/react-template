import React, { useEffect,useState,useRef,useMount } from 'react'
import { connect } from 'react-redux'
import { api } from '../../config/api'
import InputLabel from '../../containers/InputLabel'
import AdminLayout from '../../layouts/adminLayout'
import {update} from '../../redux/actions/UserAction'
import Button from '../../containers/Button'
import AsyncSelect from 'react-select/async';

export const Edit = (props) => {
     const [users,setUsers] = useState({})
     const nameRef = useRef();
     const emailRef = useRef();
     const [errors,setErrors] = useState([]);
     const [selectedValue, setSelectedValue] = useState({});

     const loadOptions = (roles)=>{
          return api().get('/role',{},props.auth.user.token).then(response=>response.data)
     }
     useEffect(()=>{
          api().get(`/user/${props.match.params.id}`,{},props.auth.user.token).then(user =>{
               setUsers(user.data)
          }).catch(error =>{
               console.error(error)
          })
      
        
     },[props.auth])

     const handleSubmit =(e) =>{
          e.preventDefault()
          const data = {
               id:props.match.params.id,
               name:nameRef.current.value,
               email:emailRef.current.value,
               role:selectedValue.name
          }
          props.update(data,props.auth.user.token)
          .then(response=>{
               props.history.push('/user')
          })
          .catch(error=>{
               setErrors(error.errors)
               console.log(error)
          })
     }

     return (
          <div>
               <AdminLayout header={`Update User  ${users.name} `}>
               <div className=" flex item-center justify-center w-full">
                         <div className="w-3/4 ">
                              <form onSubmit={handleSubmit}>
                                   <InputLabel label="Name" labelSize='normal' height="10" className="my-2" ref={nameRef} error={errors.name} defaultValue={users.name} />
                                   <InputLabel label="Email" labelSize='normal' height="10" className="my-2" ref={emailRef} error={errors.email} defaultValue={users.email}  />
                                   <div className="flex flex-col w-full px-10">
                                   <label className=""> Role</label>
                                    <AsyncSelect 
                                    className="w-full border-gray-600"
                                   cacheOptions
                                   defaultOptions
                                   loadOptions={loadOptions}
                                   value={selectedValue}
                                   getOptionLabel={e => e.name}
                                   getOptionValue={e => e.name}
                                   onChange={(val)=>setSelectedValue(val)}
                                   />
                                   <p class="small text-red-500 italic">{errors.role} </p>
                                   </div>
                                   <div className="flex justify-end mr-10 mt-5">
                                        <Button title="Update" type="submit" />
                                   </div>
                              </form>
                         </div>
                    </div>
               </AdminLayout>
          </div>
     )
}

const mapStateToProps = (state) => ({
     auth: state.auth,
     action: state.action
})

const mapDispatchToProps = (dispatch) => ({
     update:(data,token)=>dispatch(update(data,token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
