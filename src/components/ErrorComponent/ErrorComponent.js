import './ErrorComponent.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

function ErrorComponent({ serverError, resetError }) {

    return (
        <div className="serverError">
            <img className='error-image' src='https://www.lynnmumbingmejia.com/wp-content/uploads/2022/10/minion-example.png' /> 
            <p>Uh oh! {serverError.message}</p> 
            <Link to={'/'} onClick={() => {resetError()}} style={{color: `inherit`, textDecoration: `inherit`}}>
                <button>Return to Home</button>
            </Link>
        </div>
    )
}

export default ErrorComponent;

ErrorComponent.propTypes = {
    serverError: PropTypes.shape({
        hasError: PropTypes.bool.isRequired,
        message:  PropTypes.string.isRequired,
    }),
    resetError: PropTypes.func.isRequired,
  };