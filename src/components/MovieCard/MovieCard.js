import "./MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ poster_path, title, showMovieDetails, id, showYoutubeVideo }) {
  return (
    <div className='card' onClick={() => {
        showMovieDetails(id)
        showYoutubeVideo(id)
    }}>
      <Link to={`/movies/${id}`}>
        <img
          src={poster_path}
          className='movie-poster'
          alt={`Movie poster for ${title}`}
          key={id}
          id={id}
        />
      </Link>
    </div>
  );
}

export default MovieCard;
