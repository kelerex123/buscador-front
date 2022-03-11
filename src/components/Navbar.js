import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
              <Link to='/' className="navbar-brand">Admin</Link>
              
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                      <NavLink className={ ({isActive}) => 'nav-link' + (isActive ? ' active' : '') } to='/tabla'>Tabla</NavLink>
                      <NavLink className={ ({isActive}) => 'nav-link' + (isActive ? ' active' : '') } to='/anadir'>Añadir</NavLink>
                  </div>
              </div>
          </div>
      </nav>
    )
}
