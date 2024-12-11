import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import './Navbar.css'
import { CgMenuGridO } from "react-icons/cg";
import { useLocation } from 'react-router-dom';

function Navbar({curr,setCurr,query,setQuery}) {
    const [val,setVal] = useState("");
    const location = useLocation();

    function handleChange(e){
        setVal(e.target.value)
        setQuery(e.target.value)
    }
    function handleBtnSubmit(e){
        e.preventDefault();
    }

    const isDetailsPage = location.pathname.startsWith('/crypto');
    
  return (
    <div className='navbar'>
        <h2>Crypt-Chart</h2>
        {
            !isDetailsPage &&(

            <form className="navform" action="" onSubmit={handleBtnSubmit}>
            <input type="text" value={query} placeholder='Search top 100 cryptos...' onChange={handleChange}/>
            <BsSearch onClick={handleBtnSubmit} style={{backgroundColor:"white",height:"0.7cm",width:"0.9cm",padding:"3px",borderRadius:"5px"}}/>
            </form>
            )



        }
        
        <select value = {curr} onChange={(e)=>setCurr(e.target.value)}>
            <option value="usd" >USD</option>
            <option value="eur" >EUR</option>
            <option value="inr" >INR</option>
        </select>
        <CgMenuGridO className='menu'/>
    </div>
  )
}

export default Navbar