import { db } from "./config"; // Adjust the path to where your config is
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const getUserData = async (userId) => {
  try {
    if (!userId) {
      throw new Error("No userId provided");
    }
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const updateUserData = async (userId, update) => {
  try {
    if (!userId) {
      throw new Error("No userId provided");
    }
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, update);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
