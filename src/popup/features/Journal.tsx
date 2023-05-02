import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, writeBatch, getDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const Journal = ({
  currentDay,
  setJournalByDay,
  journalByDay,
  user,
  db,
  selectedMember,
  setSelectedMember,
  code,
  setCode,
  members,
  setMembers,
  groupExists,
  setGroupExists,
  loading,
  journalInput,
  setJournalInput,
  setLoading,
  getjournaldata,
}) => {
  const selectRef = useRef(null);
  const [loadingnow, setloadingnow] = useState(false);

  interface JournalEntry {
    title: string;
    content: string;
  }

  useEffect(() => {
    setJournalInput(
      journalByDay[format(currentDay, "yyyy-MM-dd")]
        ? journalByDay[format(currentDay, "yyyy-MM-dd")].content
        : ""
    );
  }, [currentDay]);

  const handleJournalInputChange = (e) => {
    setJournalInput(e.target.value);
  };

  useEffect(() => {
    setSelectedMember(user.email);
  }, []);

  const handleSaveEntry = async () => {
    setloadingnow(true);
    const encryptedJournalByDay: { [key: string]: JournalEntry } = {};

    // Loop through each journal entry and encrypt the content
    for (const [date, entry] of Object.entries<JournalEntry>(journalByDay)) {
      const encryptedContent = CryptoJS.AES.encrypt(
        entry.content,
        "helloisthisagoodkey"
      ).toString();

      encryptedJournalByDay[date] = {
        ...entry,
        content: encryptedContent,
      };
    }

    // Add or overwrite the new journal entry
    const newJournal: { [key: string]: JournalEntry } = {
      ...encryptedJournalByDay,
      [format(currentDay, "yyyy-MM-dd")]: {
        title: format(currentDay, "EEEE, MMMM d, yyyy"),
        content: CryptoJS.AES.encrypt(
          journalInput,
          "helloisthisagoodkey"
        ).toString(),
      },
    };

    const batch = writeBatch(db);

    Object.keys(newJournal).forEach((date) => {
      const journalRef = doc(db, "users", user.email, "journals", date);
      batch.set(journalRef, { ...newJournal[date] });
    });

    await batch.commit();
    getjournaldata();
    setloadingnow(false);
  };

  return (
    <div className="pb-14 pt-[.3px]">
      {code && groupExists && (
        <div>
          <div className="flex items-center  my-2">
            <label htmlFor="group-member-select" className="w-32 mr-2">
              Intentions for:
            </label>
            <select
              id="group-member-select"
              ref={selectRef}
              onChange={(e) => {
                setSelectedMember(e.target.value);
                console.log("changeddd member");
              }}
              className="p-2 w-full rounded border border-gray-200 outline-none"
            >
              <option value={user.email}>meee!</option>
              {members.map((member) => {
                if (member.showJournals) {
                  return (
                    <option key={member.email} value={member.email}>
                      {member.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <hr className="py-2" />
        </div>
      )}
      <div>
        <textarea
          disabled={selectedMember != user.email}
          className="py-4 shadow appearance-none border border-gray-200 min-h-[250px] text-left rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="journal-input"
          placeholder={
            selectedMember == user.email
              ? `Write your journal here...\n\nThis can be a daily reflection, summary of your day, or any thoughts you just want to note down :)`
              : `\nNo journal written yet. Remind your friends to take a second to reflect. 🧘‍♀️`
          }
          onChange={(e) => handleJournalInputChange(e)}
          value={
            !loadingnow ||
            journalByDay[format(currentDay, "yyyy-MM-dd")]?.content ==
              journalInput
              ? journalInput
              : "saving..."
          }
        />
      </div>
      <div>
        {selectedMember == user.email && (
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
        )}
      </div>
    </div>
  );
};

export default Journal;
