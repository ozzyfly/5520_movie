// database.js
import { db } from "./config";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Create a user document in the "users" collection
export const createUserDocument = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};

// Update user data in the "users" collection
export const updateUserDocument = async (userId, update) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, update);
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};

// Create a review document in the "reviews" collection
export const createReviewDocument = async (reviewData) => {
  try {
    const reviewRef = doc(collection(db, "reviews"));
    await setDoc(reviewRef, reviewData);
  } catch (error) {
    console.error("Error creating review document:", error);
    throw error;
  }
};

// Create a movie document in the "movies" collection
export const createMovieDocument = async (movieData) => {
  try {
    const movieRef = doc(collection(db, "movies"));
    await setDoc(movieRef, movieData);
  } catch (error) {
    console.error("Error creating movie document:", error);
    throw error;
  }
};

// Function to create a review for a movie
export const createReview = async (movieId, review) => {
  try {
    const reviewRef = doc(collection(db, "reviews"));
    await setDoc(reviewRef, { ...review, movieId });
  } catch (error) {
    console.error("Error creating review:", error);
  }
};

// Function to get reviews for a movie
export const getReviews = async (movieId) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("movieId", "==", movieId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Function to create a reply for a review
export const createReply = async (reviewId, reply) => {
  try {
    const replyRef = doc(collection(db, `reviews/${reviewId}/replies`));
    await setDoc(replyRef, reply);
    // Here, you would trigger a notification for the review's author.
  } catch (error) {
    console.error("Error creating reply:", error);
  }
};

// Function to get replies for a review
export const getReplies = async (reviewId) => {
  try {
    const repliesRef = collection(db, `reviews/${reviewId}/replies`);
    const querySnapshot = await getDocs(repliesRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching replies:", error);
  }
};

export const addReviewToMovie = async (movieId, userId, reviewText) => {
  if (!movieId) {
    throw new Error("movieId is undefined or not a string.");
  }
  if (!userId) {
    throw new Error("userId is undefined or not a string.");
  }

  const reviewRef = collection(db, "movies", movieId, "reviews");

  const newReview = {
    userId,
    text: reviewText,
    createdAt: new Date(),
  };

  try {
    await addDoc(reviewRef, newReview);
  } catch (error) {
    console.error("Error adding review to movie:", error);
    throw new Error(error);
  }
};

export const getMoviesWithReviews = async () => {
  try {
    const moviesRef = collection(db, "movies");
    // This is a placeholder. You'll need to adjust this query based on your data structure.
    const q = query(moviesRef, where("hasReviews", "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching movies with reviews:", error);
    throw error;
  }
};

// Function to add a reply to a review
export const addReplyToReview = async (movieId, reviewId, replyData) => {
  try {
    const replyRef = collection(
      db,
      "movies",
      movieId,
      "reviews",
      reviewId,
      "replies"
    );
    await addDoc(replyRef, replyData);
    return replyRef.id; // Return the reply ID to use for notifications
  } catch (error) {
    console.error("Error adding reply to review:", error);
    throw error;
  }
};

// Function to get reviews for a movie
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
    throw error; // Rethrow the error to be caught by the calling function
  }
};

// Function to get replies for a review
export const getRepliesForReview = async (movieId, reviewId) => {
  try {
    const repliesRef = collection(
      db,
      "movies",
      movieId,
      "reviews",
      reviewId,
      "replies"
    );
    const querySnapshot = await getDocs(repliesRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting replies for review:", error);
    throw error;
  }
};

export const saveMovieDetailsToFirestore = async (movieDetails) => {
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
      console.log("User data:", userSnap.data());
      return userSnap.data(); // returns the user document data
    } else {
      console.log("No user found with ID:", userId);
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    throw error;
  }
};

const fetchUserName = async () => {
  try {
    const userRef = doc(db, "users", review.userId); // Assuming 'db' is your Firestore instance
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUserName(userSnap.data().name); // Assuming the user's name is stored under a 'name' field
    } else {
      console.log("No such document!");
      setUserName("Unknown User");
    }
  } catch (error) {
    console.error("Error fetching user name:", error);
    setUserName("Unknown User"); // Fallback text
  }
};
