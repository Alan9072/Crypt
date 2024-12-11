import React, { useState } from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import CryptoDetail from './pages/CryptoDetail/CryptoDetail.jsx'

function App() {
  const [curr,setCurr] = useState("usd")
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <Navbar curr={curr} query={searchQuery} setQuery={setSearchQuery} setCurr={setCurr}/>
      <Routes>
        <Route path='/' element={<Home curr = {curr} query = {searchQuery}/>}/>
        {/* <Route path='/crypto/:id' element={<CryptoDetail curr={curr}/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App