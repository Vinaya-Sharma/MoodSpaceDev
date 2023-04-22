import React from "react";

const MoodPicker = ({
  year,
  month,
  moodByDay,
  setMoodByDay,
  selectedDay,
  setMood,
}) => {
  const emotions = [
    { emoji: "😣", text: "rotten", color: "red-500" },
    { emoji: "😔", text: "bummy", color: "orange-500" },
    { emoji: "😐", text: "okey", color: "teal-500" },
    { emoji: "😊", text: "nicee", color: "blue-500" },
    { emoji: "🤩", text: "ahhh", color: "violet-900" },
  ];

  return (
    <div className="flex flex-wrap px-2 font-serif w-full justify-between items-center gap-4">
      {emotions.map((emotion) => (
        <div
          key={emotion.emoji}
          className="flex justify-center items-center flex-col"
        >
          <div
            className={`w-8 h-8 rounded-full flex flex-col items-center place-items-center justify-center cursor-pointer transition-all ${
              moodByDay[`${year}-${month + 1}-${selectedDay}`] === emotion.emoji
                ? `bg-teel`
                : `bg-gray-200 `
            }`}
            onClick={() => {
              const newMoodByDay = { ...moodByDay };
              newMoodByDay[`${year}-${month + 1}-${selectedDay}`] =
                emotion.emoji;
              setMoodByDay(newMoodByDay);
              setMood(false);
            }}
          >
            <span className="text-xl">{emotion.emoji}</span>
          </div>
          <span className={`font-bold text-xs text-${emotion.color}`}>
            {emotion.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MoodPicker;
