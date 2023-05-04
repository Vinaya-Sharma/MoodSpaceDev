import React from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "./const";
import Navigation from "./Router";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import Signup from "./components/Signup";

export const firebase = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(firebase);
const db = getFirestore(firebase);

const FirebaseApp = (props) => {
  const [user, setUser] = React.useState(undefined);
  const [isLogin, setIsLogin] = React.useState(true);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [firstTime, setFirstTime] = React.useState(null);

  const signIn = (e) => {
    e.preventDefault();
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        alert(
          `SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
        );
        return;
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then((res) => {})
        .catch((err) => {
          alert(`SSO ended with an error: ${err}`);
        });
    });
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user && user.uid ? user : null);
    });
  }, []);

  const checkIfFirstTime = async () => {
    const userRef = doc(db, "users", user.email);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setFirstTime(false);
    } else {
      console.log("User does not already exist:");
      setFirstTime(true);
    }
  };

  if (undefined === user) return <h1>Loading...</h1>;
  //return this when there is a user
  if (user != null) {
    checkIfFirstTime();

    return (
      <div className="w-full h-full">
        {firstTime === null ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : firstTime ? (
          <Signup user={user} db={db} setFirstTime={setFirstTime} />
        ) : (
          <Navigation user={user} auth={auth} db={db} />
        )}
      </div>
    );
  }
  //return this when there is no user
  return (
    <div className="flex place-self-center flex-col w-full 2-full place-items-center items-center justify-center h-[400px]">
      <div className="flex items-center gap-2">
        <img src="logo128x128.png" alt="MoodSpace logo" className="w-10 mb-8" />
        <h1 className="text-xl font-serif font-bold mb-6">
          Welcome to MoodSpace
        </h1>
      </div>
      <button
        className="bg-teel w-32 h-10 text-center text-white font-bold rounded hover:bg-teal-600"
        onClick={signIn}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default FirebaseApp;
