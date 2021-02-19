import React, { useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import { Link } from 'react-router-dom'
import Axios from 'axios'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt,faClipboard,faSignOutAlt,faMap} from '@fortawesome/free-solid-svg-icons'




function Header() {
    const state=useContext(GlobalState)

    const [isLogged]=state.userAPI.isLogged
   
    const [userid]=state.userAPI.userid

    const logoutUser = async()=>{
        await Axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href=("/");
    }

    const loggedRouter=()=>{
        return(
            <>
                <li className="nav-item active"><Link className="nav-link" to={`/mypost/${userid}`}><i><FontAwesomeIcon icon={faMap} /></i> Edit or Create New Posts</Link></li>
                <li className="nav-item active"><Link className="nav-link" to="/" onClick={logoutUser}><i><FontAwesomeIcon icon={faSignOutAlt} /></i> Logout</Link></li>
            </>
        )
    }

    return (

 
<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  
  <Link className="navbar-brand" to="/">Blog<i className="fab fa-autoprefixer"></i>nto</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">   
      {isLogged ? loggedRouter(): 
      (
          <React.Fragment>
               <li className="nav-item active"><Link className="nav-link" to="/login"><i><FontAwesomeIcon icon={ faSignInAlt} /></i> Login</Link></li>
               <li className="nav-item active"><Link className="nav-link" to="/Register"><i><FontAwesomeIcon icon={faClipboard} /></i> Register</Link></li>
          </React.Fragment>
        )
      }    
    </ul>
  </div>
</nav>
    )
}

export default Header
