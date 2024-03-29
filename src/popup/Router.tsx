import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Intentions from "./components/Intentions";
import Analytics from "./components/Analytics";
import Accountability from "./components/Accountability";
import { FaCalendarAlt, FaCheck, FaChartBar, FaCoffee } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import Header from "./components/Header";
import { BsPerson } from "react-icons/bs";
import Coach from "./ai/Coach";

function Navigation({ user, auth, db }) {
  const [usePassword, setUsePassword] = useState(true);

  const tabs = [
    {
      name: "Calendar",
      icon: <FaCalendarAlt />,
      component: <Calendar db={db} user={user} />,
    },
    {
      name: "Reflect",
      icon: <FaCheck />,
      component: (
        <Intentions
          db={db}
          user={user}
          usePassword={usePassword}
          setUsePassword={setUsePassword}
        />
      ),
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
      component: <Analytics db={db} user={user} />,
    },
    {
      name: "Coach",
      icon: <CgGym />,
      component: <Coach db={db} user={user} />,
    },
    // {
    //   name: "Accountability",
    //   icon: <BsPerson />,
    //   component: <Accountability db={db} user={user} />,
    // },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex w-full flex-col overflow-scroll h-[600px]">
      <Header
        user={user}
        auth={auth}
        db={db}
        usePassword={usePassword}
        setUsePassword={setUsePassword}
      />
      <hr />
      <div className="flex p-8 min-h-[450px]">{activeTab.component}</div>
      <div className="w-full flex overflow-y-auto  justify-center items-center bg-teel text-white p-2 fixed bottom-0">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center mr-4 ${
              activeTab.name === tab.name ? "text-white" : "text-gray-300"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.buymeacoffee.com/vinaya"
          className={`flex  flex-col items-center mr-4 hover:text-white
          text-gray-300
            `}
        >
          <FaCoffee />
          <span>Coffee</span>
        </a>
      </div>
    </div>
  );
}

export default Navigation;
