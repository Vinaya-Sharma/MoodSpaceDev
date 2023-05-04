import React, { useEffect, useState } from "react";
import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const UnlockJournal = ({
  user,
  db,
  access,
  setAccess,
  password,
  setPassword,
  setUsePassword,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkPasswordExists = async () => {
      const userDocRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const hashedPassword = userDoc.data().hashedJournalPassword;
        const value = hashedPassword ? true : false;
        if (!value) {
          setShowPopup(true);
        }
        setHasPassword(value);
      }
    };

    checkPasswordExists();
  }, []);

  const handleOptOut = async () => {
    const userDocRef = doc(db, "users", user.email);
    await setDoc(userDocRef, { usePassword: false }, { merge: true });
    setUsePassword(false);
  };

  const handleSetPassword = async (password: string) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    const userDocRef = doc(db, "users", user.email);
    await setDoc(
      userDocRef,
      { hashedJournalPassword: hashedPassword },
      { merge: true }
    );
    setHasPassword(true);
    setPassword("");
    checkPassword(password);
  };

  const checkPassword = async (password: string) => {
    setIsLoading(true);
    const userDocRef = doc(db, "users", user.email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const hashedPassword = userDoc.data().hashedJournalPassword;
      const inputHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      if (hashedPassword === inputHash) {
        handleClearClick();
        setAccess(true);
      } else {
        handleClearClick();
        alert("Incorrect password. Please try again.");
      }
    }
    setIsLoading(false);
  };

  const handleKeypadClick = (digit: string) => {
    if (digit == "clear") {
      handleClearClick();
      return;
    }
    setPassword((prevPassword) => prevPassword + digit);
    if (password.length === 4) {
      if (hasPassword) {
        checkPassword(password + digit);
      } else {
        handleSetPassword(password + digit);
      }
    }
  };

  const handleClearClick = () => {
    setPassword("");
  };

  return (
    <div className="mt-4 flex justify-center">
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div className="bg-white mx-2 rounded-lg p-4 ">
            <h1>
              Hey! MoodSpace is a safe place to journal your thoughts, and
              reflect on your day. ❤️
              <br />
              <br />
              <span className="underline">
                If you want an extra layer of privacy you can set a password so
                no siblings or friends snoop in on your dearest thoughts. 😱
              </span>{" "}
              This also adds an extra layer of encryption.
              <br />
              <br />
              You can opt out if you want to avoid re-entering a password each
              time and your data will still be safe with us.
              <br />
              <br />
              You can change preferences and opt in/out anytime in settings.
            </h1>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="flex mt-4 flex-col w-60 h-70 ">
        <input
          className="text-lg w-full text-center b-2 rounded-lg border-2 border-gray-200"
          placeholder={
            hasPassword ? "Enter your password" : "Choose a 5 digit password"
          }
          value={password && password}
        />

        <div className="mt-4 ml-2 w-60 h-50 ">
          <div className="grid gap-5 grid-cols-3 grid-rows-3 h-full">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "clear",
              "0",
              " ",
            ].map((number) => (
              <div
                key={number}
                className={`flex w-12  h-12 justify-center items-center ${
                  access ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"
                } rounded-full border-2 border-gray-300 font-bold text-gray-600`}
                onClick={() => handleKeypadClick(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
        <div>
          {!hasPassword && (
            <button
              onClick={handleOptOut}
              className="mt-4 w-full place-self-center hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-cpink "
            >
              Opt out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnlockJournal;
