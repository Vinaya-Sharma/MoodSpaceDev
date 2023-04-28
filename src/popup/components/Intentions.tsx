import React, { useState, useEffect } from "react";
import Journal from "../features/Journal";
import TodoComp from "../features/TodoComp";
import { format } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

const Intentions = ({ db, user }) => {
  const [currentDay, setCurrentDay] = useState(new Date());

  // getting journals + todos
  const [journalByDay, setJournalByDay] = useState({});
  const [todosData, setTodosData] = useState({});
  const [showJournal, setShowJournal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(user.email);

  const gettododata = async () => {
    const todosref = collection(db, "users", selectedMember, "todos");
    const unsubscribe = onSnapshot(todosref, (querySnapshot) => {
      const todosbyday = {};
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const mood = doc.data().date;
        todosbyday[date] = mood;
      });
      console.log(todosbyday);
      setTodosData(todosbyday);
    });
    return unsubscribe;
  };

  // getting journal
  useEffect(() => {
    getjournaldata();
    gettododata();
    console.log("change");
  }, [selectedMember]);

  const getjournaldata = async () => {
    const journalsbydayjournalref = collection(
      db,
      "users",
      user.email,
      "journals"
    );
    const unsubscribe = onSnapshot(journalsbydayjournalref, (querySnapshot) => {
      const journalsbyday = {};
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const journal = doc.data();
        console.log("journal", journal);
        journalsbyday[date] = journal;
      });
      setJournalByDay(journalsbyday);
      console.log("journlas by day", journalByDay);
    });
    return unsubscribe;
  };

  //setting todos
  const writetodostodatabase = async () => {
    try {
      const batch = writeBatch(db);
      Object.keys(todosData).forEach((date) => {
        const todosref = doc(db, "users", user.email, "todos", date);
        console.log(date);
        batch.set(todosref, { date: todosData[date] });
      });

      await batch.commit();
      console.log("Documents written successfully");
    } catch (e) {
      console.error("Error adding documents: ", e);
    }
  };

  useEffect(() => {
    selectedMember == user.email && writetodostodatabase();
  }, [todosData]);

  // getting journals
  useEffect(() => {
    const journaldayref = collection(db, "users", user.email, "journals");
    const unsubscribe = onSnapshot(journaldayref, (querySnapshot) => {
      const journalsbyday = {};
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const journal = doc.data();
        journalsbyday[date] = journal;
      });
      console.log(journalsbyday);
      setJournalByDay(journalsbyday);
    });
    return unsubscribe;
  }, [user, db]);

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
    <div className="justify-center font-serif pb-4 w-80 h-[475px]">
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
            user={user}
            db={db}
          />
        </div>
      ) : (
        <div className="my-4 w-80 ">
          <TodoComp
            currentDay={currentDay}
            setTodosData={setTodosData}
            todosData={todosData}
            user={user}
            db={db}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
        </div>
      )}
    </div>
  );
};

export default Intentions;
