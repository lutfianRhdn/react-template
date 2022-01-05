import React, { useRef,useState } from 'react'
import { connect } from 'react-redux'
import InputLabel from '../../containers/InputLabel'
import AdminLayout from '../../layouts/adminLayout'
import {create} from '../../redux/actions/UserAction'
import Button from '../../containers/Button'

export const Create = (props) => {
     const nameRef = useRef();
     const emailRef = useRef();
     const passwordRef = useRef();
     const confirmRef = useRef();
     const [errors,setErrors] = useState([]);
     const handleSubmit =(event)=>{
          event.preventDefault();
          let data = {
               name:nameRef.current.value,
               email:emailRef.current.value,
               password:passwordRef.current.value,
               confirmPassword:confirmRef.current.value
          }
          props.createUser(data,props.auth.user.token).then(result => {
               props.history.push('/user')
          }).catch(err => {
               setErrors(err.errors)
          })
     }
     return (
          <div>
               <AdminLayout header="Create a new user">
                    <div className=" flex item-center justify-center w-full">
                         <div className="w-3/4 ">
                              <form onSubmit={handleSubmit}>

                                   <InputLabel label="Name" labelSize='normal' height="10" className="my-2" ref={nameRef} error={errors.name} />
                                   <InputLabel label="Email" labelSize='normal' height="10" className="my-2" ref={emailRef} error={errors.email}  />
                                   <div className="flex w-full px-10">
                                        <InputLabel label="Password" mx='0' width="full" labelSize='normal' height="10" className="my-2 mr-3 w-full" ref={passwordRef} type="password" error={errors.password} />
                                        <InputLabel label="ConfirmPassword" mx='0' width='full' labelSize='normal' height="10" className="my-2 ml-3 w-full" ref={confirmRef} type="password" />
                                   </div>
                                   <div className="flex justify-end mr-10 mt-5">
                                        <Button title="Create" type="submit" />
                                   </div>
                              </form>
                         </div>

                    </div>
               </AdminLayout>
          </div>
     )
}

const mapStateToProps = (state) => ({
     auth : state.auth
})

const mapDispatchToProps = (dispactch)=>({
     createUser: (data,token) => dispactch(create(data,token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
