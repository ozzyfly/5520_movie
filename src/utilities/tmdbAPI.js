import { TMDB_API_KEY } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed fetching trending movies:", error);
  }
};

export const fetchNewReleases = async () => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  const fromDate = lastMonth.toISOString().split("T")[0];
  const toDate = today.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed fetching new releases:", error);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed fetching details for movie ID ${movieId}:`, error);
  }
};
