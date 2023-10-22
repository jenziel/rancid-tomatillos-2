import "./MovieCard.css";
import PropTypes from 'prop-types';

function MovieCard({ poster_path, title, id }) {
  return (
    <div className='card'>
        <img
          src={poster_path}
          className='movie-poster'
          alt={`Movie poster for ${title}`}
          key={id}
          id={id}
        />
    </div>
  );
}

export default MovieCard;

MovieCard.propTypes = {
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};