import { db } from "./config";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export const createUserDocument = async (userId, userData) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid or missing userId");
  }
  if (!userData || typeof userData !== "object") {
    throw new Error("Invalid user data");
  }

  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};

export const updateUserDocument = async (userId, update) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, update);
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};

export const addReviewToMovie = async (
  movieId,
  userId,
  reviewText,
  imageUrl
) => {
  const newReview = {
    userId,
    text: reviewText,
    createdAt: new Date(),
    imageUrl,
  };
  if (!movieId || typeof movieId !== "string") {
    throw new Error("Invalid movieId");
  }
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid userId");
  }
  if (!reviewText || typeof reviewText !== "string") {
    throw new Error("Review text is required");
  }

  try {
    const reviewRef = collection(db, "movies", movieId, "reviews");
    await addDoc(reviewRef, newReview);
  } catch (error) {
    console.error("Error adding review to movie:", error);
    throw new Error(error.message);
  }
};

export const getMoviesWithReviews = async () => {
  try {
    const moviesRef = collection(db, "movies");
    const querySnapshot = await getDocs(moviesRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getReviewsForMovie = async (movieId) => {
  try {
    if (typeof movieId !== "string") {
      throw new Error("movieId must be a string");
    }
    const reviewsRef = collection(db, "movies", movieId, "reviews");
    const querySnapshot = await getDocs(reviewsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting reviews for movie:", error);
    throw error;
  }
};

export const saveMovieDetailsToFirestore = async (movieDetails) => {
  if (!movieDetails || typeof movieDetails !== "object") {
    throw new Error("Invalid movie details");
  }
  if (!movieDetails.id) {
    throw new Error("Movie ID is required");
  }

  try {
    const movieRef = doc(db, "movies", movieDetails.id.toString());
    await setDoc(movieRef, movieDetails);
  } catch (error) {
    console.error("Error saving movie details:", error);
    throw error;
  }
};

export const getUserDocument = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    throw error;
  }
};

export const updateReviewDocument = async (
  movieId,
  reviewId,
  updatedReview
) => {
  try {
    const reviewRef = doc(db, "movies", movieId, "reviews", reviewId);
    await updateDoc(reviewRef, updatedReview);
  } catch (error) {
    console.error("Error updating review document:", error);
    throw error;
  }
};

export const getReviewDocument = async (movieId, reviewId) => {
  try {
    const reviewRef = doc(db, "movies", movieId, "reviews", reviewId);
    const reviewSnap = await getDoc(reviewRef);
    if (reviewSnap.exists()) {
      return { id: reviewSnap.id, ...reviewSnap.data() };
    } else {
      throw new Error("Review not found");
    }
  } catch (error) {
    console.error("Error fetching review document:", error);
    throw error;
  }
};

export const getMovieTitleById = async (movieId) => {
  if (!movieId || typeof movieId !== "string") {
    return "Invalid Movie ID";
  }

  try {
    const movieRef = doc(db, "movies", movieId);
    const movieSnap = await getDoc(movieRef);

    if (movieSnap.exists()) {
      return movieSnap.data().title;
    } else {
      return "Unknown Movie";
    }
  } catch (error) {
    throw error;
  }
};

export const deleteReviewDocument = async (movieId, reviewId) => {
  try {
    const reviewRef = doc(db, "movies", movieId, "reviews", reviewId);
    await deleteDoc(reviewRef);
  } catch (error) {
    console.error("Error deleting review document:", error);
    throw error;
  }
};
