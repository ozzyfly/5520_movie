import { firestore } from "./config";

export const addUserReview = async (userId, review) => {
  try {
    const userRef = firestore.collection("users").doc(userId);
    await userRef.update({
      reviews: firebase.firestore.FieldValue.arrayUnion(review),
    });
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

// ... other related Firestore database functions
