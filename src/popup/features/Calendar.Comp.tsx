import React, { useState } from "react";
import MoodPicker from "./MoodPicker";
import FeelingsReasons from "./FeelingsReasons";

const CalendarComp = ({ year, month, moodByDay, setMoodByDay, db, user }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mood, setMood] = useState(true);
  const today = new Date();

  const emotions = [
    { emoji: "🤩", text: "ahhh", color: "violet-300" },
    { emoji: "😊", text: "nicee", color: "blue-300" },
    { emoji: "😐", text: "okey", color: "teal-300" },
    { emoji: "😔", text: "bummy", color: "orange-300" },
    { emoji: "😣", text: "rotten", color: "red-300" },
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const isCurrentDay = (day) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const getEmojiForDay = (day) => {
    if (moodByDay.hasOwnProperty(`${year}-${month + 1}-${day}`)) {
      const emoji = moodByDay[`${year}-${month + 1}-${day}`];
      const emotion = emotions.find((e) => e.emoji === emoji);
      return (
        <div
          className={`w-6 h-6 rounded-full bg-${emotion.color} flex items-center justify-center text-xl`}
          style={{ cursor: "pointer" }}
        >
          {moodByDay[`${year}-${month + 1}-${day}`]}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid w-80 grid-cols-7 gap-4 text-center">
      {weekdays.map((day) => (
        <div key={day} className="text-gray-700 font-medium">
          {day}
        </div>
      ))}
      {Array.from({ length: firstDayOfMonth }, (_, i) => (
        <div key={`pre_${i}`} className="text-gray-300">
          {""}
        </div>
      ))}

      {days.map((day) => (
        <div
          key={day}
          className={`flex items-center justify-center ${
            selectedDay === day ? "bg-gray-200" : ""
          }`}
          onClick={() => handleDayClick(day)}
          style={{ cursor: "pointer" }}
        >
          {getEmojiForDay(day) || (
            <div
              className={`w-6 h-6 rounded-full ${
                isCurrentDay(day) ? "bg-teel" : "bg-gray-300"
              } `}
              onClick={() => setSelectedDay(day)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      ))}
      {selectedDay !== null && (
        <div
          key={`popup_${selectedDay}`}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDay(null);
            }
          }}
        >
          <div className="bg-white rounded-lg w-80 p-4 flex flex-col">
            {mood ? (
              isCurrentDay(selectedDay) ? (
                <MoodPicker
                  year={year}
                  month={month}
                  moodByDay={moodByDay}
                  setMoodByDay={setMoodByDay}
                  selectedDay={selectedDay}
                  setMood={setMood}
                />
              ) : (
                <div>
                  {" "}
                  <h1 className="font-bold">
                    Oopsie! Looks like you're a time traveler. 🪄
                  </h1>
                  <h1 className="underline">
                    {`You can't track your mood for a day ${
                      year < today.getFullYear() ||
                      month < today.getMonth() ||
                      selectedDay < today.getDate()
                        ? "from the past!"
                        : "that hasn't happened yet!"
                    }
                      `}
                  </h1>
                  <h1 className="mt-2">
                    Come back tomorrow and don't miss a day, I want to hear all
                    about how you're feeling! 🚀🕰️👋
                  </h1>
                </div>
              )
            ) : (
              <FeelingsReasons
                selectedDay={selectedDay}
                setMood={setMood}
                year={year}
                month={month}
                setSelectedDay={setSelectedDay}
                user={user}
                db={db}
              />
            )}
          </div>
          <span className="bg-red-300"></span>
          <span className="bg-orange-300"> </span>
          <span className="bg-green-300"> </span>
          <span className="bg-teal-300"> </span>
          <span className="bg-blue-300"> </span>
          <span className="bg-violet-300"> </span>
        </div>
      )}
    </div>
  );
};

export default CalendarComp;
