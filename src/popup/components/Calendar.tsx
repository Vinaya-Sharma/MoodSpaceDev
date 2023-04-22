import React, { useState, useEffect } from "react";
import CalendarComp from "../features/Calendar.Comp";

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [moodByDay, setMoodByDay] = useState({});

  // Load mood data from local storage on mount
  useEffect(() => {
    const savedMoodByDay = JSON.parse(localStorage.getItem("moodByDay"));
    if (savedMoodByDay) {
      setMoodByDay(savedMoodByDay);
    }
  }, []);

  // Save mood data to local storage on each update
  useEffect(() => {
    localStorage.setItem("moodByDay", JSON.stringify(moodByDay));
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
    <div className="justify-center w-80 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium font-serif text-teal">
          {new Date(year, month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>

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
      />
    </div>
  );
};

export default Calendar;
