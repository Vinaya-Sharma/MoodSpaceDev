import React, { useEffect, useState } from "react";

interface Emotion {
  emoji: string;
  text: string;
  color: string;
}

interface Props {
  moodByDayData: {
    [data: string]: string;
  };
  activitiesByDay: {
    [date: string]: string[];
  };
}

const ActivityCorrelations: React.FC<Props> = ({
  moodByDayData,
  activitiesByDay,
}) => {
  console.log(JSON.stringify(activitiesByDay));
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [activities, setActivities] = useState<
    { activity: string; count: number }[]
  >([]);
  const emotions: Emotion[] = [
    { emoji: "🤩", text: "ahhh", color: "blue-900" },
    { emoji: "😊", text: "nicee", color: "blue-500" },
    { emoji: "😐", text: "okey", color: "teal-500" },
    { emoji: "😔", text: "bummy", color: "orange-500" },
    { emoji: "😣", text: "rotten", color: "red-500" },
  ];

  const handleEmotionSelect = (emoji: string) => {
    setSelectedEmotion(emoji);
  };

  //go through the moodByDayData find the days where the mood is the selectedmood and then for thoose days look at the moodreasons and increment the count for those reasons each time they isFunctionOrConstructorTypeNode.
  const getActivitiesForEmotion = (mood: string) => {
    const activities: { [name: string]: number } = {};

    Object.entries(moodByDayData).forEach(([date, moodEmoji]) => {
      if (moodEmoji === mood) {
        const dateActivities = activitiesByDay[date] || [];
        dateActivities.forEach((activity) => {
          activities[activity] = (activities[activity] || 0) + 1;
        });
      }
    });

    return activities;
  };

  useEffect(() => {
    if (selectedEmotion) {
      console.log(selectedEmotion);
      const activitiesForEmotion = getActivitiesForEmotion(selectedEmotion);
      const sortedActivities = Object.entries(activitiesForEmotion)
        .sort((a, b) => b[1] - a[1])
        .map(([activity, count]) => ({ activity, count }));
      setActivities(sortedActivities);
      console.log(sortedActivities);
    } else {
      setActivities([]);
    }
  }, [selectedEmotion]);
  return (
    <div className="w-80 ">
      <div className="relative justify-between flex place-items-center items-center mb-4">
        <h2 className="text-md mt-2 font-bold mb-4">Activity Correlations</h2>
        <div className="relative">
          <select
            className="appearance-none border min-w-[150px] w-full border-gray-300 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
            value={selectedEmotion || ""}
            onChange={(e) => handleEmotionSelect(e.target.value)}
          >
            <option value="">Select a Mood... </option>
            {emotions.map(({ emoji, text, color }) => (
              <option
                className="flex gap-2 items-center"
                key={emoji}
                value={emoji}
              >
                {`${emoji} ${text}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedEmotion && activities?.length > 0 ? (
        <ul className="flex justify-center items-center flex-wrap w-full">
          {activities.map(({ activity, count }) => (
            <li key={activity} className="mb-2">
              <div
                className={`w-auto mx-2 justify-center h-6 m-1 py-1 px-2 text-xs rounded-full bg-teel text-white relative`}
              >
                {activity}
                <span className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-white p-2 border-gray-400 border-[1px] text-teel flex justify-center items-center text-xs font-bold">
                  {count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Please select an emotion to see associated activities.</p>
      )}
    </div>
  );
};

export default ActivityCorrelations;
