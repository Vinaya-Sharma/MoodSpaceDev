import React, { useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import AccountabilityPopup from "../features/AccountabilityPopup";
import ExportPopup from "../features/ExportPopup";

function Header({ user, auth, db }) {
  const [showSettings, setShowSettings] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleLogout = () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        chrome.identity.removeCachedAuthToken({ token: token }, () => {
          auth
            .signOut()
            .then(() => {
              console.log("User signed out successfully");
            })
            .catch((error) => {
              console.error("Error signing out: ", error);
            });
        });
      } else {
        auth
          .signOut()
          .then(() => {
            console.log("User signed out successfully");
          })
          .catch((error) => {
            console.error("Error signing out: ", error);
          });
      }
    });
  };

  return (
    <div className="w-full p-4 flex items-center justify-between">
      <h1 className="text-sm font-medium font-serif ">MoodSpace</h1>
      <div className="relative mr-4">
        <BsFillGearFill
          className="text-sm cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        />
        {showSettings && (
          <div className="absolute right-2 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
            <div className="px-4 py-2 font-medium text-gray-800">
              Signed in as: {user.email}
            </div>
            <div
              onClick={() => {
                setShowPopup(true);
                setShowSettings(false);
              }}
              className="hover:text-teel cursor-pointer px-4 py-2 font-medium text-gray-800"
            >
              Accountability Groups
            </div>
            <div
              onClick={() => {
                setShowExport(true);
                setShowSettings(false);
              }}
              className="hover:text-teel cursor-pointer px-4 py-2 font-medium text-gray-800"
            >
              Export Data
            </div>
            <div className="py-2 border-t border-gray-300">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {showPopup && (
        <AccountabilityPopup user={user} db={db} setShowPopup={setShowPopup} />
      )}
      {showExport && (
        <ExportPopup user={user} db={db} setShowPopup={setShowExport} />
      )}
    </div>
  );
}

export default Header;
