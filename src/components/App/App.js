import './App.css'
import movieData from '../../movieData'
import SelectedMovie from '../SelectedMovie/SelectedMovie'
import { useState, useEffect } from 'react'
import MoviesContainer from '../MoviesContainer/MoviesContainer'

function App() {

  const [allMovies, setAllMovies] = useState(movieData)
  const [serverError, setServerError] = useState({hasError: false, message:''})
  const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
      if (selectedMovie){
        console.log('the selected movie is', `${selectedMovie.title}`)
      }
      else {
        console.log('no movie is currently selected')
      }
    }, [selectedMovie])
  const showMovieDetails = (id) =>{
    const foundMovie = allMovies.movies.find(movie => {
      return movie.id === id
    })
    console.log(foundMovie, 'foundMovie')
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
      { !selectedMovie ? (
        <MoviesContainer allMovies={allMovies.movies} showMovieDetails={showMovieDetails}/> 
      ): (
        <SelectedMovie selectedMovie={selectedMovie} resetSelectedMovie={resetSelectedMovie}/>
      )
      }
    </div>
  );
}

export default App
