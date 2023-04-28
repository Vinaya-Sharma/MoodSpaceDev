import React, { useEffect, useState } from "react";
import TodoComp from "../features/TodoComp";
import FeelingReasons from "../features/FeelingsReasons";
import MoodTrends from "../analytics/MoodTrends";
import MoodChart from "../analytics/MoodChart";
import ActivityCorrelations from "../analytics/ActivitiyCorrelations";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const Analytics = ({ db, user }) => {
  interface MoodByDayData {
    [key: string]: string;
  }
  const [moodByDayData, setMoodByDayData] = useState<MoodByDayData>({});
  const [reasonsByDayData, setReasonsByDayData] = useState({});

  const gettingData = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().moodReasons;
      console.log("Document data:", data);
      if (data) {
        setReasonsByDayData(data);
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const moodByDayRef = collection(db, "users", user.email, "moodByDay");
    const unsubscribe = onSnapshot(moodByDayRef, (querySnapshot) => {
      const moodByDay = {};
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const mood = doc.data();
        moodByDay[date] = mood.emoji;
      });
      console.log(moodByDay);
      setMoodByDayData(moodByDay);
    });
    return unsubscribe;
  }, [user, db]);

  //setting activities
  useEffect(() => {
    gettingData();
  }, []);

  return (
    <div className="flex w-80 flex-col gap-4 mb-12  ">
      {/* <MoodTrends /> */}
      <h2 className="text-2xl flex flex-col font-medium font-serif flex-start justify-start w-full text-left">
        Emojinal Intelligence
        <span className="text-sm font-bold">Your Mood Stats and Streaks!</span>
      </h2>
      <MoodChart data={moodByDayData} />
      <ActivityCorrelations
        moodByDayData={moodByDayData}
        activitiesByDay={reasonsByDayData}
      />
      <div className="mb-12 text-white ">.</div>
      <div className="mb-12 text-white ">.</div>
    </div>
  );
};

export default Analytics;
