import React, { useState, useEffect } from "react";
import Journal from "../features/Journal";
import TodoComp from "../features/TodoComp";
import { format } from "date-fns";

const Intentions = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [journalByDay, setJournalByDay] = useState(
    JSON.parse(localStorage.getItem("journals")) || {}
  );
  const [todosData, setTodosData] = useState(
    JSON.parse(localStorage.getItem("todos")) || {}
  );
  const [showJournal, setShowJournal] = useState(false);

  useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(journalByDay));
  }, [journalByDay]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosData));
  }, [todosData]);

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => {
      const newDay = new Date(prevDay);
      newDay.setDate(newDay.getDate() - 1);
      return newDay;
    });
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) => {
      const newDay = new Date(prevDay);
      newDay.setDate(newDay.getDate() + 1);
      return newDay;
    });
  };

  return (
    <div className="justify-center font-serif w-80">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium font-serif ">
          {showJournal ? "Brain Dump" : "Intentions"}
        </h2>

        <div>
          <button
            className="bg-teel rounded-full px-3 py-1 mr-2 text-white hover:bg-opacity-80 transition-colors"
            onClick={handlePrevDay}
          >
            &lt;
          </button>
          <button
            className="bg-teel rounded-full px-3 py-1 text-white hover:bg-opacity-80 transition-colors"
            onClick={handleNextDay}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className=" flex mt-1 justify-between">
        <h2 className="text-md font-bold text-gray-800 mb-2">
          {format(currentDay, "EEEE, MMMM d, yyyy")}
        </h2>
        <div className="border border-cpink h-8 rounded-lg flex max-w-[150px]">
          <button
            className={`${
              !showJournal ? "bg-cpink text-white" : "bg-white text-cpink"
            } rounded-l-md flex w-full items-center px-2 justify-center transition-colors duration-300`}
            onClick={() => setShowJournal(false)}
          >
            <span>Todos</span>
          </button>
          <button
            className={`${
              showJournal ? "bg-cpink text-white" : "bg-white text-cpink"
            } rounded-r-md flex items-center w-full  px-2 justify-center transition-colors duration-300`}
            onClick={() => setShowJournal(true)}
          >
            <span>Journal</span>
          </button>
        </div>
      </div>
      {showJournal ? (
        <div className="my-4 w-80 ">
          <Journal
            currentDay={currentDay}
            setJournalByDay={setJournalByDay}
            journalByDay={journalByDay}
          />
        </div>
      ) : (
        <div className="my-4 w-80 ">
          <TodoComp
            currentDay={currentDay}
            setTodosData={setTodosData}
            todosData={todosData}
          />
        </div>
      )}
    </div>
  );
};

export default Intentions;
