import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { api } from '../../config/api'
import FlashMessage from '../../containers/FlashMessage'
import Table from '../../containers/Table'
import AdminLayout from'../../layouts/adminLayout'
import Button from '../../containers/Button'
import {actionType} from '../../redux/constants/action-types'
export const Index = (props) => {
     const [users,setUsers] = useState([])
     const [message,setMessage] = useState('')
     const [type,setType] = useState('')
     const load=() => {
          api().get('/user',{},props.auth.user.token).then(user =>{
               setUsers(user.data)
          }).catch(error =>{
               // setMessage()
               console.error(error)
          })
       
          console.log(props.message)
     }
     useEffect(() => {
          load()
          if (Object.keys(props.message).length > 0) {
               setMessage(props.message.message)
               setType(props.message.type)
          }
     }, [props.auth])
     const deleteAction = (user)=>{
          api().remove(`/user/${user.id}`,{},props.auth.user.token).then(res=>{
               setMessage('User had been removed')
               setType('success')
               props.setLoading()
               load()
          })
     }
     const updateAction =(user)=>{
          props.history.push(`/user/edit/${user.id}`)
     }
     const handleFlashClose =()=>{
          setMessage('');
          setType('');
     }
     return (
          <div>
               <AdminLayout header="User Management" >
               <FlashMessage message={message} type={type} onClose={handleFlashClose} />
                    <div className="flex justify-end">
                         <Button title="Create a new user" to='/user/create' className='bg-green-500 ' />
                    </div>
                    <Table 
                    headers={['no','name','email','role',"date"]}
                    data={users}
                    deleteAction={deleteAction}
                    updateAction={updateAction}
                    />
               </AdminLayout>
          </div>
     )
}

const mapStateToProps = (state) => ({
     auth: state.auth,
     message: state.action.message
})

const mapDispatchToProps =(dispatch) => ({
     setLoading: ()=>dispatch({type:actionType.SET_LOADING,payload:false})
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
