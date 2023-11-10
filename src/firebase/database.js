// database.js
import { db } from "./config";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
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
// Function to add a review to a movie
export const addReviewToMovie = async (movieId, reviewData) => {
  try {
    const reviewRef = doc(collection(db, "movies", movieId, "reviews"));
    await setDoc(reviewRef, reviewData);
  } catch (error) {
    console.error("Error adding review to movie:", error);
    throw error;
  }
};

// Function to add a reply to a review
export const addReplyToReview = async (movieId, reviewId, replyData) => {
  try {
    const reviewReplyRef = collection(
      db,
      "movies",
      movieId,
      "reviews",
      reviewId,
      "replies"
    );
    await addDoc(reviewReplyRef, replyData);
    // Here you would trigger a notification to the user who wrote the original review
  } catch (error) {
    console.error("Error adding reply to review:", error);
    throw error;
  }
};

// Function to get reviews for a movie
export const getReviewsForMovie = async (movieId) => {
  try {
    const reviewsRef = collection(db, "movies", movieId, "reviews");
    const querySnapshot = await getDocs(reviewsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting reviews for movie:", error);
    throw error;
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
