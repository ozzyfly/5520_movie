import { firestore } from "./config";

export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// ... other related authentication functions
