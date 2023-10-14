import './App.css'
import movieData from '../../movieData'
import SelectedMovie from '../SelectedMovie/SelectedMovie'
import { useState, useEffect } from 'react'
import MoviesContainer from '../MoviesContainer/MoviesContainer'
import Header from '../Header/Header'

function App() {

  const [allMovies, setAllMovies] = useState(movieData)
  const [serverError, setServerError] = useState({hasError: false, message:''})
  const [selectedMovie, setSelectedMovie] = useState(null)

  const showMovieDetails = (id) =>{
    const foundMovie = allMovies.movies.find(movie => {
      return movie.id === id
    })
    setSelectedMovie(foundMovie)
  }

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }
  
  const resetSelectedMovie = () => {
    setSelectedMovie(null)
  }
  
  // if selectedMovie exists, then don't render the MoviesContainer, and DO render the MovieDetails page.
  return (
    <div className="App">
      <div className='header'>
        <Header />
      </div>
      { !selectedMovie ? (
        <div className='movies-container'>
          <MoviesContainer allMovies={allMovies.movies} showMovieDetails={showMovieDetails}/> 
        </div>
      ): (
        <SelectedMovie selectedMovie={selectedMovie} resetSelectedMovie={resetSelectedMovie}/>
      )
      }
    </div>
  );
}

export default App
