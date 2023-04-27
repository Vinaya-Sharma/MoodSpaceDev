import React from "react";
import Navigation from "./Router";
import FirebaseApp from "./firebaseApp";

function Popup() {
  return (
    <div className="w-96 max-w-96 overflow-scroll flex">
      <FirebaseApp />
    </div>
  );
}

export default Popup;
