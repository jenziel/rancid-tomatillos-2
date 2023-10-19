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
  const [serverError, setServerError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTrailerKey, setSelectedTrailerKey] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getMovies()
      .then((data) => {
        return setAllMovies(data.movies);
      })
      .catch((error) => {
        setServerError(`${error.message}`);
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
        setServerError(`${error.message}`);
      });
  };

  const showYoutubeVideo = (id) => {
    getSelectedTrailer(id)
    .then(data => {
      setSelectedTrailerKey(data)
    })
  }

  const resetError = () => {
    setServerError("");
  };

  const resetSelectedMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <div className='App'>
      <Header />
      {serverError ? (
        <ErrorComponent />
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
              />
            }
          ></Route>
          <Route
            path='/movies/:id'
            element={
              <SelectedMovie
                allMovies = {allMovies}
                showMovieDetails={showMovieDetails}
                selectedMovie={selectedMovie}
                selectedTrailerKey={selectedTrailerKey}
                resetSelectedMovie={resetSelectedMovie}
                setIsLoading={setIsLoading}
              />
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
