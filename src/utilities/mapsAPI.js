import axios from "axios";

const MAPS_API_KEY = process.env.MAPS_API_KEY;

export const fetchNearbyCinemas = async (latitude, longitude) => {
  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=movie_theater&key=${MAPS_API_KEY}`;
  try {
    const response = await axios.get(URL);
    return response.data.results;
  } catch (error) {
    console.error("Failed fetching nearby cinemas:", error);
  }
};

// ... other related Google Maps functions
