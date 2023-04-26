import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Intentions from "./components/Intentions";
import Analytics from "./components/Analytics";
import { FaCalendarAlt, FaCheck, FaChartBar } from "react-icons/fa";
import Header from "./components/Header";

function Navigation({ user, auth, db }) {
  const tabs = [
    {
      name: "Calendar",
      icon: <FaCalendarAlt />,
      component: <Calendar db={db} user={user} />,
    },
    {
      name: "To Do List",
      icon: <FaCheck />,
      component: <Intentions db={db} user={user} />,
    },
    { name: "Analytics", icon: <FaChartBar />, component: <Analytics /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex w-full flex-col ">
      <Header user={user} auth={auth} />
      <hr />
      <div className="flex p-10 min-h-[420px] justify-center">
        {activeTab.component}
      </div>
      <div className="w-full flex  max-h-64 overflow-y-auto  justify-center items-center bg-teel text-white p-2 fixed bottom-0">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center mr-4 ${
              activeTab === tab ? "text-white" : "text-gray-300"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
