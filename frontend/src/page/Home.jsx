import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHistoryToggleOff } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
// import { useNavigate } from "react-router-dom";
import Chat from "./sliders/Chat";
import Showimg from "./sliders/Showimg";
import Status from "./sliders/Status";
import Setting from "./sliders/Setting";
import Profile from "./sliders/Profile";
import Statuspage from "./sliders/Statuspage";
import Chatpage from "./sliders/Chatpage";
import Message from "./sliders/Message";
import axios from "axios";
const Home = () => {

  let [chatname, setchatname] = useState(null);
  const [hide, sethide] = useState(true);
  const [conversationid, setconversationid] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [userid, setuserid] = useState(null);

  let [mesaagehide,setmessagehide]=useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/getprofile", {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.user;
        setuserid(user._id);
        setchatname(user.name);
        setImagePreview(user.profilePicture);
      })
      .catch(console.error);
  }, []);

  const [activeTab, setActiveTab] = useState("Chat");
  return (
    <div className="bg-[#F1EBE3] w-[100%] h-[100vh] ">
      <div className="flex ">
        <div
          className="
    bg-[#F7F5F3]
    fixed bottom-0 left-0
    w-full h-[70px]
 z-[100]
    sm:static sm:w-[70px] sm:h-screen sm:px-4
    
  "
        >
          <ul
            className="
      h-full flex flex-row items-center justify-around

      sm:flex-col sm:justify-between sm:py-[30px]
    "
          >
            <li
              className={`text-[23px] p-[8px] rounded-[50%] cursor-pointer hover:text-green-500 ${
                activeTab === "Chat"
                  ? "text-green-500 bg-[#000000]"
                  : "text-black"
              }`}
            >
              <BsChatLeftText onClick={() => setActiveTab("Chat")} />
            </li>

            <li
              className={`text-[30px] p-[5px] rounded-[50%] cursor-pointer hover:text-green-500 ${
                activeTab === "Status"
                  ? "text-green-500 bg-[#000000]"
                  : "text-black"
              }`}
            >
              <MdHistoryToggleOff onClick={() => setActiveTab("Status")} />
            </li>

            <li
              className={`text-[30px] p-[5px] rounded-[50%] cursor-pointer hover:text-green-500 ${
                activeTab === "Setting"
                  ? "text-green-500 bg-[#000000]"
                  : "text-black"
              }`}
            >
              <IoSettingsOutline onClick={() => setActiveTab("Setting")} />
            </li>

            <li
              className={`text-[30px] p-[5px] rounded-[50%] cursor-pointer hover:text-green-500 ${
                activeTab === "Profile"
                  ? "text-green-500 bg-[#000000]"
                  : "text-black"
              }`}
            >
              {ImagePreview ? (
                <img
                  src={ImagePreview}
                  alt="Profile"
                  className="w-[30px] h-[30px] rounded-full cursor-pointer"
                  onClick={() => setActiveTab("Profile")}
                />
              ) : (
                <CgProfile onClick={() => setActiveTab("Profile")} />
              )}
            </li>
          </ul>
        </div>

        <div
          className="w-full fixed inset-0 z-50 bg-white
          sm:static sm:z-auto sm:max-w-[600px] "
        >
          <div className="  max-w-[600px]">
            {activeTab === "Chat" && (
              <Chat
                setSelectedUser={setSelectedUser}
                setconversationid={setconversationid}
                userid={userid}
                sethide={sethide}
                hide={hide}
                chatname={chatname}
                setmessagehide={setmessagehide}
              />
            )}
          </div>

          {activeTab === "Status" && <Status />}
          {activeTab === "Setting" && <Setting setActiveTab={setActiveTab} />}
          {activeTab === "Profile" && <Profile />}
        </div>
        <div className="w-full ">
          {activeTab === "Status" && (
            <div className="hidden sm:block">
              <Statuspage />
            </div>
          )}

          {activeTab === "Chat" ? (
            <div className="w-full h-full ">
              {selectedUser ? (
                <div
                  className=" 
          fixed inset-0 z-50 bg-white
          sm:static sm:z-auto 
          w-full z-[200]
        "   hidden={mesaagehide}
                  
                >
                  <Message
                    selectedUser={selectedUser}
                    conversationid={conversationid}
                    userid={userid}
                    setmessagehide={setmessagehide}
                  />
                </div>
              ) : (
                <div className="hidden sm:block w-full ">
                  <Chatpage />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
