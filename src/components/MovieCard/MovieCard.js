import './MovieCard.css'

function MovieCard({ poster_path, title, showMovieDetails, id, showYoutubeVideo }) {
    return (
        <div className='card' onClick={() => {
            showMovieDetails(id)
            showYoutubeVideo(id)
            }}>
            <img src={poster_path} className='movie-poster' alt={`Movie poster for ${title}`} />
        </div>
    )
}

export default MovieCard