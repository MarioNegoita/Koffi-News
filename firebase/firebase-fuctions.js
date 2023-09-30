import {
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  doc,
  setDoc,
  sendPasswordResetEmail,
  signOut,
} from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registration = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          email: email,
          password: password,
          id: user.uid,
          interestsChosen: false,
        });
      }
    );
    return 200;
  } catch (_) {
    return 500;
  }
};

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return 200;
  } catch (_) {
    return 500;
  }
};

export const forgotPass = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return 200;
  } catch (err) {
    return 500;
  }
};

export const logout = async () => {
  await removeValue();

  await signOut(auth);
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
};
