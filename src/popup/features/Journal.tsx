import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const Journal = ({ currentDay, setJournalByDay, journalByDay }) => {
  const [journalInput, setJournalInput] = useState(
    journalByDay[format(currentDay, "yyyy-MM-dd")]
      ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
      : ""
  );
  const [editmode, seteditmode] = useState(
    journalByDay[format(currentDay, "yyyy-MM-dd")] ? true : false
  );

  useEffect(() => {
    setJournalInput(
      journalByDay[format(currentDay, "yyyy-MM-dd")]
        ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
        : ""
    );
  }, [currentDay]);

  const handleAddEntry = () => {
    setJournalByDay((prevJournals) => ({
      ...prevJournals,
      [format(currentDay, "yyyy-MM-dd")]: {
        id: uuidv4(),
        title: "",
        content: "",
      },
    }));
  };

  const handleJournalInputChange = (e) => {
    setJournalInput(e.target.value);
  };

  const handleSaveEntry = () => {
    setJournalByDay((prevJournals) => ({
      ...prevJournals,
      [format(currentDay, "yyyy-MM-dd")]: {
        title: format(currentDay, "EEEE, MMMM d, yyyy"),
        content: journalInput,
      },
    }));
  };

  const getJournalByDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (journalByDay[formattedDate]) {
      return journalByDay[formattedDate];
    }
  };
  return (
    <div>
      <div>
        <textarea
          className="shadow appearance-none border border-gray-200 min-h-[175px] text-left rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="journal-input"
          placeholder="Write your journal here...
This can be a daily reflection, summary of your day, or any thoughts you just want to note down :)"
          onChange={(e) => handleJournalInputChange(e)}
          value={journalInput}
        />
        <button
          className={`${
            journalByDay[format(currentDay, "yyyy-MM-dd")]
              ? journalByDay[format(currentDay, "yyyy-MM-dd")].content ==
                journalInput
                ? "bg-cpink"
                : "bg-red-400"
              : journalInput == ""
              ? "bg-cpink"
              : "bg-red-400"
          } hover:bg-red-200 text-white mt-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
          onClick={handleSaveEntry}
        >
          Save Journal
        </button>
      </div>
    </div>
  );
};

const JournalEntry = ({ entry }) => {
  return (
    <div className="journal-entry">
      <p>{entry.content}</p>
    </div>
  );
};

export default Journal;