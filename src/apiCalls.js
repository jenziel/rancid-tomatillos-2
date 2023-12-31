export function getMovies() {
  return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies").then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Movies not found.`);
      }
      return response.json();
    }
  );
}

export function getSelectedMovie(id) {
  return fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Movie not found.`);
    }
    return response.json();
  });
}

export function getSelectedTrailer(id) {
  return fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Trailer not found.`);
      }
      return response.json();
    })
    .then((data) => {
      const trailerVideo = data.videos.find(
        (video) => video.type === "Trailer"
      );
      if (!trailerVideo) {
        return null;
      }
      return trailerVideo.key;
    })
    .catch((error) => {
      console.error("Error fetching trailer:", error);
      return null;
    });
}
