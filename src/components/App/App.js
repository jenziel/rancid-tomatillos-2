import './App.css'
import SelectedMovie from '../SelectedMovie/SelectedMovie'
import { useState, useEffect } from 'react'
import MoviesContainer from '../MoviesContainer/MoviesContainer'
import Header from '../Header/Header'
import {getMovies, getSelectedMovie, getSelectedTrailer} from '../../apiCalls'

function App() {

  const [allMovies, setAllMovies] = useState([])
  const [serverError, setServerError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedTrailerKey, setSelectedTrailerKey] = useState('')

  useEffect(()=>{
    getMovies()
    .then(data => {
      return setAllMovies(data.movies)
    })
    .catch(error => {
      setServerError(`${error.message}`)
    })
  }, [])

  const showMovieDetails = (id) => {
    getSelectedMovie(id)
    .then(data => {
      setSelectedMovie(data.movie)
    })
    .catch(error => {
      setServerError(`${error.message}`)
    })
  }

  const showYoutubeVideo = (id) => {
    getSelectedTrailer(id)
    .then(data => {
      setSelectedTrailerKey(data)
    })
  }

  const resetError = () => {
    setServerError('')
  }
  
  const resetSelectedMovie = () => {
    setSelectedMovie(null)
  }
  
  return (
    <div className="App">
        <Header />
      { !selectedMovie ? (
        <div className='movies-container'>
          <MoviesContainer allMovies={allMovies} showMovieDetails={showMovieDetails} showYoutubeVideo={showYoutubeVideo} /> 
        </div>
      ): (
        <SelectedMovie selectedMovie={selectedMovie} selectedTrailerKey={selectedTrailerKey} resetSelectedMovie={resetSelectedMovie}/>
      )
      }
    </div>
  )
}

export default App
