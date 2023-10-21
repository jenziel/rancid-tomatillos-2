import "./App.css";
import SelectedMovie from "../SelectedMovie/SelectedMovie";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import {
  getMovies,
  getSelectedMovie,
  getSelectedTrailer,
} from "../../apiCalls";
import { Routes, Route } from "react-router-dom";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Loading from "../Loading/Loading";


function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTrailerKey, setSelectedTrailerKey] = useState('');
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getMovies()
      .then((data) => {
        return setAllMovies(data.movies);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`});

      });
  }, []);

  const showMovieDetails = (id) => {
    setIsLoading(true)
    getSelectedMovie(id)
      .then((data) => {
        setSelectedMovie(data.movie);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`});
      });
  };

  const showYoutubeVideo = (id) => {
    getSelectedTrailer(id)
    .then(data => {
      setSelectedTrailerKey(data)
    })
    .catch((error) => {
      setServerError({hasError: true, message: `${error.message}`});
    });
  }


  const resetError = () => {
    setServerError({hasError: false, message: ''});
  };

  const resetSelectedMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <div className='App'>
      <Header resetError={resetError} />
      {serverError.hasError ? (
        <ErrorComponent serverError={serverError} resetError={resetError} />
      ) : isLoading ? (
        <Loading />
      ):(
        <Routes>
          <Route
            path='/'
            element={
              <MoviesContainer 
                allMovies={allMovies} 
                showMovieDetails={showMovieDetails} 
                showYoutubeVideo={showYoutubeVideo} 
                setServerError={setServerError}
              />
            }></Route>
          <Route
            path='/:id'
            element={
              <SelectedMovie
                allMovies = {allMovies}
                showMovieDetails={showMovieDetails}
                selectedMovie={selectedMovie}
                selectedTrailerKey={selectedTrailerKey}
                resetSelectedMovie={resetSelectedMovie}
                setIsLoading={setIsLoading}
                setServerError={setServerError}
              />
            }
          ></Route>
          <Route path='*' element={<ErrorComponent resetError={resetError} />} />
        </Routes>)}
    </div>
  )
}

export default App;
