import './MovieCard.css'

function MovieCard({ poster_path, title }) {

    return (
        <div className='card'>
            <img src={poster_path} className='movie-poster' alt={`Movie poster for ${title}`} />
        </div>
    )
}

export default MovieCard