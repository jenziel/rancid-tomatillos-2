import './MoviesContainer.css'
import MovieCard from '../MovieCard/MovieCard'

function MoviesContainer({ allMovies, showMovieDetails, showYoutubeVideo, selectedTrailerKey }) {
    const movieCards = allMovies.map(movie => {
        return (
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
        )
    })
    return (
        <div className='cards-container'>{movieCards}</div>
    )
}

export default MoviesContainer