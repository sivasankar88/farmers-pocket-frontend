import React, { useEffect, useRef, useState } from "react";
import { SendHorizontal, Bot, User } from "lucide-react";
import { postChats } from "../services/apiMethod";
import { Chats } from "../type/types";

const ChatBot = () => {
  const previousChats = JSON.parse(
    sessionStorage.getItem("farmersPocketChats") || "[]"
  );
  const [chats, setChats] = useState(
    previousChats.length
      ? previousChats
      : [
          {
            type: "answer",
            text: "Hello! How can I assist you with your farm management today?",
          },
        ]
  );
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handelSend = () => {
    if (!message.trim()) return;
    setSending(true);
    setChats((prev: Chats[]) => [...prev, { type: "question", text: message }]);

    postChats({ question: message }).then((response) => {
      setChats((prev: Chats[]) => [
        ...prev,
        { type: "answer", text: response.message },
      ]);
      setSending(false);
    });

    setMessage("");
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    sessionStorage.setItem("farmersPocketChats", JSON.stringify(chats));
  }, [chats]);
  return (
    <div className="card !p-1 !lg:p-2 fixed bottom-10 right-20 w-70 lg:w-96 h-[70%] lg:h-[500px] rounded border-2 border-green-700 shadow-lg flex flex-col">
      <div className="bg-green-700 text-white p-2 rounded-t font-semibold text-center">
        Farmer&apos;s Chat Bot
      </div>

      <div
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {chats.map((item: Chats, index: number) => {
          const isBot = item.type === "answer";
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isBot ? "self-start flex-row" : "self-end flex-row-reverse"
              }`}>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                {isBot ? (
                  <Bot className="w-4 h-4 text-green-700" />
                ) : (
                  <User className="w-4 h-4 text-blue-700" />
                )}
              </div>

              <div
                className={`relative px-3 py-2 rounded-lg max-w-[70%] text-sm shadow ${
                  isBot
                    ? "bg-green-100 text-gray-800 rounded-bl-none"
                    : "bg-blue-100 text-gray-800 rounded-br-none"
                }`}>
                {item.text}

                <div
                  className={`absolute bottom-0 ${
                    isBot
                      ? "-left-2 w-0 h-0 border-t-8 border-r-8 border-t-transparent border-r-green-100"
                      : "-right-2 w-0 h-0 border-t-8 border-l-8 border-t-transparent border-l-blue-100"
                  }`}></div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      <div className="p-.5 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handelSend();
            }
          }}
          className="flex-1 border border-green-700 rounded-2xl px-3 py-2 text-sm focus:outline-none"
          placeholder="Type your farm query..."
        />
        <button
          onClick={handelSend}
          className="bg-green-700 hover:bg-green-800 text-white p-2 rounded-full">
          {sending ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SendHorizontal className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
