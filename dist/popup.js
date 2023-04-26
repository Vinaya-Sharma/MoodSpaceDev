/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/Popup.tsx":
/*!*****************************!*\
  !*** ./src/popup/Popup.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _firebaseApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firebaseApp */ "./src/popup/firebaseApp.tsx");


function Popup() {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-96 min-h-[400px] max-w-96 overflow-scroll flex" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_firebaseApp__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);


/***/ }),

/***/ "./src/popup/Router.tsx":
/*!******************************!*\
  !*** ./src/popup/Router.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Calendar */ "./src/popup/components/Calendar.tsx");
/* harmony import */ var _components_Intentions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Intentions */ "./src/popup/components/Intentions.tsx");
/* harmony import */ var _components_Analytics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Analytics */ "./src/popup/components/Analytics.tsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Header */ "./src/popup/components/Header.tsx");






function Navigation({ user, auth, db }) {
    const tabs = [
        {
            name: "Calendar",
            icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaCalendarAlt, null),
            component: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"], { db: db, user: user }),
        },
        {
            name: "To Do List",
            icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaCheck, null),
            component: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Intentions__WEBPACK_IMPORTED_MODULE_2__["default"], { db: db, user: user }),
        },
        { name: "Analytics", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaChartBar, null), component: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Analytics__WEBPACK_IMPORTED_MODULE_3__["default"], null) },
    ];
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(tabs[0]);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex w-full flex-col " },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"], { user: user, auth: auth }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex p-10 min-h-[420px] justify-center" }, activeTab.component),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-full flex  max-h-64 overflow-y-auto  justify-center items-center bg-teel text-white p-2 fixed bottom-0" }, tabs.map((tab) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { key: tab.name, className: `flex flex-col items-center mr-4 ${activeTab === tab ? "text-white" : "text-gray-300"}`, onClick: () => handleTabClick(tab) },
            tab.icon,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, tab.name)))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);


/***/ }),

/***/ "./src/popup/analytics/ActivitiyCorrelations.tsx":
/*!*******************************************************!*\
  !*** ./src/popup/analytics/ActivitiyCorrelations.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ActivityCorrelations = ({ moodByDayData, activitiesByDay, }) => {
    console.log(JSON.stringify(activitiesByDay));
    const [selectedEmotion, setSelectedEmotion] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [activities, setActivities] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const emotions = [
        { emoji: "🤩", text: "ahhh", color: "blue-900" },
        { emoji: "😊", text: "nicee", color: "blue-500" },
        { emoji: "😐", text: "okey", color: "teal-500" },
        { emoji: "😔", text: "bummy", color: "orange-500" },
        { emoji: "😣", text: "rotten", color: "red-500" },
    ];
    const handleEmotionSelect = (emoji) => {
        setSelectedEmotion(emoji);
    };
    //go through the moodByDayData find the days where the mood is the selectedmood and then for thoose days look at the moodreasons and increment the count for those reasons each time they isFunctionOrConstructorTypeNode.
    const getActivitiesForEmotion = (mood) => {
        const activities = {};
        Object.entries(moodByDayData).forEach(([date, moodEmoji]) => {
            if (moodEmoji === mood) {
                const dateActivities = activitiesByDay[date] || [];
                dateActivities.forEach((activity) => {
                    activities[activity] = (activities[activity] || 0) + 1;
                });
            }
        });
        return activities;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (selectedEmotion) {
            console.log(selectedEmotion);
            const activitiesForEmotion = getActivitiesForEmotion(selectedEmotion);
            const sortedActivities = Object.entries(activitiesForEmotion)
                .sort((a, b) => b[1] - a[1])
                .map(([activity, count]) => ({ activity, count }));
            setActivities(sortedActivities);
            console.log(sortedActivities);
        }
        else {
            setActivities([]);
        }
    }, [selectedEmotion]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-80 " },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "relative justify-between flex place-items-center items-center mb-4" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-md mt-2 font-bold mb-4" }, "Activity Correlations"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "relative" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { className: "appearance-none border min-w-[150px] w-full border-gray-300 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400", value: selectedEmotion || "", onChange: (e) => handleEmotionSelect(e.target.value) },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "" }, "Select a Mood... "),
                    emotions.map(({ emoji, text, color }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { className: "flex gap-2 items-center", key: emoji, value: emoji }, `${emoji} ${text}`)))))),
        selectedEmotion && (activities === null || activities === void 0 ? void 0 : activities.length) > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "flex justify-center items-center flex-wrap w-full" }, activities.map(({ activity, count }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { key: activity, className: "mb-2" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `w-auto mx-2 justify-center h-6 m-1 py-1 px-2 text-xs rounded-full bg-teel text-white relative` },
                activity,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "absolute -top-2 -right-2 w-3 h-3 rounded-full bg-white p-2 border-gray-400 border-[1px] text-teel flex justify-center items-center text-xs font-bold" }, count))))))) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Please select an emotion to see associated activities."))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActivityCorrelations);


/***/ }),

/***/ "./src/popup/analytics/MoodChart.tsx":
/*!*******************************************!*\
  !*** ./src/popup/analytics/MoodChart.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/chart/LineChart.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/cartesian/CartesianGrid.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/cartesian/XAxis.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/cartesian/YAxis.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/component/Tooltip.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/cartesian/Line.js");


const moods = [
    { emoji: "🤩", text: "ahhh", color: "blue", count: 4 },
    { emoji: "😊", text: "nicee", color: "green", count: 3 },
    { emoji: "😐", text: "okey", color: "orange", count: 2 },
    { emoji: "😔", text: "bummy", color: "red", count: 1 },
    { emoji: "😣", text: "rotten", color: "black", count: 0 },
];
const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const getChartData = (moodData) => {
    const chartData = [];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dateString = `${year}-${month + 1}-${i}`;
        const mood = moodData[dateString] ? moodData[dateString] : "😐";
        let moodIndex = 0;
        for (let j = 0; j < moods.length; j++) {
            if (moods[j].emoji === mood) {
                moodIndex = moods[j].count;
                break;
            }
        }
        chartData.push({ date: i, mood: moodIndex * 5 });
    }
    return chartData;
};
const MoodChart = ({ data }) => {
    const chartData = getChartData(data);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-md mt-2 font-bold mb-4" }, "Monthly Mood-o-Meter"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(recharts__WEBPACK_IMPORTED_MODULE_1__.LineChart, { width: 325, height: 250, data: chartData, margin: { top: 5, right: 20, bottom: 5, left: -30 } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(recharts__WEBPACK_IMPORTED_MODULE_2__.CartesianGrid, { strokeDasharray: "3 3" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(recharts__WEBPACK_IMPORTED_MODULE_3__.XAxis, { dataKey: "date", tickFormatter: (value) => value.toString(), label: {
                    value: monthsOfYear[new Date().getMonth()],
                    position: "bottom",
                    offset: -8,
                } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(recharts__WEBPACK_IMPORTED_MODULE_4__.YAxis, { dataKey: "mood", tickFormatter: (value) => ["😣", "😔", "😐", "😊", "🤩"][value / 5], domain: [0, 20], tick: {
                    fontSize: 16,
                } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(recharts__WEBPACK_IMPORTED_MODULE_5__.Tooltip, null),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(recharts__WEBPACK_IMPORTED_MODULE_6__.Line, { type: "monotone", dataKey: "mood", stroke: "#8884d8", activeDot: { r: 8 }, dot: { r: 4 }, strokeWidth: 2 }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoodChart);


/***/ }),

/***/ "./src/popup/components/Analytics.tsx":
/*!********************************************!*\
  !*** ./src/popup/components/Analytics.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _analytics_MoodChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../analytics/MoodChart */ "./src/popup/analytics/MoodChart.tsx");
/* harmony import */ var _analytics_ActivitiyCorrelations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../analytics/ActivitiyCorrelations */ "./src/popup/analytics/ActivitiyCorrelations.tsx");



const Analytics = () => {
    const [moodByDayData, setMoodByDayData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const [reasonsByDayData, setReasonsByDayData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    //setting moods
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const moodByDayDataFromStorage = JSON.parse(localStorage.getItem("moodByDay") || "{}");
        setMoodByDayData(moodByDayDataFromStorage);
    }, []);
    //setting activities
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const activitiesByDaya = JSON.parse(localStorage.getItem("moodReasons") || "{}");
        setReasonsByDayData(activitiesByDaya);
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex w-80 pb-8 flex-col items-center justify-center gap-4 " },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-2xl flex flex-col font-medium font-serif flex-start justify-start w-full text-left" },
            "Emojinal Intelligence",
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-sm font-bold" }, "Your Mood Stats and Streaks!")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_analytics_MoodChart__WEBPACK_IMPORTED_MODULE_1__["default"], { data: moodByDayData }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_analytics_ActivitiyCorrelations__WEBPACK_IMPORTED_MODULE_2__["default"], { moodByDayData: moodByDayData, activitiesByDay: reasonsByDayData })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Analytics);


/***/ }),

/***/ "./src/popup/components/Calendar.tsx":
/*!*******************************************!*\
  !*** ./src/popup/components/Calendar.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _features_Calendar_Comp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../features/Calendar.Comp */ "./src/popup/features/Calendar.Comp.tsx");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const Calendar = ({ db, user }) => {
    const [year, setYear] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date().getFullYear());
    const [month, setMonth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date().getMonth());
    const [moodByDay, setMoodByDay] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    // Load mood data from local storage on mount
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const moodByDayRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, "users", user.email, "moodByDay");
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(moodByDayRef, (querySnapshot) => {
            const moodByDay = {};
            querySnapshot.forEach((doc) => {
                const date = doc.id;
                const mood = doc.data();
                moodByDay[date] = mood.emoji;
            });
            console.log(moodByDay);
            setMoodByDay(moodByDay);
        });
        return unsubscribe;
    }, [user, db]);
    const writetodatabase = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.writeBatch)(db);
            Object.keys(moodByDay).forEach((date) => {
                const moodRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, "users", user.email, "moodByDay", date);
                batch.set(moodRef, { emoji: moodByDay[date] });
            });
            yield batch.commit();
            console.log("Documents written successfully");
        }
        catch (e) {
            console.error("Error adding documents: ", e);
        }
    });
    // Save mood data to local storage on each update
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        writetodatabase();
    }, [moodByDay]);
    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        }
        else {
            setMonth(month - 1);
        }
    };
    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        }
        else {
            setMonth(month + 1);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "justify-center w-80 " },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex justify-between items-center mb-4" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-2xl font-medium font-serif text-teal" }, new Date(year, month).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "bg-teel rounded-full px-3 py-1 mr-2 text-white hover:bg-opacity-80 transition-colors", onClick: handlePrevMonth }, "<"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "bg-teel rounded-full px-3 py-1 text-white hover:bg-opacity-80 transition-colors", onClick: handleNextMonth }, ">"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_features_Calendar_Comp__WEBPACK_IMPORTED_MODULE_1__["default"], { year: year, month: month, moodByDay: moodByDay, setMoodByDay: setMoodByDay })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calendar);


/***/ }),

/***/ "./src/popup/components/Header.tsx":
/*!*****************************************!*\
  !*** ./src/popup/components/Header.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/bs */ "./node_modules/react-icons/bs/index.esm.js");


function Header({ user, auth }) {
    const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const handleLogout = () => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            }
            else if (token) {
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
            }
            else {
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
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-full p-4 flex items-center justify-between" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "text-sm font-medium font-serif " }, "MoodSpace"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "relative mr-4" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_bs__WEBPACK_IMPORTED_MODULE_1__.BsFillGearFill, { className: "text-sm cursor-pointer", onClick: () => setShowSettings(!showSettings) }),
            showSettings && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "absolute right-2 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "px-4 py-2 font-medium text-gray-800" },
                    "Signed in as: ",
                    user.email),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "py-2 border-t border-gray-300" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900", onClick: handleLogout }, "Logout")))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ "./src/popup/components/Intentions.tsx":
/*!*********************************************!*\
  !*** ./src/popup/components/Intentions.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _features_Journal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../features/Journal */ "./src/popup/features/Journal.tsx");
/* harmony import */ var _features_TodoComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../features/TodoComp */ "./src/popup/features/TodoComp.tsx");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const Intentions = ({ db, user }) => {
    const [currentDay, setCurrentDay] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date());
    // getting journals + todos
    const [journalByDay, setJournalByDay] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const [todosData, setTodosData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const [showJournal, setShowJournal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const gettododata = () => __awaiter(void 0, void 0, void 0, function* () {
        const todosref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(db, "users", user.email, "todos");
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)(todosref, (querySnapshot) => {
            const todosbyday = {};
            querySnapshot.forEach((doc) => {
                const date = doc.id;
                const mood = doc.data().date;
                todosbyday[date] = mood;
            });
            console.log(todosbyday);
            setTodosData(todosbyday);
        });
        return unsubscribe;
    });
    // getting journal
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        getjournaldata();
        gettododata();
    }, []);
    const getjournaldata = () => __awaiter(void 0, void 0, void 0, function* () {
        const journalsbydayjournalref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(db, "users", user.email, "journals");
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)(journalsbydayjournalref, (querySnapshot) => {
            const journalsbyday = {};
            querySnapshot.forEach((doc) => {
                const date = doc.id;
                const journal = doc.data();
                console.log("journal", journal);
                journalsbyday[date] = journal;
            });
            setJournalByDay(journalsbyday);
            console.log("journlas by day", journalByDay);
        });
        return unsubscribe;
    });
    //setting todos
    const writetodostodatabase = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.writeBatch)(db);
            Object.keys(todosData).forEach((date) => {
                const todosref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(db, "users", user.email, "todos", date);
                console.log(date);
                batch.set(todosref, { date: todosData[date] });
            });
            yield batch.commit();
            console.log("Documents written successfully");
        }
        catch (e) {
            console.error("Error adding documents: ", e);
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        writetodostodatabase();
    }, [todosData]);
    // getting journals
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const journaldayref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(db, "users", user.email, "journals");
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)(journaldayref, (querySnapshot) => {
            const journalsbyday = {};
            querySnapshot.forEach((doc) => {
                const date = doc.id;
                const journal = doc.data();
                journalsbyday[date] = journal;
            });
            console.log(journalsbyday);
            setJournalByDay(journalsbyday);
        });
        return unsubscribe;
    }, [user, db]);
    const handlePrevDay = () => {
        setCurrentDay((prevDay) => {
            const newDay = new Date(prevDay);
            newDay.setDate(newDay.getDate() - 1);
            return newDay;
        });
    };
    const handleNextDay = () => {
        setCurrentDay((prevDay) => {
            const newDay = new Date(prevDay);
            newDay.setDate(newDay.getDate() + 1);
            return newDay;
        });
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "justify-center font-serif w-80" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex justify-between items-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-2xl font-medium font-serif " }, showJournal ? "Brain Dump" : "Intentions"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "bg-teel rounded-full px-3 py-1 mr-2 text-white hover:bg-opacity-80 transition-colors", onClick: handlePrevDay }, "<"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "bg-teel rounded-full px-3 py-1 text-white hover:bg-opacity-80 transition-colors", onClick: handleNextDay }, ">"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: " flex mt-1 justify-between" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-md font-bold text-gray-800 mb-2" }, (0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDay, "EEEE, MMMM d, yyyy")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "border border-cpink h-8 rounded-lg flex max-w-[150px]" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: `${!showJournal ? "bg-cpink text-white" : "bg-white text-cpink"} rounded-l-md flex w-full items-center px-2 justify-center transition-colors duration-300`, onClick: () => setShowJournal(false) },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Todos")),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: `${showJournal ? "bg-cpink text-white" : "bg-white text-cpink"} rounded-r-md flex items-center w-full  px-2 justify-center transition-colors duration-300`, onClick: () => setShowJournal(true) },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Journal")))),
        showJournal ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "my-4 w-80 " },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_features_Journal__WEBPACK_IMPORTED_MODULE_1__["default"], { currentDay: currentDay, setJournalByDay: setJournalByDay, journalByDay: journalByDay, user: user, db: db }))) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "my-4 w-80 " },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_features_TodoComp__WEBPACK_IMPORTED_MODULE_2__["default"], { currentDay: currentDay, setTodosData: setTodosData, todosData: todosData })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Intentions);


/***/ }),

/***/ "./src/popup/components/Signup.tsx":
/*!*****************************************!*\
  !*** ./src/popup/components/Signup.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const Signup = ({ user, db }) => {
    const [name, setName] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("");
    const [age, setAge] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("");
    const [reason, setReason] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("productivity");
    const [otherReason, setOtherReason] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("");
    const [submitting, setSubmitting] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setSubmitting(true);
        let thereason = reason == "other" ? otherReason : reason;
        console.log(reason);
        try {
            const userData = {
                name,
                age,
                reason: thereason,
            };
            yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(db, "users", user.email), userData);
            console.log("User data saved to Firestore:", userData);
        }
        catch (error) {
            console.error("Error writing user data to Firestore:", error);
        }
        finally {
            setSubmitting(false);
        }
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex flex-col justify-center items-center" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: " flex mt-8 gap-2" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: "logo128x128.png", alt: "MoodSpace logo", className: "w-10 mb-2" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "text-xl font-serif font-bold" }, "Welcome to MoodSpace")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", { className: "flex flex-wrap gap-4 pb-4 px-4", onSubmit: handleSubmit },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-64 mb-4" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { className: "block w-full text-gray-700 font-bold mb-2", htmlFor: "email" }, "Email"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: " w-64 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "email", type: "email", value: user.email, disabled: true })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "mb-4" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "name" }, "First Name"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: "border rounded-md  w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value) })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "mb-4" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "age" }, "Age"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: "border rounded-md py-2 px-3 max-w-[100px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "age", type: "number", value: age, onChange: (e) => setAge(e.target.value) })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex w-full  mb-4" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "reason" }, "Reason for using MoodSpace"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { className: "border min-w-[150px] rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "reason", value: reason, onChange: (e) => {
                            setReason(e.target.value);
                            console.log(reason);
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "productivity" }, "Productivity"),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "wellness" }, "Wellness"),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "both" }, "Both!"),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "other" }, "Other"))),
                reason === "other" && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "mt-6 " },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: "border justify-start rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "otherReason", type: "text", placeholder: "please share why", value: otherReason, onChange: (e) => setOtherReason(e.target.value) })))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex w-full justify-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { type: "submit", className: "bg-teal-500 w-full hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" }, "Submit")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Signup);


/***/ }),

/***/ "./src/popup/features/Calendar.Comp.tsx":
/*!**********************************************!*\
  !*** ./src/popup/features/Calendar.Comp.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MoodPicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MoodPicker */ "./src/popup/features/MoodPicker.tsx");
/* harmony import */ var _FeelingsReasons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FeelingsReasons */ "./src/popup/features/FeelingsReasons.tsx");



const CalendarComp = ({ year, month, moodByDay, setMoodByDay }) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const [selectedDay, setSelectedDay] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [mood, setMood] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const today = new Date();
    const emotions = [
        { emoji: "🤩", text: "ahhh", color: "violet-300" },
        { emoji: "😊", text: "nicee", color: "blue-300" },
        { emoji: "😐", text: "okey", color: "teal-300" },
        { emoji: "😔", text: "bummy", color: "orange-300" },
        { emoji: "😣", text: "rotten", color: "red-300" },
    ];
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };
    const isCurrentDay = (day) => {
        return (year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate());
    };
    const getEmojiForDay = (day) => {
        if (moodByDay.hasOwnProperty(`${year}-${month + 1}-${day}`)) {
            const emoji = moodByDay[`${year}-${month + 1}-${day}`];
            const emotion = emotions.find((e) => e.emoji === emoji);
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `w-6 h-6 rounded-full bg-${emotion.color} flex items-center justify-center text-xl`, style: { cursor: "pointer" } }, moodByDay[`${year}-${month + 1}-${day}`]));
        }
        return null;
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "grid w-80 grid-cols-7 gap-4 text-center" },
        weekdays.map((day) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: day, className: "text-gray-700 font-medium" }, day))),
        Array.from({ length: firstDayOfMonth }, (_, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: `pre_${i}`, className: "text-gray-300" }, ""))),
        days.map((day) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: day, className: `flex items-center justify-center ${selectedDay === day ? "bg-gray-200" : ""}`, onClick: () => handleDayClick(day), style: { cursor: "pointer" } }, getEmojiForDay(day) || (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `w-6 h-6 rounded-full ${isCurrentDay(day) ? "bg-teel" : "bg-gray-300"} `, onClick: () => setSelectedDay(day), style: { cursor: "pointer" } }))))),
        selectedDay !== null && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: `popup_${selectedDay}`, className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", style: { zIndex: 9999 }, onClick: (event) => {
                if (event.target === event.currentTarget) {
                    setSelectedDay(null);
                }
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bg-white rounded-lg w-80 p-4 flex flex-col" }, mood ? (isCurrentDay(selectedDay) ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MoodPicker__WEBPACK_IMPORTED_MODULE_1__["default"], { year: year, month: month, moodByDay: moodByDay, setMoodByDay: setMoodByDay, selectedDay: selectedDay, setMood: setMood })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                " ",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "font-bold" }, "Oopsie! Looks like you're a time traveler. \uD83E\uDE84"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "underline" }, `You can't track your mood for a day ${year < today.getFullYear() ||
                    month < today.getMonth() ||
                    selectedDay < today.getDate()
                    ? "from the past!"
                    : "that hasn't happened yet!"}
                      `),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "mt-2" }, "Come back tomorrow and don't miss a day, I want to hear all about how you're feeling! \uD83D\uDE80\uD83D\uDD70\uFE0F\uD83D\uDC4B")))) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_FeelingsReasons__WEBPACK_IMPORTED_MODULE_2__["default"], { selectedDay: selectedDay, setMood: setMood, year: year, month: month, setSelectedDay: setSelectedDay }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "bg-red-300" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "bg-orange-300" }, " "),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "bg-green-300" }, " "),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "bg-teal-300" }, " "),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "bg-blue-300" }, " "),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "bg-violet-300" }, " ")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalendarComp);


/***/ }),

/***/ "./src/popup/features/FeelingsReasons.tsx":
/*!************************************************!*\
  !*** ./src/popup/features/FeelingsReasons.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");


const FeelingsReasons = ({ selectedDay, setMood, year, month, setSelectedDay, }) => {
    const [reasonsData, setReasonsData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [selectedReasons, setSelectedReasons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    // Load reasons from local storage on mount
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const data = JSON.parse(localStorage.getItem("moodReasons"));
        if (data) {
            setReasonsData(data);
            console.log(data[`${year}-${month + 1}-${selectedDay}`]);
            console.log(year, month, selectedDay);
            setSelectedReasons(data[`${year}-${month + 1}-${selectedDay}`]
                ? data[`${year}-${month + 1}-${selectedDay}`]
                : []);
        }
    }, []);
    //   useEffect(() => {
    //     setMood(true);
    //   }, [selectedDay]);
    const reasons = [
        "Food",
        "Sleep",
        "Exercise",
        "Family",
        "Partner",
        "Social Media",
        "Friends",
        "Events",
        "School",
        "Work",
        "Money",
        "Pets",
        "Hobbies",
        "Music",
    ];
    const handleReasonClick = (reason) => {
        if (selectedReasons.includes(reason)) {
            setSelectedReasons(selectedReasons.filter((r) => r !== reason));
        }
        else {
            setSelectedReasons([...selectedReasons, reason]);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bg-white rounded-lg p-4 font-serif" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", { className: "text-[16px] mb-4 font-bold" }, "What made you feel this way"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex flex-wrap justify-center" }, reasons.map((reason) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { key: reason, className: `w-auto justify-center h-6 m-1 py-1 px-2 text-xs rounded-full ${selectedReasons.includes(reason)
                ? "bg-teel text-white"
                : "bg-gray-200 text-gray-800"}`, onClick: () => handleReasonClick(reason) }, reason)))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex place-items-center justify-between mt-4" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaArrowLeft, { className: "text-teel hover:text-teal-600 text-lg ", onClick: () => {
                    setMood(true);
                } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "bg-teel hover:bg-teal-600 text-white py-2 px-4 rounded-lg", onClick: () => {
                    const newReasons = Object.assign({}, reasonsData);
                    newReasons[`${year}-${month + 1}-${selectedDay}`] = selectedReasons;
                    localStorage.setItem("moodReasons", JSON.stringify(newReasons));
                    setSelectedDay(null);
                    setMood(true);
                } }, "Save"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeelingsReasons);


/***/ }),

/***/ "./src/popup/features/Journal.tsx":
/*!****************************************!*\
  !*** ./src/popup/features/Journal.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const Journal = ({ currentDay, setJournalByDay, journalByDay, user, db }) => {
    console.log("data here is", journalByDay);
    const [journalInput, setJournalInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")]
        ? journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")].content
        : "");
    const [editmode, seteditmode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")] ? true : false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setJournalInput(journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")]
            ? journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")].content
            : "");
    }, [currentDay]);
    const handleAddEntry = () => {
        setJournalByDay((prevJournals) => (Object.assign(Object.assign({}, prevJournals), { [(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")]: {
                id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
                title: "",
                content: "",
            } })));
    };
    const handleJournalInputChange = (e) => {
        setJournalInput(e.target.value);
    };
    const handleSaveEntry = () => __awaiter(void 0, void 0, void 0, function* () {
        const newJournal = Object.assign(Object.assign({}, journalByDay), { [(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")]: {
                title: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "EEEE, MMMM d, yyyy"),
                content: journalInput,
            } });
        setJournalByDay(newJournal);
        console.log(journalByDay);
        const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.writeBatch)(db);
        Object.keys(newJournal).forEach((date) => {
            const journalRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(db, "users", user.email, "journals", date);
            batch.set(journalRef, Object.assign({}, newJournal[date]));
        });
        yield batch.commit();
        console.log("Journals written successfully");
    });
    // setting journals
    const writejournalstodatabase = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("running..");
        try {
            const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.writeBatch)(db);
            Object.keys(journalByDay).forEach((date) => {
                const journalref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(db, "users", user.email, "journals", date);
                batch.set(journalref, { journal: journalByDay[date] });
            });
            yield batch.commit();
            console.log("Documents written successfully");
        }
        catch (e) {
            console.error("Error adding documents: ", e);
        }
    });
    const getJournalByDate = (date) => {
        const formattedDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(date, "yyyy-MM-dd");
        if (journalByDay[formattedDate]) {
            return journalByDay[formattedDate];
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", { className: "shadow appearance-none border border-gray-200 min-h-[175px] text-left rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full", id: "journal-input", placeholder: "Write your journal here...\nThis can be a daily reflection, summary of your day, or any thoughts you just want to note down :)", onChange: (e) => handleJournalInputChange(e), value: journalInput }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: `${journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")]
                    ? journalByDay[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDay, "yyyy-MM-dd")].content ==
                        journalInput
                        ? "bg-cpink"
                        : "bg-red-400"
                    : journalInput == ""
                        ? "bg-cpink"
                        : "bg-red-400"} hover:bg-red-200 text-white mt-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline `, onClick: handleSaveEntry }, "Save Journal"))));
};
const JournalEntry = ({ entry }) => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "journal-entry" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, entry.content)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Journal);


/***/ }),

/***/ "./src/popup/features/MoodPicker.tsx":
/*!*******************************************!*\
  !*** ./src/popup/features/MoodPicker.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const MoodPicker = ({ year, month, moodByDay, setMoodByDay, selectedDay, setMood, }) => {
    const emotions = [
        { emoji: "😣", text: "rotten", color: "red-500" },
        { emoji: "😔", text: "bummy", color: "orange-500" },
        { emoji: "😐", text: "okey", color: "teal-500" },
        { emoji: "😊", text: "nicee", color: "blue-500" },
        { emoji: "🤩", text: "ahhh", color: "violet-900" },
    ];
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex flex-wrap px-2 font-serif w-full justify-between items-center gap-4" }, emotions.map((emotion) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: emotion.emoji, className: "flex justify-center items-center flex-col" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `w-8 h-8 rounded-full flex flex-col items-center place-items-center justify-center cursor-pointer transition-all ${moodByDay[`${year}-${month + 1}-${selectedDay}`] === emotion.emoji
                ? `bg-teel`
                : `bg-gray-200 `}`, onClick: () => {
                const newMoodByDay = Object.assign({}, moodByDay);
                newMoodByDay[`${year}-${month + 1}-${selectedDay}`] =
                    emotion.emoji;
                setMoodByDay(newMoodByDay);
                setMood(false);
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-xl" }, emotion.emoji)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: `font-bold text-xs text-${emotion.color}` }, emotion.text),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-red-500" }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-orange-500" }, " "),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-green-500" }, " "),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-teal-500" }, " "),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-blue-500" }, " "),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-violet-900" }, " "))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoodPicker);


/***/ }),

/***/ "./src/popup/features/TodoComp.tsx":
/*!*****************************************!*\
  !*** ./src/popup/features/TodoComp.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");



const TodoComp = ({ currentDay, setTodosData: setTodos, todosData: todos }) => {
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
    const [showPopup, setShowPopup] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [timeFormat, setTimeFormat] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("mins");
    const [acctimeFormat, setaccTimeFormat] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("mins");
    const selectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const selectRef2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            const newTodo = {
                text: event.target.value.trim(),
                plannedTime: "",
                actualTime: "",
                completed: false,
            };
            const todosForCurrentDay = todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")] || [];
            setTodos(Object.assign(Object.assign({}, todos), { [(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")]: [...todosForCurrentDay, newTodo] }));
            event.target.value = "";
        }
    };
    const getValue = () => {
        return selectRef.current.value;
    };
    const getValue2 = () => {
        return selectRef2.current.value;
    };
    const handleCheckboxChange = (event, date, index) => {
        const newTodos = Object.assign({}, todos);
        newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][index].completed =
            event.target.checked;
        setSelected(index);
        if (event.target.checked) {
            console.log("switched to true");
            setShowPopup(true);
        }
        setTodos(newTodos);
    };
    const handleActualTimeChange = (event, date, updateTime, value) => {
        const newTodos = Object.assign({}, todos);
        if (updateTime) {
            const formatting = getValue2();
            newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][selected].actualTime =
                event.target.value;
            newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][selected].acctimeFormat =
                formatting;
        }
        else {
            newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][selected].acctimeFormat =
                value;
        }
        setTodos(newTodos);
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            setShowPopup(false);
        }
    };
    const handlePlannedTimeChange = (event, date, index, updateTime, value) => {
        const newTodos = Object.assign({}, todos);
        if (updateTime) {
            const selectValue = getValue();
            newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][index].plannedTime =
                event.target.value.trim();
            newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][index].timeFormat =
                selectValue;
        }
        else {
            newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][index].timeFormat = value;
        }
        setTodos(newTodos);
    };
    const handleClosePopup = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            setShowPopup(false);
        }
    };
    const handleDeleteClick = (index) => {
        const newTodos = Object.assign({}, todos);
        newTodos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")].splice(index, 1);
        setTodos(newTodos);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "text", placeholder: "Add a new to do item...", onKeyPress: handleKeyPress, className: " p-2 w-80 rounded border border-gray-200 outline-none" }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "my-2  " }, todos &&
            todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")] &&
            todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")].map((todo, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { key: index, className: "flex items-center space-y-1 py-1 space-x-2 w-80" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-center w-[250px]" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "checkbox", checked: todo.completed, onChange: (event) => handleCheckboxChange(event, currentDay, index), className: "mr-2" }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: todo.completed ? "line-through" : "" }, todo.text.length > 50
                        ? `${todo.text.slice(0, 45)}...${todo.text.slice(-2)}`
                        : todo.text)),
                todo.completed && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bg-white rounded-lg flex flex-col place-self-end w-[160px] text-right justify-end items-end" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-[10px] w-full flex text-right justify-end items-end text-gray-400 place-self-end" },
                        "Planned time:",
                        " ",
                        todo.plannedTime
                            ? `${todo.plannedTime}${todo.timeFormat}`
                            : "n/a"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "text-[10px] w-full text-right justify-end items-end flex text-blue-500 place-self-end" },
                        "Actual time:",
                        " ",
                        todo.actualTime
                            ? `${todo.actualTime}${todo.acctimeFormat}`
                            : "n/a"))),
                !todo.completed && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-end" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "text", placeholder: "Planned time", value: todo.plannedTime, onChange: (event) => handlePlannedTimeChange(event, currentDay, index, true, null), onKeyPress: handleClosePopup, className: "p-1 text-xs rounded-l w-[85px] border border-gray-400 outline-none placeholder:text-xs justify-end" }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { className: "p-1 rounded-r max-w-[60px] border-y border-r border-gray-400 outline-none text-xs", value: todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][index].timeFormat
                            ? todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][index]
                                .timeFormat
                            : "mins", ref: selectRef, onChange: (e) => {
                            // let switchTo = timeFormat == "hrs" ? "mins" : "hrs";
                            // setTimeFormat(switchTo);
                            handlePlannedTimeChange(e, currentDay, index, false, e.target.value ? e.target.value : "mins");
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "hrs" }, "hrs"),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "mins" }, "mins")))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__.FaTrash, { className: "text-cpink text-lg cursor-pointer", onClick: () => handleDeleteClick(index) }))))),
        showPopup && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", style: { zIndex: 9999 }, onClick: (event) => {
                if (event.target === event.currentTarget) {
                    setShowPopup(false);
                }
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bg-white flex rounded-lg p-2 items-end" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "text", placeholder: "Actual time", value: todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][selected].actualTime, onChange: (e) => handleActualTimeChange(e, currentDay, true, null), onKeyPress: handleClosePopup, className: "p-1 text-xs rounded-l border placeholder:text-xs border-gray-400 outline-none justify-end " }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { className: "p-1 rounded-r max-w-[60px] border-y border-r border-gray-400 outline-none text-xs", value: todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][selected].acctimeFormat
                        ? todos[(0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(currentDay, "yyyy-MM-dd")][selected]
                            .acctimeFormat
                        : "mins", ref: selectRef2, onChange: (e) => {
                        // let switchTo = acctimeFormat == "hrs" ? "mins" : "hrs";
                        // setaccTimeFormat(switchTo);
                        handleActualTimeChange(e, currentDay, false, e.target.value ? e.target.value : "mins");
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "hrs" }, "hrs"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "mins" }, "mins")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoComp);


/***/ }),

/***/ "./src/popup/firebaseApp.tsx":
/*!***********************************!*\
  !*** ./src/popup/firebaseApp.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "auth": () => (/* binding */ auth),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "firebase": () => (/* binding */ firebase)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/esm/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/esm/index.esm.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./const */ "./src/popup/const.js");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router */ "./src/popup/Router.tsx");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");
/* harmony import */ var _components_Signup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Signup */ "./src/popup/components/Signup.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const firebase = (0,firebase_app__WEBPACK_IMPORTED_MODULE_1__.initializeApp)(_const__WEBPACK_IMPORTED_MODULE_3__.FIREBASE_CONFIG);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(firebase);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getFirestore)(firebase);
const FirebaseApp = (props) => {
    const [user, setUser] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(undefined);
    const [isLogin, setIsLogin] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(true);
    const [name, setName] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("");
    const [age, setAge] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("");
    const [reason, setReason] = react__WEBPACK_IMPORTED_MODULE_0___default().useState("");
    const [firstTime, setFirstTime] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null);
    const signIn = (e) => {
        e.preventDefault();
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError || !token) {
                alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`);
                return;
            }
            (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithCredential)(auth, firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthProvider.credential(null, token))
                .then((res) => {
                console.log("signed in!");
            })
                .catch((err) => {
                alert(`SSO ended with an error: ${err}`);
            });
        });
    };
    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user && user.uid ? user : null);
        });
    }, []);
    const checkIfFirstTime = () => __awaiter(void 0, void 0, void 0, function* () {
        const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(db, "users", user.email);
        const docSnap = yield (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getDoc)(userRef);
        if (docSnap.exists()) {
            console.log("User already exists:", docSnap.data());
            setFirstTime(false);
        }
        else {
            console.log("User does not already exist:");
            setFirstTime(true);
        }
    });
    if (undefined === user)
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading...");
    //return this when there is a user
    if (user != null) {
        checkIfFirstTime();
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "w-full h-full" }, firstTime === null ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-center justify-center h-full min-h-[400px] w-full" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" }))) : firstTime ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Signup__WEBPACK_IMPORTED_MODULE_6__["default"], { user: user, db: db })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Router__WEBPACK_IMPORTED_MODULE_4__["default"], { user: user, auth: auth, db: db }))));
    }
    //return this when there is no user
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex place-self-center flex-col w-full 2-full place-items-center items-center justify-center h-[400px]" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex items-center gap-2" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: "logo128x128.png", alt: "MoodSpace logo", className: "w-10 mb-8" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "text-xl font-serif font-bold mb-6" }, "Welcome to MoodSpace")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "bg-teel w-32 h-10 text-center text-white font-bold rounded hover:bg-teal-600", onClick: signIn }, "Sign In with Google")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FirebaseApp);


/***/ }),

/***/ "./src/popup/index.tsx":
/*!*****************************!*\
  !*** ./src/popup/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _assets_css_tailwind_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/css/tailwind.css */ "./src/assets/css/tailwind.css");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Popup */ "./src/popup/Popup.tsx");




function init() {
    const appContainer = document.createElement("div");
    document.body.appendChild(appContainer);
    if (!appContainer) {
        throw new Error("Cannot find appContainer");
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(appContainer);
    root.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Popup__WEBPACK_IMPORTED_MODULE_3__["default"], null));
}
init();


/***/ }),

/***/ "./src/popup/const.js":
/*!****************************!*\
  !*** ./src/popup/const.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FIREBASE_CONFIG": () => (/* binding */ FIREBASE_CONFIG)
/* harmony export */ });
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBI1NzI4Sn3a2zOuvq9XtRylsBLeYl-GY8",
  authDomain: "moodspace-383910.firebaseapp.com",
  projectId: "moodspace-383910",
  storageBucket: "moodspace-383910.appspot.com",
  messagingSenderId: "824586914859",
  appId: "1:824586914859:web:a0af099ff3048822f3ee6e",
  measurementId: "G-NE1NCDL079",
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmoodspace"] = self["webpackChunkmoodspace"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-b53f7e","vendors-node_modules_date-fns_esm_format_index_js-node_modules_react-icons_bs_index_esm_js-no-d2ac6a","src_assets_css_tailwind_css"], () => (__webpack_require__("./src/popup/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map