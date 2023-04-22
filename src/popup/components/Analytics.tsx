import React, { useEffect, useState } from "react";
import TodoComp from "../features/TodoComp";
import FeelingReasons from "../features/FeelingsReasons";
import MoodTrends from "../analytics/MoodTrends";
import MoodChart from "../analytics/MoodChart";
import ActivityCorrelations from "../analytics/ActivitiyCorrelations";

const Analytics = () => {
  interface MoodByDayData {
    [key: string]: string;
  }
  const [moodByDayData, setMoodByDayData] = useState<MoodByDayData>({});
  const [reasonsByDayData, setReasonsByDayData] = useState({});

  //setting moods
  useEffect(() => {
    const moodByDayDataFromStorage = JSON.parse(
      localStorage.getItem("moodByDay") || "{}"
    );
    setMoodByDayData(moodByDayDataFromStorage);
  }, []);

  //setting activities
  useEffect(() => {
    const activitiesByDaya = JSON.parse(
      localStorage.getItem("moodReasons") || "{}"
    );
    setReasonsByDayData(activitiesByDaya);
  }, []);

  return (
    <div className="flex w-80 pb-8 flex-col items-center justify-center gap-4 ">
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
    </div>
  );
};

export default Analytics;
