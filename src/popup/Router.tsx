import React, { useState } from "react";
import Calendar from "./components/Calendar";
import ToDo from "./components/Intentions";
import Analytics from "./components/Analytics";
import { FaCalendarAlt, FaCheck, FaChartBar } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";

const tabs = [
  { name: "Calendar", icon: <FaCalendarAlt />, component: <Calendar /> },
  { name: "To Do List", icon: <FaCheck />, component: <ToDo /> },
  { name: "Analytics", icon: <FaChartBar />, component: <Analytics /> },
];

function Navigation() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex w-full flex-col ">
      <div className="w-full p-4 flex items-center justify-between">
        <h1 className="text-sm font-medium font-serif ">MoodSpace</h1>
        <BsFillGearFill className="text-sm" />
      </div>
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
