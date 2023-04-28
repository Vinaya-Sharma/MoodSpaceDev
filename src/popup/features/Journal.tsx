import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, writeBatch } from "firebase/firestore";

const Journal = ({ currentDay, setJournalByDay, journalByDay, user, db }) => {
  console.log("data here is", journalByDay);
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

  useEffect(() => {
    const saveJournalEntry = async () => {
      const newJournal = {
        ...journalByDay,
        [format(currentDay, "yyyy-MM-dd")]: {
          title: format(currentDay, "EEEE, MMMM d, yyyy"),
          content: journalInput,
        },
      };
      setJournalByDay(newJournal);

      console.log(journalByDay);
      const batch = writeBatch(db);

      Object.keys(newJournal).forEach((date) => {
        const journalRef = doc(db, "users", user.email, "journals", date);
        batch.set(journalRef, { ...newJournal[date] });
      });

      await batch.commit();
      console.log("Journals written successfully");
    };
    saveJournalEntry();
  }, [journalInput]);

  // setting journals
  const writejournalstodatabase = async () => {
    console.log("running..");
    try {
      const batch = writeBatch(db);
      Object.keys(journalByDay).forEach((date) => {
        const journalref = doc(db, "users", user.email, "journals", date);
        batch.set(journalref, { journal: journalByDay[date] });
      });
      await batch.commit();
      console.log("Documents written successfully");
    } catch (e) {
      console.error("Error adding documents: ", e);
    }
  };

  const getJournalByDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (journalByDay[formattedDate]) {
      return journalByDay[formattedDate];
    }
  };

  return (
    <div className="pb-14">
      <div>
        <textarea
          className="shadow appearance-none border border-gray-200 min-h-[300px] text-left rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="journal-input"
          placeholder="Write your journal here...
This can be a daily reflection, summary of your day, or any thoughts you just want to note down :)"
          onChange={(e) => handleJournalInputChange(e)}
          value={journalInput}
        />
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
