import './MoviesContainer.css'
import MovieCard from '../MovieCard/MovieCard'

function MoviesContainer({ allMovies }) {
    const movieCards = allMovies.map(movie => {
        return (
            <MovieCard 
                title={movie.title}
                poster_path={movie.poster_path}
                key={movie.id}
                id={movie.id}
            />
        )
    })
    return (
        <div className='cards-container'>{movieCards}</div>
    )
}

export default MoviesContainer