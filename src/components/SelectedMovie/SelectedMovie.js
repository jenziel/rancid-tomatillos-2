import "./SelectedMovie.css";
import { useParams, Link, } from "react-router-dom";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Loading from "../Loading/Loading";
import {useState, useEffect} from "react"

function SelectedMovie({ selectedMovie, allMovies, resetSelectedMovie, setIsLoading, selectedTrailerKey }) {
  const { id } = useParams();
  const [selectedMovie2, setSelectedMovie2] = useState(null)

  useEffect(()=>{
    setSelectedMovie2(selectedMovie)
  }, [])

    useEffect(()=>{  
      console.log(`selected movie is now  ${selectedMovie2}`)
      console.log(selectedMovie2)
    }, [selectedMovie2])
  const dayjs = require("dayjs");

  const idAsNumber = parseInt(id);

  if (id) {
    var justIds = allMovies.map((movie) => {
      return movie.id;
    });
  }

  if (!justIds.includes(idAsNumber)) {
    return (
      <ErrorComponent/>
    );
  } else if (!selectedMovie.backdrop_path) {
    return <Loading/>
  }
  return (
        <div
          className='selected-movie'
          style={{
            backgroundImage: `url(${selectedMovie.backdrop_path}`,
            backgroundSize: "cover",
          }}
        >
          <div className='button-container'>
            <Link to='/'>
            <button
              className='back-to-main-btn'
              onClick={() => resetSelectedMovie()}
            >
              ←
            </button>
            </Link>
          </div>
          <div className='info-and-video-container'>
            <div className='movie-info'>
              <h1 className='movie-title'>{selectedMovie.title}, {dayjs(selectedMovie.release_date).format("YYYY")}</h1>
    
              <div className='runtime info'>{selectedMovie.runtime} minutes</div>
              <div className='overview info'>
                {selectedMovie.overview}
              </div>
              <div className='avg-rating info'>Average Rating: {selectedMovie.average_rating.toFixed()}/10 🍅</div>
              <div className='genres info'>{selectedMovie.genres.join(' • ')}</div>
            </div>
            {selectedTrailerKey && (
            <div className='movie-trailer'>
              <iframe className='trailer'  width='560' height='315' title={`embedded youtube trailer for the movie titled ${selectedMovie.title}`} width='560' height='315' src={`https://www.youtube-nocookie.com/embed/${selectedTrailerKey}`} />
            </div>
            )}
          </div>
        </div>
    )
    }
export default SelectedMovie;
