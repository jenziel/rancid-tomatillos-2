import "./SelectedMovie.css";

function SelectedMovie({ selectedMovie, resetSelectedMovie }) {
  const { backdrop_path, poster_path, title, release_date, average_rating } =
    selectedMovie;

  return (
    <div className='selected-movie'>
      <div className='backdrop-container'>
        <img src={backdrop_path} className='backdrop'></img>
        <div className='gray-overlay'></div>
      </div>
      <button className='back-to-main-btn' onClick={() => resetSelectedMovie()}>
        ←
      </button>
        <div className='movie-info'>
      <h1 className='movie-title'>{selectedMovie.title}</h1>
        <ul className='movie-stats'>
            <li className='runtime'>120 minutes</li>
            <li className='overview'>Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.</li>
            <li className='release-date'>Released {release_date}</li>
            <li className='avg-rating'>Average Rating: {average_rating}/10</li>
            <li className='genres'>Genres: Action, Fantasy, Science Fiction</li>
            <li className='budget'>Budget: 2 million</li>
            <li className='revenue'>Revenue: 3 million</li>
        </ul>
        </div>
        <div className='movie-trailer'>
          <h1>video placeholder box</h1>
        </div>
      </div>
  );
}
export default SelectedMovie;
