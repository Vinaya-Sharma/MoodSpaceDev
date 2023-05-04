import React, { useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { BsDownload } from "react-icons/bs";

const ExportData = ({ db, user, setShowPopup }) => {
  const [exportData, setExportData] = useState("");

  const exportUserData = async () => {
    const todosCollection = collection(db, "users", user.email, "todos");
    const moodByDayDoc = collection(db, "users", user.email, "moodByDay");
    const journalsCollection = collection(db, "users", user.email, "journals");
    const moodReasonsDocRef = doc(db, "users", user.email);

    const [todos, moodByDay, journals, moodReasons] = await Promise.all([
      getDocs(todosCollection),
      getDocs(moodByDayDoc),
      getDocs(journalsCollection),
      getDoc(moodReasonsDocRef),
    ]);

    const data = {
      todos: todos.docs.map((doc) => doc.data()),
      moodByDay: moodByDay.docs.reduce((acc, doc) => {
        const date = doc.id;
        acc[date] = doc.data();
        return acc;
      }, {}),
      journals: journals.docs.reduce((acc, doc) => {
        const date = doc.id;
        acc[date] = doc.data();
        return acc;
      }, {}),
      moodReasons: moodReasons.data().moodReasons,
    };

    // Convert JSON data to CSV format
    let csvData = "";

    // Add todos to CSV
    if (Object.keys(data.todos).length > 0) {
      csvData += "Todos\n";
      csvData += "Date,Text\n";
      Object.keys(data.todos).forEach((date) => {
        const todo = data.todos[date];
        todo.date.forEach((todoDate) => {
          csvData += `${todoDate.date},${todoDate.text}\n`;
        });
      });
      csvData += "\n";
    }

    // Add moodByDay to CSV
    if (Object.keys(data.moodByDay).length > 0) {
      csvData += "Mood By Day\n";
      csvData += "Date, Emoji\n";
      Object.keys(data.moodByDay).forEach((date) => {
        const mood = data.moodByDay[date];
        csvData += `${date},${mood.emoji}\n`;
      });
      csvData += "\n";
    }

    // Add journals to CSV
    if (Object.keys(data.journals).length > 0) {
      csvData += "Journals\n";
      csvData += "Date,Content\n";
      Object.keys(data.journals).forEach((date) => {
        const journal = data.journals[date];
        csvData += `${date},${journal.content}\n`;
      });
      csvData += "\n";
    }

    // Add moodReasons to CSV
    if (data.moodReasons) {
      csvData += "Mood Reasons\n";
      csvData += "Date,Reasons\n";
      Object.keys(data.moodReasons).forEach((date) => {
        csvData += `${date},"${data.moodReasons[date].join(", ")}"\n`;
      });
      csvData += "\n";
    }

    const dataUri =
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);

    setExportData(dataUri);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setShowPopup(false);
        }
      }}
    >
      <div className="bg-white w-auto h-auto rounded-lg pt-4 px-4 flex">
        <div className="flex w-60 mt-2 h-full items-center pb-8 flex-col gap-4">
          <div className="flex justify-center items-center gap-4">
            <button
              className="flex items-center justify-center gap-4 "
              onClick={exportUserData}
            >
              <BsDownload />
              Prepare Data for Export
            </button>
          </div>
          {exportData && (
            <a
              className="bg-teel rounded-md text-white p-2 "
              href={exportData}
              download="myData.csv"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportData;
