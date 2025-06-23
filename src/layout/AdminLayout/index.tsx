import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <section>
        <SideBar/>
        <Header/>
        <main className='min-h-[80vh] '>
            <Outlet/>
        </main>
    </section>
  )
}

export default AdminLayout