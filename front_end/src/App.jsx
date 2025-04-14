import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'
//import { api } from './utilities'

function App() {
  const loadedUser = useLoaderData();
  const [user, setUser] = useState(loadedUser);
  const location = useLocation(); 
  const showNavbar = location.pathname !== '/';  // hide navbar on homepage

  useEffect(() => {
    console.log('<App/> state user ', user)
  }, [user])


  return (
    <>
      {showNavbar && <NavBar user={user} setUser={setUser}/>}
      <Outlet context={{ user, setUser }}/>
    </>
  )
}

export default App
