import './Header.css'
import { Link } from "react-router-dom";

function Header( { resetError } ) {

    return (
        <header className='rancid-title'>
         <Link to={`/`} style={{color: `inherit`, textDecoration: `inherit`}} onClick={() => {resetError()}} >
            <h1 className='header-text'>RANCID TOMATILLOS 🍅</h1>
         </Link>
        </header>
    )
}

export default Header