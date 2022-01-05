import React from 'react'
import Nav from '../containers/Nav'
import Sidebar from '../containers/Sidebar'
import Card from '../containers/Card'
export default function adminLayout({header,children}) {
     return (
          <div className=" flex" style={{backgroundColor:'#EEEEEE'}}>
               <div>
                    <Sidebar />
               </div>
               <div className="w-full mx-10 my-5">
                    <Nav />
                    <div className=" my-10">
                         <Card  header={header}>
                              {children}
                         </Card>
                    </div>
               </div>
          </div>
     )
}
