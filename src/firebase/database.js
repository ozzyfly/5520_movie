import { db } from "./config"; // Adjust the path to where your config is
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // The document data will be in the docSnap.data() method
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error; // Re-throw the error so you can catch it where the function is called
  }
};
