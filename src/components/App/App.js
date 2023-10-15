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

  useEffect(()=>{
    getMovies()
    .then(data => {
      console.log('data', data)
      return setAllMovies(data.movies)
    })
    .catch(error => {
      setServerError(`${error.message}`)
    })
  }, [])

  useEffect(() => {
    console.log(` There are ${allMovies.length} items in allMovies array.`)
  }, [allMovies])

  useEffect(()=>{
    console.log(`current error state is: ${serverError}`)
  })

  const showMovieDetails = (id) => {
    getSelectedMovie(id)
    .then(data => {
      console.log('selected movie', data.movie)
      setSelectedMovie(data.movie)
    })
    .catch(error => {
      setServerError(`${error.message}`)
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
          <MoviesContainer allMovies={allMovies} showMovieDetails={showMovieDetails}/> 
        </div>
      ): (
        <SelectedMovie selectedMovie={selectedMovie} resetSelectedMovie={resetSelectedMovie}/>
      )
      }
    </div>
  );
}

export default App
