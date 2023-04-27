import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Intentions from "./components/Intentions";
import Analytics from "./components/Analytics";
import Accountability from "./components/Accountability";
import { FaCalendarAlt, FaCheck, FaChartBar } from "react-icons/fa";
import Header from "./components/Header";
import { BsPerson } from "react-icons/bs";

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
    {
      name: "Analytics",
      icon: <FaChartBar />,
      component: <Analytics db={db} user={user} />,
    },
    {
      name: "Accountability",
      icon: <BsPerson />,
      component: <Accountability db={db} user={user} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex w-full flex-col ">
      <Header user={user} auth={auth} />
      <hr />
      <div className="flex p-10 min-h-[450px]">{activeTab.component}</div>
      <div className="w-full flex overflow-y-auto  justify-center items-center bg-teel text-white p-2 fixed bottom-0">
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
