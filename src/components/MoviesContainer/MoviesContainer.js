import "./MoviesContainer.css";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function MoviesContainer({
  allMovies,
  showMovieDetails,
  showYoutubeVideo,
  selectedTrailerKey,
}) {
  const movieCards = allMovies.map((movie) => {
    return (
      <Link to={`/${movie.id}`} key={movie.id}>
        <MovieCard
          title={movie.title}
          poster_path={movie.poster_path}
          key={movie.id}
          id={movie.id}
          showMovieDetails={showMovieDetails}
          showYoutubeVideo={showYoutubeVideo}
          backdrop_path={movie.backdrop_path}
          selectedTrailerKey={selectedTrailerKey}
        />
      </Link>
    );
  });
  return (
    <div className='movies-container'>
      <div className='cards-container'>{movieCards}</div>
    </div>
  );
}

export default MoviesContainer;

MoviesContainer.propTypes = {
  allMovies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  showMovieDetails: PropTypes.func.isRequired,
  showYoutubeVideo: PropTypes.func.isRequired,
  selectedTrailerKey: PropTypes.string,
};