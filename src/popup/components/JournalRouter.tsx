import React, { useState } from "react";
import Journal from "../features/Journal";
import UnlockJournal from "../features/UnlockJournal";

const JournalRouter = ({
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
  access,
  setAccess,
  password,
  setPassword,
  setUsePassword,
  usePassword,
}) => {
  return (
    <div>
      {access ? (
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
          access={access}
          setAccess={setAccess}
          usePassword={usePassword}
        />
      ) : (
        <UnlockJournal
          user={user}
          db={db}
          access={access}
          setAccess={setAccess}
          password={password}
          setPassword={setPassword}
          setUsePassword={setUsePassword}
        />
      )}
    </div>
  );
};

export default JournalRouter;
