import "./MovieCard.css";

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