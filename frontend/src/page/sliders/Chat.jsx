import React from "react";
import { RiChatNewFill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
// import photo from "../../assets/react.svg";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import Searchuser from "./Searchuser";
import { RiChatSmileAiLine } from "react-icons/ri";

const Chat = ({
  setSelectedUser,
  setconversationid,
  userid,
  hide,
  sethide,
  chatname,
  setmessagehide,
}) => {
  const inputRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const loggedInUserId = userid; // auth से लो

  let othuser = () => {
    axios
      .get("https://chitchat-j7bn.onrender.com/user/conversations", {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch(console.error);
  };
  useEffect(() => {
    othuser();
  }, [othuser()]);

  return (
    <div>
      <div className="max-w-[600px] h-[100vh] bg-[#FFFFFF] border-x-1 border-[#1D202A]  w-full">
        <div className="flex justify-between py-[20px] mx-[50px] items-center ">
          <div className="">
            <h1 className=" text-[25px] font-[600]"> ChitChat</h1>
          </div>

          <div className="flex justify-between w-[70px] content-center">
            <div className="text-[26px] font-[100]">
              <RiChatNewFill />
            </div>
            <div className="text-[26px] font-[100]">
              <CiMenuKebab />
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-[20px] sm:mx-[40px]">
          <input
            type="text"
            ref={inputRef}
            onFocus={() => sethide(false)}
            name=""
            id=""
            placeholder="enter serarch member"
            className="w-[100%] h-[40px] border-none bg-[#F6F5F4] px-[30px] rounded-[30px] hover:outline-[green] hover:cursor-pointer hover:outline"
          />
        </div>

        <div className="my-[10px] px-[20px]">
          <div className="flex gap-[20px] sm:justify-center sm:gap-[50px]">
            <button className=" px-[8px] border-[1px] rounded-[20px] hover:bg-[green] hover:scale-[0.99] hover:text-white">
              All
            </button>
            <button className="hover:bg-[green] hover:text-white px-[8px] border-[1px] rounded-[20px] hover:bg-[#DBD8D4] hover:scale-[0.99] ">
              Unread
            </button>
            <button className="hover:bg-[green] hover:text-white px-[8px] border-[1px] rounded-[20px] hover:bg-[#DBD8D4] hover:scale-[0.99] ">
              Favourites
            </button>
            <button className="hover:bg-[green] hover:text-white px-[8px] border-[1px] rounded-[20px] hover:bg-[#DBD8D4] hover:scale-[0.99] ">
              Group
            </button>
          </div>
        </div>
        <div
          className="overflow-y-scroll 
        full no-scrollbar h-[82.3vh] pb-[100px]"
        >
          {conversations && conversations.length > 0 ? (
            <div>
              {conversations.map((chat) => {
                const otherUser = chat.participants.find(
                  (u) => u._id !== loggedInUserId,
                );

                return (
                  <div
                    key={chat._id}
                    className="w-[94%] h-[60px] px-[20px] m-[10px] flex items-center gap-[20px] hover:bg-[#F7F5F3] rounded-[20px] cursor-pointer hover:outline-green-400 hover:outline sm:m-[20px]"
                    onClick={() => {
                      othuser();
                      setSelectedUser(otherUser);
                      setconversationid(chat._id);
                      setmessagehide(false);
                    }}
                  >
                    <div>
                      {otherUser?.profilePicture ? (
                        <img
                          src={otherUser?.profilePicture}
                          alt="profile"
                          className="w-[50px] h-[40px] rounded-full"
                        />
                      ) : (
                        <CgProfile className="w-[40px] h-[40px] rounded-full" />
                      )}
                    </div>

                    <div className="flex justify-between w-full">
                      <div>
                        <h1 className="text-[16px] font-[500]">
                          {otherUser?.name}
                        </h1>
                        <p className="text-[14px] text-gray-500 line-clamp-1">
                          {chat.lastMessage?.content || "No messages yet"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[12px] text-gray-400">
                          {chat.lastMessage
                            ? new Date(
                                chat.lastMessage.createdAt,
                              ).toLocaleTimeString()
                            : ""}
                        </p>

                        {chat.unreadCounts?.[loggedInUserId] > 0 && (
                          <span className="bg-green-500 text-white text-[12px] px-2 py-1 rounded-full">
                            {chat.unreadCounts[loggedInUserId]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="">
              <div className="w-full h-[50vh] flex items-center justify-center relative">
                <div className=" ">
                  <div>
                    <RiChatSmileAiLine className="text-center mx-auto size-[50px] my-[20px] text-[red]" />
                  </div>
                  <h1 className="text-black text-center mt-4 text-[25px]">
                    Wellcome ChitChat App
                  </h1>

                  <p className="text-center mt-4 text-[18px]">
                    search friend &#129333; and{" "}
                    <span className="text-[green]">
                      let's start chats &#128540;
                    </span>
                  </p>

                  <p className="absolute bottom-[-20px] text-[#800000] px-[30vw] ">
                    {" "}
                    from <span>Zara</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" absolute top-[0] w-full" hidden={hide}>
        <Searchuser sethide={sethide} userid={userid} chatname={chatname} />
      </div>
    </div>
  );
};

export default Chat;
