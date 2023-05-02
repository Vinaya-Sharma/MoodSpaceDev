import React, { useState, useEffect, useRef } from "react";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { BsArrowLeft } from "react-icons/bs";

const AccountabilityPopup = ({ db, user, setShowPopup }) => {
  const [code, setCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [groupExists, setGroupExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [canEditTodos, setCanEditTodos] = useState(false);
  const [canEditJournals, setCanEditJournals] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  const [showJournals, setShowJournals] = useState(false);

  const fetchGroup = async () => {
    const userDocRef = doc(db, "users", user.email);
    const userDoc = await getDoc(userDocRef);
    let membersnames = [];

    if (userDoc.exists()) {
      const groupCode = userDoc.data().group;
      setShowTodos(userDoc.data().shareTodos);
      setShowJournals(userDoc.data().shareJournals);

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
              const memberphoto = userDoc.data().photo;
              membersnames.push({
                name: membername,
                email: mem,
                photo: memberphoto,
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

  const handleLeaveGroup = async () => {
    try {
      // Remove user from the group's members list
      const groupDocRef = doc(db, "groups", code);
      const groupDoc = await getDoc(groupDocRef);
      if (groupDoc.exists() && members.length > 0) {
        const members = groupDoc
          .data()
          .members.filter((member) => member !== user.email);
        await updateDoc(groupDocRef, { members });

        // Remove group from the user's document
        const userDocRef = doc(db, "users", user.email);
        await updateDoc(userDocRef, { group: null });
      } else {
        // Delete the group doc if it's empty
        await deleteDoc(groupDocRef);
      }

      // Clear state
      setMembers([]);
      setGroupExists(false);
      setCode("");
    } catch (error) {
      console.log("Error leaving group:", error);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [db, user]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleCreateGroup = async () => {
    const groupsRef = collection(db, "groups");
    const code = generateCode();
    await setDoc(doc(groupsRef, code), {
      groupName,
      createdAt: serverTimestamp(),
      members: [user.email],
    });

    // Update user profile
    const userDocRef = doc(db, "users", user.email);
    await updateDoc(userDocRef, {
      group: code,
    });

    setCode(code);
    setGroupExists(true);
  };

  const handleJoinGroup = async () => {
    const groupsRef = collection(db, "groups");
    const groupDoc = await getDoc(doc(groupsRef, code));
    if (groupDoc.exists()) {
      await updateDoc(doc(groupsRef, code), {
        members: arrayUnion(user.email),
      });
      setGroupExists(true);
      // Update user profile
      const userDocRef = doc(db, "users", user.email);
      await updateDoc(userDocRef, {
        group: code,
      });
      fetchGroup();
    } else {
      setError("Invalid code, please try again.");
    }
  };

  const updateShowTodos = async (checked) => {
    const userDocRef = doc(db, "users", user.email);
    await updateDoc(userDocRef, {
      shareTodos: checked,
    });
    fetchGroup();
  };

  const updateShowJournals = async (checked) => {
    const userDocRef = doc(db, "users", user.email);
    await updateDoc(userDocRef, {
      shareJournals: checked,
    });
    fetchGroup();
  };

  const generateCode = () => {
    let code = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 6;
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
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
      <div className="bg-white w-[350px] h-auto rounded-lg pt-4 px-4 flex  ">
        <div className="flex w-80 mt-2 h-full items-center pb-8 flex-col gap-4 ">
          <h2 className="text-2xl flex flex-col font-medium font-serif flex-start justify-start w-full text-left">
            Accountabilibuddies!
            <span className="text-sm font-bold">
              Join one to hold your friends accountable
            </span>
          </h2>
          {/* <img src={user.photoURL} /> */}
          {!groupExists ? (
            <div className="flex flex-col">
              <div>
                <h1 className="text-md mb-6">
                  Enter a name to create, or enter a code to join a group
                </h1>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={groupName}
                      onChange={handleGroupNameChange}
                      placeholder="Group Name"
                      className="flex-grow px-4 py-2 w-full text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:border-cpink"
                    />
                    <button
                      onClick={handleCreateGroup}
                      disabled={!groupName}
                      className={`${
                        groupName ? "bg-red-400" : "bg-cpink"
                      } hover:bg-cpink px-4 rounded-lg py-2 w-52 font-medium text-white `}
                    >
                      Create Group
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={code}
                      onChange={handleCodeChange}
                      placeholder="Enter Code"
                      className="flex-grow px-4 py-2 w-full text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:border-cpink"
                    />
                    <button
                      onClick={handleJoinGroup}
                      disabled={!code}
                      className={`${
                        code ? "bg-red-400" : "bg-cpink"
                      } hover:bg-cpink px-4 rounded-lg py-2 w-52  font-medium text-white `}
                    >
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" px-4">
              <div className="flex items-center gap-2">
                <p className="text-md font-medium mb-2">Group Code:</p>
                <input
                  type="text"
                  value={code}
                  readOnly
                  className="bg-gray-100  px-3 py-2 rounded-md mb-2"
                />
              </div>
              <p className="text-xs text-gray-500 mb-4">
                ^Share this code with others to join the group.
              </p>
              <div className="flex py-2 gap-2">
                <label htmlFor="todo">Share my to-dos</label>
                <input
                  onChange={(e) => {
                    const checked = e.target.checked;
                    updateShowTodos(checked);
                  }}
                  type="checkbox"
                  name="todo"
                  value="todo"
                  checked={showTodos}
                />

                <label htmlFor="journal">Share my journals</label>
                <input
                  onChange={(e) => {
                    const checked = e.target.checked;
                    updateShowJournals(checked);
                  }}
                  type="checkbox"
                  name="journal"
                  value="journal"
                  checked={showJournals}
                />
              </div>

              {!members.length ? (
                <p className="text-md text-teal-500 font-medium mb-4">
                  Waiting for members to join...
                </p>
              ) : (
                <div>
                  <p className="text-md flex gap-4 font-medium mb-2">
                    Members:
                  </p>
                  <div className="flex w-[320px] justify-center flex-row overflow-scroll gap-4">
                    <div
                      className="flex flex-col items-center justify-center"
                      key="me"
                    >
                      <img
                        className="w-12 h-12 rounded-full "
                        src={user.photoURL}
                      />
                      <p className="text-sm text-center text-gray-500 mb-1">
                        meee!!
                      </p>
                    </div>
                    {members.map((member) => (
                      <div
                        className="flex flex-col items-center justify-center"
                        key={member.email}
                      >
                        <img
                          className="w-12 h-12 rounded-full "
                          src={member.photo}
                        />
                        <p
                          key={member.email}
                          className="text-sm text-center text-gray-500 mb-1"
                        >
                          {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && <p className="text-red-500">{error}</p>}
            </div>
          )}

          {groupExists && (
            <button
              onClick={handleLeaveGroup}
              className="place-self-start flex items-center gap-2  bg-red-500 text-white rounded p-2"
            >
              <span>
                <BsArrowLeft />
              </span>
              Leave Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountabilityPopup;
