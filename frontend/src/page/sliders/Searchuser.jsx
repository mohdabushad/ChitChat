import React from "react";
import { RiChatNewFill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
// import photo from "../../assets/react.svg";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const Chat = ({ userid, sethide }) => {
  
  let [conversations, setConversations] = useState([]);

  // const loggedInUserId = userid; // auth से लो

  let [inp, setinp] = useState("");
  useEffect(() => {
    if (!inp.trim()) {
      setConversations([]); // 👈 input empty = clear list
      return;
    }
    axios
      .get(`http://localhost:8000/user/getAlluser/${inp}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.userlist);
      })
      .catch(console.error);
  }, [inp, setinp]);

  const sendconvers = async (receiverId) => {
    await axios.post(
      "http://localhost:8000/user/sendmessage",
      {
        sender: `${userid}`,
        resiver: `${receiverId}`,
        content: "",
        messegeStatus: "send",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    sethide(true);
  };

  return (
    <div>
      <div className="max-w-[600px] h-[100vh] bg-[#FFFFFF] border-x-1 border-[#1D202A] w-full">
        <div className="flex justify-between py-[20px] sm:mx-[50px] mx-[30px] items-center">
          <div className="cursor-pointer text-[20px] ">
            <FaArrowLeft onClick={() => sethide(true)} />
          </div>
          <div className="">
            <h1 className=" text-[25px] font-[600]"> Search User</h1>
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
            name=""
            id=""
            placeholder="enter serarch member"
            className="w-[100%] h-[40px] border-none bg-[#F6F5F4] px-[30px] rounded-[30px] hover:outline-green-400 outline "
            onChange={(e) => setinp(e.target.value)}
          />
        </div>
        <div
          className="overflow-y-scroll 
        full no-scrollbar h-[87vh] pb-[100px] "
        >
          {conversations.map((chat) => {
            if (chat._id) {
              console.log(chat._id);
            }
            return (
              <div
                key={chat._id}
                className="w-[94%] h-[60px] px-[20px] m-[20px] flex items-center gap-[20px] hover:bg-[#F7F5F3] rounded-[20px] cursor-pointer hover:outline-green-400 hover:outline"
              >
                <div>
                  {chat?.profilePicture ? (
                    <img
                      src={chat?.profilePicture}
                      alt="profile"
                      className="sm:w-[70px] sm:h-[40px] w-[100px] h-[40px] rounded-full"
                    />
                  ) : (
                    <CgProfile className="w-[40px] h-[40px] rounded-full" />
                  )}
                </div>

                <div className="flex justify-between w-full">
                  <div>
                    <h1 className="text-[16px] font-[500]">{chat?.name}</h1>
                    <p className="text-[14px] text-gray-500 line-clamp-1">
                      {chat.about || "No messages yet"}
                    </p>
                  </div>
                </div>
                <div
                  className="text-right"
                  onClick={() => sendconvers(chat._id)}
                >
                  <button
                    className=" w-[100px] sm:w-[150px] border-[1px] rounded-[5px] h-[40px] hover:bg-[green] hover:scale-[0.99] bg-[black] text-[white] hover:cursor-pointer text-[15px] "
                   
                  >
                    Add Contect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
