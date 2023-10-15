import "./SelectedMovie.css";

function SelectedMovie({ selectedMovie, resetSelectedMovie }) {
  const { backdrop_path, poster_path, title, release_date, overview, genres, runtime, average_rating } =
    selectedMovie;
  const dayjs = require("dayjs");
  return (
    <div
      className='selected-movie'
      style={{
        backgroundImage: `url(${backdrop_path}`,
        backgroundSize: "cover",
      }}
    >
      <div className='button-container'>
        <button
          className='back-to-main-btn'
          onClick={() => resetSelectedMovie()}
        >
          ←
        </button>
      </div>
      <div className='info-and-video-container'>
        <div className='movie-info'>
          <h1 className='movie-title'>{selectedMovie.title}, {dayjs(release_date).format("YYYY")}</h1>

          <div className='runtime info'>{runtime} minutes</div>
          <div className='overview info'>
            {overview}
          </div>
          <div className='avg-rating info'>Average Rating: {average_rating.toFixed()}/10 🍅</div>
          <div className='genres info'>{genres.join(' • ')}</div>
        </div>
        <div className='movie-trailer'>
          <p>video placeholder box</p>
        </div>
      </div>
    </div>
  );
}
export default SelectedMovie;
