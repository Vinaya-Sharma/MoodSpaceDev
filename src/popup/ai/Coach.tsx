import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowAltCircleLeft, FaDoorOpen } from "react-icons/fa";

interface TheUser {
  name: string;
  moodReasons: {
    [key: string]: string[];
  };
}

const Chatbot = ({ db, user }): JSX.Element => {
  const [input, setInput] = useState("");
  const [messageToDisplay, setMessageToDisplay] = useState(
    <div>
      <h1>
        Welcome to chat!
        <br />
        <br />
        <span className="underline">
          At MoodSpace we're here for you and we want to help you reach your
          goals. 🎯
        </span>{" "}
        <br />
        <br />
        Everyones goals are different, from getting better grades, to learning a
        new hobby to just being happier. Wherever you are in life the MoodSpace
        coach wants to help.
        <br />
        <br />
        Break down obstacles, discuss feelings and set actionable goals here!
      </h1>
      <div className="w-full justify-center flex items-center place-items-center">
        <button
          onClick={() => {
            setPopup(false);
          }}
          className="px-4 place-self-center py-2 bg-teel text-white rounded-lg"
        >
          Start!
        </button>
      </div>
    </div>
  );
  const [messages, setMessages] = useState([]);
  const [popup, setPopup] = useState(true);
  const [theUser, setTheUser] = useState<TheUser | null>({
    name: "beautiful",
    moodReasons: {
      "2023-4-23": ["family", "school", "events"],
    },
  });

  let options;
  let oppsDif = 0;

  useEffect(() => {
    const getData = async () => {
      console.log(user.email);
      const userDocRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userInfo = userDoc.data();
        setTheUser({
          name: userInfo.name,
          moodReasons: userInfo.moodReasons,
        });
        console.log(userInfo);
        setMessages([
          {
            content: `Hi ${userInfo.name}, how can I help you today! 🚀 options: [Set a goal, Reflect on my day, Get some inspiration, Talk, Therapy]`,
            role: "assistant",
          },
        ]);
      } else {
        console.log("no user info");
      }
    };

    getData();
  }, []);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API,
  });
  const openai = new OpenAIApi(configuration);

  const sendMessage = async (userInput): Promise<void> => {
    options = [];
    const message = {
      content: userInput,
      role: "user",
    };
    setInput("");

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.4,
        max_tokens: 75,
        top_p: 1,
        messages: [
          {
            role: "system",
            content:
              "you are an ai personal coach your job is to 1.)guide the user through setting SMART goals,  2.)guide the user thought CBT to address mental health and wellness concerns.",
          },
          {
            role: "system",
            content:
              "lead the user thought things like Cognitive Restructuring, distorted thinking, Behavioral Activation, Graded Exposure, Problem-Solving, Thought Record, Relaxation Techniques, Goal Setting, Self-Monitoring",
          },
          {
            role: "system",
            content:
              "be short and consise, mimic user writing style, do not write a lot at once, be funny, use emojis and end with Good luck! when your done helping.",
          },
          {
            role: "system",
            content:
              "end each response you write with a list of short potential responses for the user to pick from. like this options:[]",
          },
          {
            role: "assistant",
            content: `hi, i'm your ai personal coach. whats your name 🤔. options: [${theUser.name}, your mom, 🤷🏼‍♀️]`,
          },
          {
            role: "user",
            content: `${theUser.name}`,
          },
          {
            role: "assistant",
            content:
              "nice to meet you 👋 how are you. options: [good, great, amazinnnng]",
          },
          {
            role: "user",
            content: "amazinnnng",
          },
          ...messages,
          { role: "user", content: userInput },
        ],
      });

      const botMessage = {
        content: response.data.choices[0].message.content,
        role: "assistant",
      };
      setMessages([...messages, message, botMessage]);
    } catch (error) {
      console.error(error);
      setPopup(true);
      setMessageToDisplay(
        <h1>
          Hey sorry... gimme a second to think. Trying to brainstorm the best
          way to help you! 🧐
          <br />
        </h1>
      );
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    userInput: string
  ): void => {
    if (event.key === "Enter") {
      sendMessage(userInput);
    }
  };

  return (
    <div className="h-screen mx-auto item-center justify-center w-full pb-12 p-4">
      {popup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 w-full flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setPopup(false);
            }
          }}
        >
          <div className="bg-white w-full mx-2 rounded-lg p-4 ">
            {messageToDisplay}
          </div>
        </div>
      )}
      <div className="flex flex-col flex-grow pb-52 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`bg-gray-200 py-1 px-3 rounded-lg ${
                message.role === "user" ? "bg-blue-500 text-white" : ""
              }`}
            >
              {message.content.includes("options: ") ? (
                <div>
                  {(() => {
                    const optionsStartIndex = message.content.indexOf("[");
                    const optionsEndIndex = message.content.indexOf(
                      "]",
                      optionsStartIndex
                    );
                    oppsDif = optionsEndIndex - optionsStartIndex;
                    const optionsList = message.content.slice(
                      optionsStartIndex + 1,
                      optionsEndIndex
                    );

                    options = optionsList.split(", ");
                    if (oppsDif > 75) {
                      options.pop();
                    } else if (oppsDif < 5) {
                      options = [];
                    }

                    return message.content.slice(0, optionsStartIndex - 9);
                  })()}
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center px-10 w-full place-self-center fixed bottom-10 left-0  p-4 bg-white">
          <div className="flex w-full place-self-center flex-wrap text-center items-center ">
            {options &&
              options.length > 0 &&
              options.map((option, index) => (
                <button
                  key={index}
                  className="inline-block px-2 py-1 mr-2 mb-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => {
                    console.log(option);
                    setInput(option);
                    sendMessage(option);
                  }}
                >
                  {option}
                </button>
              ))}
          </div>

          <div className="w-full flex place-self-center items-center">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                handleKeyPress(e, input);
              }}
              className="flex-grow py-2 px-4 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => {
                sendMessage(input);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
            <button
              className="inline-block px-2 py-2 ml-2 text-[16px]  bg-red-500 text-white rounded-lg"
              // onClick={endSession}
            >
              <FaArrowAltCircleLeft width={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
