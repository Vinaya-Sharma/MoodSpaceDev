import React, { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";

const TodoComp = ({
  currentDay,
  setTodosData: setTodos,
  todosData: todos,
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
  setLoading,
}) => {
  const [selected, setSelected] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [timeFormat, setTimeFormat] = useState("mins");
  const [acctimeFormat, setaccTimeFormat] = useState("mins");
  const selectRef = useRef(null);
  const selectRef2 = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTodo = {
        text: event.target.value.trim(),
        plannedTime: "",
        actualTime: "",
        completed: false,
        date: format(currentDay, "yyyy-MM-dd"),
      };

      const todosForCurrentDay = todos[format(currentDay, "yyyy-MM-dd")] || [];

      setTodos({
        ...todos,
        [format(currentDay, "yyyy-MM-dd")]: [...todosForCurrentDay, newTodo],
      });

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
    const newTodos = { ...todos };
    newTodos[format(currentDay, "yyyy-MM-dd")][index].completed =
      event.target.checked;
    setSelected(index);

    if (event.target.checked) {
      setShowPopup(true);
    }

    setTodos(newTodos);
  };

  const handleActualTimeChange = (event, date, updateTime, value) => {
    const newTodos = { ...todos };
    if (updateTime) {
      const formatting = getValue2();
      newTodos[format(currentDay, "yyyy-MM-dd")][selected].actualTime =
        event.target.value;
      newTodos[format(currentDay, "yyyy-MM-dd")][selected].acctimeFormat =
        formatting;
    } else {
      newTodos[format(currentDay, "yyyy-MM-dd")][selected].acctimeFormat =
        value;
    }

    setTodos(newTodos);
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      setShowPopup(false);
    }
  };

  const handlePlannedTimeChange = (event, date, index, updateTime, value) => {
    const newTodos = { ...todos };
    if (updateTime) {
      const selectValue = getValue();
      newTodos[format(currentDay, "yyyy-MM-dd")][index].plannedTime =
        event.target.value.trim();
      newTodos[format(currentDay, "yyyy-MM-dd")][index].timeFormat =
        selectValue;
    } else {
      newTodos[format(currentDay, "yyyy-MM-dd")][index].timeFormat = value;
    }

    setTodos(newTodos);
  };

  const handleClosePopup = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      setShowPopup(false);
    }
  };

  const handleDeleteClick = (index) => {
    const newTodos = { ...todos };
    newTodos[format(currentDay, "yyyy-MM-dd")].splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="flex pb-12 flex-col">
      {code && groupExists && (
        <div>
          <div className="flex items-center my-2">
            <label htmlFor="group-member-select" className="w-32 mr-2">
              Intentions for:
            </label>
            <select
              id="group-member-select"
              ref={selectRef}
              onChange={(e) => {
                setSelectedMember(e.target.value);
              }}
              className="p-2 w-full rounded border border-gray-200 outline-none"
            >
              <option value={user.email}>meee!</option>
              {members.map((member) => {
                if (member.showTodos) {
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

      {selectedMember == user.email && (
        <input
          type="text"
          placeholder="Add a new to do item..."
          onKeyPress={handleKeyPress}
          className=" p-2 w-80 rounded border border-gray-200 outline-none"
        />
      )}

      {todos[format(currentDay, "yyyy-MM-dd")]?.length < 1 ||
        (!todos[format(currentDay, "yyyy-MM-dd")] && (
          <div className="mt-2">
            {selectedMember != user.email
              ? "No to-dos written yet. Remind your friends to take a second to set intentions. ✅"
              : "No to-dos written yet. Take a second to set intentions! ✅"}
          </div>
        ))}
      <ul className="my-2  ">
        {todos &&
          todos[format(currentDay, "yyyy-MM-dd")] &&
          todos[format(currentDay, "yyyy-MM-dd")].map((todo, index) => (
            <li
              key={index}
              className={"flex items-center space-y-1 py-1 space-x-2 w-80"}
            >
              <div className="flex items-center w-[250px]">
                <input
                  type="checkbox"
                  disabled={selectedMember != user.email}
                  checked={todo.completed}
                  onChange={(event) =>
                    handleCheckboxChange(event, currentDay, index)
                  }
                  className="mr-2"
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.text.length > 50
                    ? `${todo.text.slice(0, 45)}...${todo.text.slice(-2)}`
                    : todo.text}
                </span>
              </div>
              {todo.completed && (
                <div className="bg-white rounded-lg flex flex-col place-self-end w-[160px] text-right justify-end items-end">
                  <span className="text-[10px] w-full flex text-right justify-end items-end text-gray-400 place-self-end">
                    Planned time:{" "}
                    {todo.plannedTime
                      ? `${todo.plannedTime}${todo.timeFormat}`
                      : "n/a"}
                  </span>
                  <span className="text-[10px] w-full text-right justify-end items-end flex text-blue-500 place-self-end">
                    Actual time:{" "}
                    {todo.actualTime
                      ? `${todo.actualTime}${todo.acctimeFormat}`
                      : "n/a"}
                  </span>
                </div>
              )}

              {!todo.completed && (
                <div className="flex items-end">
                  <input
                    disabled={selectedMember != user.email}
                    type="text"
                    placeholder="Planned time"
                    value={todo.plannedTime}
                    onChange={(event) =>
                      handlePlannedTimeChange(
                        event,
                        currentDay,
                        index,
                        true,
                        null
                      )
                    }
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      } else {
                        handleClosePopup;
                      }
                    }}
                    className="p-1 text-xs rounded-l w-[85px] border border-gray-400 outline-none placeholder:text-xs justify-end"
                  />
                  <select
                    disabled={selectedMember != user.email}
                    className="p-1 rounded-r max-w-[60px] border-y border-r border-gray-400 outline-none text-xs"
                    value={
                      todos[format(currentDay, "yyyy-MM-dd")][index].timeFormat
                        ? todos[format(currentDay, "yyyy-MM-dd")][index]
                            .timeFormat
                        : "mins"
                    }
                    ref={selectRef}
                    onChange={(e) => {
                      // let switchTo = timeFormat == "hrs" ? "mins" : "hrs";
                      // setTimeFormat(switchTo);
                      handlePlannedTimeChange(
                        e,
                        currentDay,
                        index,
                        false,
                        e.target.value ? e.target.value : "mins"
                      );
                    }}
                  >
                    <option value="hrs">hrs</option>
                    <option value="mins">mins</option>
                  </select>
                </div>
              )}

              {selectedMember == user.email && (
                <FaTrash
                  className="text-cpink text-lg cursor-pointer"
                  onClick={() => handleDeleteClick(index)}
                />
              )}
            </li>
          ))}
      </ul>

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div className="bg-white  rounded-lg p-4 ">
            <h1 className="p-1">You're crushing your day!! 🥳🎉🎊</h1>
            <div className="flex items-end">
              <input
                type="text"
                placeholder="Actual time"
                value={
                  todos[format(currentDay, "yyyy-MM-dd")][selected].actualTime
                }
                onChange={(e) =>
                  handleActualTimeChange(e, currentDay, true, null)
                }
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  } else {
                    handleClosePopup;
                  }
                }}
                className="p-1 text-xs rounded-l border placeholder:text-xs border-gray-400 outline-none justify-end "
              />
              <select
                className="p-1 rounded-r max-w-[60px] border-y border-r border-gray-400 outline-none text-xs"
                value={
                  todos[format(currentDay, "yyyy-MM-dd")][selected]
                    .acctimeFormat
                    ? todos[format(currentDay, "yyyy-MM-dd")][selected]
                        .acctimeFormat
                    : "mins"
                }
                ref={selectRef2}
                onChange={(e) => {
                  // let switchTo = acctimeFormat == "hrs" ? "mins" : "hrs";
                  // setaccTimeFormat(switchTo);
                  handleActualTimeChange(
                    e,
                    currentDay,
                    false,
                    e.target.value ? e.target.value : "mins"
                  );
                }}
              >
                <option value="hrs">hrs</option>
                <option value="mins">mins</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoComp;
