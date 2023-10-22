import "./SelectedMovie.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSelectedMovie, getSelectedTrailer } from "../../apiCalls";

function SelectedMovie({
  selectedMovie,
  resetSelectedMovie,
  selectedTrailerKey,
  setServerError,
}) {
  const { id } = useParams();
  const dayjs = require("dayjs");
  const [selectedMovie2, setSelectedMovie2] = useState();
  const [selectedTrailerKey2, setSelectedTrailerKey2] = useState();

  useEffect(() => {
    if (!selectedMovie2) {
      getSelectedMovie(id)
        .then((data) => {
          setSelectedMovie2(data.movie);
        })
        .catch((error) => {
          setServerError({ hasError: true, message: `${error.message}` });
        });
    }
  }, [id, selectedMovie]);

  useEffect(() => {
    getSelectedTrailer(id)
      .then((data) => {
        setSelectedTrailerKey2(data);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` });
      });
  }, [id, selectedTrailerKey]);

  return (
    selectedMovie2 && (
      <div
        className='selected-movie'
        style={{
          backgroundImage: `url(${selectedMovie2.backdrop_path}`,
          backgroundSize: "cover",
        }}
      >
        <div className='button-container'>
          <Link to='/' style={{ color: `inherit`, textDecoration: `inherit` }}>
            <button
              className='back-to-main-btn'
              onClick={() => resetSelectedMovie()}
            >
              ←
            </button>
          </Link>
        </div>
        <div className='info-and-video-container'>
          <article className='movie-info'>
            <h1 className='movie-title'>
              {selectedMovie2.title},{" "}
              {dayjs(selectedMovie2.release_date).format("YYYY")}
            </h1>

            <p className='runtime info'>{selectedMovie2.runtime} minutes</p>
            <p className='overview info'>{selectedMovie2.overview}</p>
            <p className='avg-rating info'>
              Average Rating: {selectedMovie2.average_rating.toFixed()}/10 🍅
            </p>
            <p className='genres info'>{selectedMovie2.genres.join(" • ")}</p>
          </article>
          {selectedTrailerKey2 && (
            <figure className='movie-trailer'>
              <iframe
                className='trailer'
                width='560'
                height='315'
                title={`embedded youtube trailer for the movie titled ${selectedMovie2.title}`}
                src={`https://www.youtube-nocookie.com/embed/${selectedTrailerKey2}`}
              />
            </figure>
          )}
        </div>
      </div>
    )
  );
}

export default SelectedMovie;
