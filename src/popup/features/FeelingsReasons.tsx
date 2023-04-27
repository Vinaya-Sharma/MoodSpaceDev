import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const FeelingsReasons = ({
  selectedDay,
  setMood,
  year,
  month,
  setSelectedDay,
  user,
  db,
}) => {
  const [reasonsData, setReasonsData] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const gettingData = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().moodReasons;
      console.log("Document data:", data);
      if (data) {
        setReasonsData(data);
        console.log(data[`${year}-${month + 1}-${selectedDay}`]);
        console.log(year, month, selectedDay);
        setSelectedReasons(
          data[`${year}-${month + 1}-${selectedDay}`]
            ? data[`${year}-${month + 1}-${selectedDay}`]
            : []
        );
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // Load reasons from local storage on mount
  useEffect(() => {
    gettingData();
  }, []);

  //   useEffect(() => {
  //     setMood(true);
  //   }, [selectedDay]);

  const reasons = [
    "Food",
    "Sleep",
    "Exercise",
    "Family",
    "Partner",
    "Social Media",
    "Friends",
    "Events",
    "School",
    "Work",
    "Money",
    "Pets",
    "Hobbies",
    "Music",
  ];

  const handleReasonClick = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 font-serif">
      <h3 className="text-[16px] mb-4 font-bold">
        What made you feel this way
      </h3>
      <div className="flex flex-wrap justify-center">
        {reasons.map((reason) => (
          <button
            key={reason}
            className={`w-auto justify-center h-6 m-1 py-1 px-2 text-xs rounded-full ${
              selectedReasons.includes(reason)
                ? "bg-teel text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleReasonClick(reason)}
          >
            {reason}
          </button>
        ))}
      </div>
      <div className="flex place-items-center justify-between mt-4">
        <FaArrowLeft
          className="text-teel hover:text-teal-600 text-lg "
          onClick={() => {
            setMood(true);
          }}
        />
        <button
          className="bg-teel hover:bg-teal-600 text-white py-2 px-4 rounded-lg"
          onClick={() => {
            const newReasons = { ...reasonsData };
            newReasons[`${year}-${month + 1}-${selectedDay}`] = selectedReasons;
            // localStorage.setItem("moodReasons", JSON.stringify(newReasons));
            const userRef = doc(db, "users", user.email);
            setDoc(userRef, { moodReasons: newReasons }, { merge: true });
            setSelectedDay(null);
            setMood(true);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FeelingsReasons;
