import React from "react";
import { doc, setDoc } from "firebase/firestore";

const Signup = ({ user, db, setFirstTime }) => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [reason, setReason] = React.useState("productivity");
  const [otherReason, setOtherReason] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let thereason = reason == "other" ? otherReason : reason;

    try {
      const userData = {
        name,
        age,
        photo: user.photoURL,
        reason: thereason,
      };
      await setDoc(doc(db, "users", user.email), userData);
    } catch (error) {
      console.error("Error writing user data to Firestore:", error);
    } finally {
      setSubmitting(false);
      setFirstTime(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" flex mt-8 gap-2">
        <img src="logo128x128.png" alt="MoodSpace logo" className="w-10 mb-2" />
        <h1 className="text-xl font-serif font-bold">Welcome to MoodSpace</h1>
      </div>
      <form className="flex flex-wrap gap-4 pb-4 px-4" onSubmit={handleSubmit}>
        <div className="w-64 mb-4">
          <label
            className="block w-full text-gray-700 font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className=" w-64 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            First Name
          </label>
          <input
            className="border rounded-md  w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="border rounded-md py-2 px-3 max-w-[100px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="flex w-full  mb-4">
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="reason"
            >
              Reason for using MoodSpace
            </label>
            <select
              className="border min-w-[150px] rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            >
              <option value="productivity">Productivity</option>
              <option value="wellness">Wellness</option>
              <option value="both">Both!</option>
              <option value="other">Other</option>
            </select>
          </div>

          {reason === "other" && (
            <div className="mt-6 ">
              <input
                className="border justify-start rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otherReason"
                type="text"
                placeholder="please share why"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex w-full justify-center">
          <button
            type="submit"
            className="bg-teal-500 w-full hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
