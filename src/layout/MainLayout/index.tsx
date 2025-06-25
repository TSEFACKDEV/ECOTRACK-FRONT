
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <>
       <Header/> 
       <main className='min-h-screen  '>
        <Outlet />
       </main>
       <Footer/> 
    </>
  )
}

export default MainLayout 