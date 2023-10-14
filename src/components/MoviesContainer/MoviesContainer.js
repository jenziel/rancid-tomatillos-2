import './MoviesContainer.css'
import MovieCard from '../MovieCard/MovieCard'

function MoviesContainer({ allMovies, showMovieDetails }) {
    const movieCards = allMovies.map(movie => {
        return (
                <MovieCard 
                    title={movie.title}
                    poster_path={movie.poster_path}
                    key={movie.id}
                    id={movie.id}
                    showMovieDetails={showMovieDetails}
                    backdrop_path={movie.backdrop_path}
                />
        )
    })
    return (
        <div className='cards-container'>{movieCards}</div>
    )
}

export default MoviesContainer