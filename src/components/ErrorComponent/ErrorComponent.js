import './ErrorComponent.css'
import { Link } from 'react-router-dom'

function ErrorComponent({ serverError, resetError }) {

    return (
        <div className="serverError">
            <img className='error-image' src='https://www.lynnmumbingmejia.com/wp-content/uploads/2022/10/minion-example.png' /> <br />
            <Link to={'/'} onClick={() => {resetError()}} style={{color: `inherit`, textDecoration: `inherit`}}>
                <p>"Uh oh! {serverError.message} <br/> Please CLICK HERE to return home"</p>
            </Link>
        </div>
    )
}

export default ErrorComponent