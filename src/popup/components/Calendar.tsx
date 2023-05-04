import React, { useState, useEffect } from "react";
import CalendarComp from "../features/Calendar.Comp";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  onSnapshot,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import Quote from "../features/Qoutes";

const Calendar = ({ db, user }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [moodByDay, setMoodByDay] = useState({});
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    const messagesRef = doc(db, "message", "message");
    const theMessage = (await getDoc(messagesRef)).data().text;
    if (theMessage) {
      setMessage(theMessage);
    } else {
      setMessage("");
    }
  };

  // Load mood data from local storage on mount
  useEffect(() => {
    const moodByDayRef = collection(db, "users", user.email, "moodByDay");
    const unsubscribe = onSnapshot(moodByDayRef, (querySnapshot) => {
      const moodByDay = {};
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const mood = doc.data();
        moodByDay[date] = mood.emoji;
      });

      setMoodByDay(moodByDay);
      getMessage();
    });
    return unsubscribe;
  }, [user, db]);

  const writetodatabase = async () => {
    try {
      const batch = writeBatch(db);
      Object.keys(moodByDay).forEach((date) => {
        const moodRef = doc(db, "users", user.email, "moodByDay", date);
        batch.set(moodRef, { emoji: moodByDay[date] });
      });
      await batch.commit();
    } catch (e) {
      console.error("Error adding documents: ", e);
    }
  };

  // Save mood data to local storage on each update
  useEffect(() => {
    writetodatabase();
  }, [moodByDay]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="justify-center font-serif w-80 h-[475px]">
      {message && (
        <div className="p-2 mb-4 bg-teel bg-opacity-40  rounded-lg">
          {message}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <div>
          {" "}
          <h2 className="text-2xl font-medium font-serif text-teal">
            {new Date(year, month).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <h1 className="text-xs mt-1 font-bold max-w-[225px]">
            Log Feelings Once Daily!
          </h1>
        </div>

        <div>
          <button
            className="bg-teel rounded-full px-3 py-1 mr-2 text-white hover:bg-opacity-80 transition-colors"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>
          <button
            className="bg-teel rounded-full px-3 py-1 text-white hover:bg-opacity-80 transition-colors"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
      </div>

      <CalendarComp
        year={year}
        month={month}
        moodByDay={moodByDay}
        setMoodByDay={setMoodByDay}
        db={db}
        user={user}
      />
      {/* <Quote /> */}
    </div>
  );
};

export default Calendar;
