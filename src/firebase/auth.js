import { auth, db } from "./config";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
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

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

const getUserInfo = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user logged in");
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export { getUserInfo };
