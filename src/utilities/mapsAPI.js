import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env";

export const fetchNearbyCinemas = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=movie_theater&key=${GOOGLE_MAPS_API_KEY}`
    );
    if (response.data) {
      console.log("API Response:", response.data);
      if (response.data.results) {
        return response.data.results;
      } else {
        console.error("No results found in the response:", response.data);
        return [];
      }
    } else {
      console.error("Invalid response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed fetching nearby cinemas:", error);
    return [];
  }
};
