import './MovieCard.css'

function MovieCard({ poster_path, title, showMovieDetails, id }) {
    return (
        <div className='card' onClick={() => showMovieDetails(id)}>
            <img src={poster_path} className='movie-poster' alt={`Movie poster for ${title}`} />
        </div>
    )
}

export default MovieCard