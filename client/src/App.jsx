import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import BrewerySearch from './BrewerySearch'
import BreweryDetails from './BreweryDetails'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/brewerysearch' element={<BrewerySearch/>}></Route>
      <Route path='/brewery-details/:id' element={<BreweryDetails/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
