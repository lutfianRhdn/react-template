import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {NavLink} from 'react-router-dom'
export default function SidebarList({icon,title,to}) {
     return (
          <>
               <NavLink to={to} activeStyle={{backgroundColor:'#264653'}} activeClassName="shadow text-white rounded-lg" className="w-full  py-2.5 px-5 flex items-center rounded-xl my-0.5" >
                         <FontAwesomeIcon icon={icon}/>
                         <h1 className=" mx-2.5 text-lg" >{title}</h1>
               </NavLink>
          </>
     )
}
