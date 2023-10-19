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
                    backdrop_path={movie.backdrop_path}
                    showYoutubeVideo={showYoutubeVideo}
                    selectedTrailerKey={selectedTrailerKey}
                />
        )
    })
    return (
        <div className='movies-container'>
            <div className='cards-container'>{movieCards}</div>
        </div>
    )
}

export default MoviesContainer