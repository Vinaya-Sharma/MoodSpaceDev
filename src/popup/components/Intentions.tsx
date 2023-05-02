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
import CryptoJS from "crypto-js";

const Intentions = ({ db, user }) => {
  const [currentDay, setCurrentDay] = useState(new Date());

  // getting journals + todos
  const [journalByDay, setJournalByDay] = useState({});
  const [todosData, setTodosData] = useState({});
  const [showJournal, setShowJournal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(user.email);
  const [code, setCode] = useState("");
  const [members, setMembers] = useState([]);
  const [groupExists, setGroupExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [journalInput, setJournalInput] = useState(
    journalByDay[format(currentDay, "yyyy-MM-dd")]
      ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
      : ""
  );

  useEffect(() => {
    setJournalInput(
      journalByDay[format(currentDay, "yyyy-MM-dd")]
        ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
        : ""
    );
  }, [currentDay]);

  const fetchGroup = async () => {
    const userDocRef = doc(db, "users", user.email);
    const userDoc = await getDoc(userDocRef);
    let membersnames = [];

    if (userDoc.exists()) {
      const groupCode = userDoc.data().group;

      if (groupCode) {
        setCode(groupCode);
        setGroupExists(true);

        const groupDocRef = doc(db, "groups", groupCode);
        const groupDoc = await getDoc(groupDocRef);
        if (groupDoc.exists()) {
          const members = groupDoc
            .data()
            .members.filter((member) => member !== user.email);

          for (const mem of members) {
            const userDocRef = doc(db, "users", mem);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const membername = userDoc.data().name;
              const showTodos = userDoc.data().shareTodos;
              const showJournals = userDoc.data().shareJournals;
              membersnames.push({
                name: membername,
                email: mem,
                showTodos: showTodos,
                showJournals: showJournals,
              });
            } else {
              console.log("error finding member");
            }
          }

          setMembers(membersnames);
          setLoading(false);
        }
      }
    }
  };
  useEffect(() => {
    fetchGroup();
  }, []);

  const gettododata = async () => {
    console.log("eunning");
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
    console.log("changed to", selectedMember);
  }, [selectedMember]);

  const getjournaldata = async () => {
    console.log("running get journal data");
    const journalsbydayjournalref = collection(
      db,
      "users",
      selectedMember,
      "journals"
    );
    const unsubscribe = onSnapshot(journalsbydayjournalref, (querySnapshot) => {
      const journalsbyday = {};
      querySnapshot.forEach((doc) => {
        const date = doc.id;
        const bytes = CryptoJS.AES.decrypt(
          doc.data().content,
          "helloisthisagoodkey"
        );
        const decryptedPlaintext = bytes.toString(CryptoJS.enc.Utf8);
        const journal = {
          title: doc.data().title,
          content: decryptedPlaintext,
        };
        console.log("journal", journal);
        journalsbyday[date] = journal;
      });
      setJournalByDay(journalsbyday);
      console.log("journlas by day", journalByDay);
      const input = journalsbyday[format(currentDay, "yyyy-MM-dd")]
        ? journalsbyday[format(currentDay, "yyyy-MM-dd")].content
        : "";
      setJournalInput(input);
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

  // useEffect(() => {
  //   if (selectedMember == user.email) {
  //     const journaldayref = collection(db, "users", user.email, "journals");
  //     const unsubscribe = onSnapshot(journaldayref, (querySnapshot) => {
  //       const journalsbyday = {};
  //       querySnapshot.forEach((doc) => {
  //         const date = doc.id;
  //         const journal = doc.data();
  //         journalsbyday[date] = journal;
  //       });
  //       console.log(journalsbyday);
  //       setJournalByDay(journalsbyday);
  //     });
  //     return unsubscribe;
  //   }
  // }, [user, db]);

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => {
      const newDay = new Date(prevDay);
      newDay.setDate(newDay.getDate() - 1);
      return newDay;
    });
    setJournalInput(
      journalByDay[format(currentDay, "yyyy-MM-dd")]
        ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
        : ""
    );
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) => {
      const newDay = new Date(prevDay);
      newDay.setDate(newDay.getDate() + 1);
      return newDay;
    });
    setJournalInput(
      journalByDay[format(currentDay, "yyyy-MM-dd")]
        ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
        : ""
    );
  };

  return (
    <div className="justify-center font-serif pb-4 w-80 h-[475px]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium font-serif ">
          {showJournal ? "Brain Dump" : "To-dos"}
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
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            code={code}
            setCode={setCode}
            members={members}
            setMembers={setMembers}
            groupExists={groupExists}
            setGroupExists={setGroupExists}
            loading={loading}
            setLoading={setLoading}
            journalInput={journalInput}
            setJournalInput={setJournalInput}
            getjournaldata={getjournaldata}
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
            code={code}
            setCode={setCode}
            members={members}
            setMembers={setMembers}
            groupExists={groupExists}
            setGroupExists={setGroupExists}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Intentions;
