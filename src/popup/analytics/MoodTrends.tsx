import React, { useEffect, useState } from "react";

const MoodTrends = () => {
  interface MoodByDayData {
    [key: string]: string;
  }
  const [moodByDayData, setMoodByDayData] = useState<MoodByDayData>({});

  useEffect(() => {
    const moodByDayDataFromStorage = JSON.parse(
      localStorage.getItem("moodByDay") || "{}"
    );
    setMoodByDayData(moodByDayDataFromStorage);
  }, []);

  // Count the number of occurrences of each mood
  const moodCounts = Object.values(moodByDayData).reduce((counts, mood) => {
    counts[mood] = counts[mood] ? counts[mood] + 1 : 1;
    return counts;
  }, {});

  // Calculate the percentages of each mood
  const moodPercentages = Object.keys(moodCounts).reduce(
    (percentages, mood) => {
      percentages[mood] = (
        (moodCounts[mood] / Object.keys(moodByDayData).length) *
        100
      ).toFixed(1);
      return percentages;
    },
    {}
  );

  // Sort the moods by percentage
  const sortedMoods = Object.keys(moodPercentages).sort(
    (a, b) => moodPercentages[b] - moodPercentages[a]
  );

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-2">Mood Trends</h2>
      {sortedMoods.map((mood) => (
        <div
          key={mood}
          className="flex flex-row justify-between items-center mb-2"
        >
          <div className="flex flex-row items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex justify-center items-center text-lg">
              {mood}
            </div>
          </div>
          <span>{moodPercentages[mood]}%</span>
        </div>
      ))}
    </div>
  );
};

export default MoodTrends;
