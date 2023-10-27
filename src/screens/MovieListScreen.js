import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { fetchMovieList } from "../utilities/tmdbAPI";

function MovieListScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieList().then((data) => {
      setMovies(data.results);
    });
  }, []);

  return (
    <div>
      {movies.length ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <Text>No movies found.</Text>
      )}
    </div>
  );
}

export default MovieListScreen;
