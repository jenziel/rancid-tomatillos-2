import './App.css'
import movieData from '../../movieData'
import { useState } from 'react'
import MoviesContainer from '../MoviesContainer/MoviesContainer'
import Header from '../Header/Header'

function App() {

  const [allMovies, setAllMovies] = useState(movieData)
  const [serverError, setServerError] = useState({hasError: false, message:''})

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }


  return (
    <div className="App">
      <Header />
      <MoviesContainer allMovies={allMovies.movies} />
    </div>
  );
}

export default App
