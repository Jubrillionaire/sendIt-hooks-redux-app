import React, {useState} from 'react'
import Logo from '../images/parcel.png'
import {NavLink, Link} from 'react-router-dom'
const token = localStorage.getItem("token")
const role = localStorage.getItem("role")


const NavBar = (props) =>  {
   
const [isOpen, setIsOpen] = useState(false)

const handleToggle = () => {
    setIsOpen(!isOpen)
 }

 const handleLogout = () => {
     localStorage.removeItem("token")
     window.location ="/"
 }
    return (
        <div>
        <nav className= "navbar navbar-expand-lg">
<div className="container">
<Link to="/" className="navbar-brand text-white senditLogoc" href="#"  >
    <img src={Logo}  className="logo" alt="logo" onClick={handleToggle}  />
    <span>SENDit</span>
</Link>
    {!token && (<ul className="navbar-nav">
  <li> <NavLink to="/" className="nav-item nav-link text-white" >Home</NavLink></li>
  <li> <NavLink to="/register" className="nav-item nav-link text-white">Register</NavLink></li>
  <li> <NavLink to="/login" className="nav-item nav-link text-white" >Login</NavLink></li>
  </ul>)}
    
 {(token)  && (
    <ul className="navbar-nav">
    <li> <NavLink to="#" className="nav-item nav-link text-white" >{props.firstName} </NavLink></li>
     <li> <NavLink to="/user" className="nav-item nav-link text-white" >DashBoard</NavLink></li>
  <li> <NavLink to="/create-order" className="nav-item nav-link text-white" >Create Order</NavLink></li>
  <li> <NavLink to="/" className="nav-item nav-link text-white" onClick ={handleLogout} >Logout</NavLink></li>
  </ul>)}

{(token && role === "admin") && ( <ul className="navbar-nav">
    <li> <NavLink to="#" className="nav-item nav-link text-white" >{props.firstName} </NavLink></li>
   <li> <NavLink to="/parcels" className="nav-item nav-link text-white" >All-orders</NavLink></li>
   <li> <NavLink to="/" className="nav-item nav-link text-white" onClick ={handleLogout} >Logout</NavLink></li>
  </ul>) }

</div>
</nav>
        </div>
    )
}

export default NavBar
