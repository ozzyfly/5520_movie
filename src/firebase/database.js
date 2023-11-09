import { db } from "./config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const addUserReview = async (userId, review) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      reviews: arrayUnion(review),
    });
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

// ... other Firestore interaction functions
