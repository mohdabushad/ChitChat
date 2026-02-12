import React, { useState } from "react";
// import { useEffect } from "react"
// import axios from "axios"
import { IoSend } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import Otherpro from "./Otherpro";
import { TfiDownload } from "react-icons/tfi";
import { FaArrowLeft } from "react-icons/fa6";
// import { useEffect } from "react";
import { useRef } from "react";
// import axios from "axios";
const Message = ({ selectedUser, conversationid, userid, setmessagehide }) => {
  let [showpro, setshowpro] = useState(true);
  let [addimg, setaddimg] = useState(null);
  let [upload, setupload] = useState(false);
  let [del, setdel] = useState(true);

  let [msgid, setmsgid] = useState(null);
  let [image, setimage] = useState(null);
  let [messag, setmessag] = useState([]);
  const [text, settext] = useState("");

  let [backAr, setbackAr] = useState(true);

  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const lastMsgIdRef = useRef(null);
const token = localStorage.getItem("token");
  useEffect(() => {
    const lastMsg = messag[messag.length - 1];
    if (!lastMsg) return;

    if (lastMsgIdRef.current !== lastMsg._id && isAtBottom) {
      bottomRef.current?.scrollIntoView();
      lastMsgIdRef.current = lastMsg._id;
    }
  }, [messag, isAtBottom]);

  const handleScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;

    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;

    if (atBottom !== isAtBottom) {
      setIsAtBottom(atBottom);
    }
  };

  //  useEffect(() => {
  //    if (isAtBottom) {
  //      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //    }
  //  }, [messag, isAtBottom]);

  let reciveMessage = () => {
    
    if (!conversationid) return;

    axios
      .get(
        `https://chitchat-j7bn.onrender.com/user/conversations/${conversationid}/message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        const msgs = Array.isArray(res.data)
          ? res.data
          : res.data.message || [];

        setmessag(msgs);
      })
      .catch(console.error);
  };

  const handleImageChange = (e) => {
    setupload(true);
    const file = e.target.files[0];
    if (!file) return;

    setimage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setupload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const sendMessage = async () => {
    setupload(false);
    if (text === "" && !image) {
      return alert("no data send");
    }

    const formData = new FormData();
    formData.append("content", text);
    formData.append("sender", userid);
    formData.append("resiver", selectedUser?._id);
    formData.append("messegeStatus", "send");

    if (image) {
      formData.append("image", image); // 👈 SAME NAME AS multer
    }

    await axios.post(
      "https://chitchat-j7bn.onrender.com/user/sendmessage",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
     settext("");
    setimage(null);
    reciveMessage();
  };

  useEffect(() => {
    reciveMessage();
  }, [conversationid, selectedUser, reciveMessage()]);

  const deletemsg = async () => {
    await axios.delete(
      `https://chitchat-j7bn.onrender.com/user/message/${msgid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

   
    reciveMessage();
    setdel(true);
  };
  return (
    <div className="w-[100%] h-[100vh] relative">
      {!showpro && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 px-4">
          <div className="relative w-full max-w-[1000px] h-[90vh] max-h-[700px] rounded-lg shadow-lg">
            {/* Download icon */}
            {addimg && (
              <div className="absolute  right-4 z-[300] cursor-pointer">
                <TfiDownload
                  className="text-[28px] text-green-600"
                  onClick={() => window.open(addimg, "_blank")}
                />
              </div>
            )}

            {/* Close icon */}
            <div
              className="absolute  left-4 z-[300] cursor-pointer"
              onClick={() => setshowpro(true)}
            >
              <RxCross2 className="text-[32px] text-red-600" />
            </div>

            {/* Content area */}
            <div className="w-full h-full flex items-center justify-center">
              <img src={addimg} alt="" />
              {/* yahan image / profile / content */}
            </div>
          </div>
        </div>
      )}

      <div className="w-full ">
        <div className=" w-[100%]  h-[60px] px-[20px] sm:px-[40px] py-[30px]  flex items-center gap-[20px] bg-[white] border-b-1 border-[#1D202A] relative cursor-pointer">
          <div onClick={() => setmessagehide(true)}>
            <FaArrowLeft />
          </div>
          <div className=" relative" onClick={() => setbackAr(false)}>
            {selectedUser ? (
              <div>
                {selectedUser.profilePicture ? (
                  <img
                    src={selectedUser.profilePicture}
                    alt="Profile"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                ) : (
                  <CgProfile className="w-[40px] h-[40px] rounded-full" />
                )}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col ">
            <h1 className=" text-[16px] font-[500]">{selectedUser?.name}</h1>
          </div>
        </div>
      </div>
      {upload && (
        <div
          className="absolute top-[60px] bottom-[60px] left-0 right-0 
               z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setupload(null)} // 👈 outside click
        >
          <div
            className="w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()} // 👈 image click ignore
          >
            <img
              src={upload}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {!del && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-4">
          {/* Modal box */}
          <div
            className="bg-white w-full max-w-[360px] rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-lg sm:text-xl font-medium mb-6">
              Are you sure?
            </h1>

            <div className="flex justify-between gap-4">
              <button
                className="flex-1 bg-green-500 py-2 rounded-lg text-white hover:scale-95 transition"
                onClick={() => setdel(true)}
              >
                Cancel
              </button>

              <button
                className="flex-1 bg-red-500 py-2 rounded-lg text-white hover:scale-95 transition"
                onClick={deletemsg}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="w-full h-[93.5vh] bg-[url(https://www.indy100.com/media-library/image.jpg?id=28092000&width=1200&height=600&coordinates=0%2C355%2C0%2C355)] px-[4px] sm:px-[50px] pb-[100px] overflow-y-scroll 
"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <div>
          {messag.map((msg) => (
            <div
              key={msg._id}
              className={`w-full flex ${
                msg.sender._id === selectedUser?._id
                  ? "justify-start"
                  : "justify-end"
              } py-[5px]`}
            >
              <div
                className={`chat ${
                  msg.sender._id === selectedUser?._id
                    ? "chat-start "
                    : "chat-end"
                }`}
              >
                {msg.imageorvidiourl || msg.content ? (
                  <div className="chat-image avatar">
                    <div className="sm:w-10 w-7 rounded-full">
                      {msg.sender._id ? (
                        <img src={msg.sender.profilePicture} alt="avatar" />
                      ) : (
                        <img
                          src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                          alt="avatar"
                        />
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="relative">
                  {msg.imageorvidiourl || msg.content ? (
                    <div
                      className={`chat-bubble ${msg.sender._id === selectedUser?._id ? "bg-[white] text-[black] " : " bg-[#D6F3CF]"} sm:max-w-[600px] max-w-[250px]`}
                    >
                      <div
                        className={` absolute right-[2px] z-[100]  top-[0px] hover:text-[red] ${msg.sender._id === selectedUser?._id ? "hidden " : ""} `}
                        onClick={() => setdel(false)}
                      >
                        <IoIosArrowDown onClick={() => setmsgid(msg._id)} />
                      </div>

                      <div
                        className={`text-[10px] absolute right-[2px] z-[100]  bottom-[0px] hover:text-[red] `}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </div>

                      <div
                        onClick={() => {
                          setaddimg(msg.imageorvidiourl);
                          setshowpro(false);
                        }}
                      >
                        <img src={msg.imageorvidiourl} alt="" className=" " />
                      </div>

                      <div>
                        <p className=" my-[5px]">{msg.content}</p>
                      </div>
                    </div>
                  ) : null}
                  <div ref={bottomRef}></div>

                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full   flex align-center gap-[20px]  absolute bottom-2 sm:px-[50px] sm:gap-[30px] px-[10px]   ">
        <div className=" w-full flex align-center bg-[#ffffff]  h-full px-[10px] py-[10px] sm:px-[30px] rounded-[20px] z-[100] outline outline-emerald-500">
          <label
            htmlFor="upload"
            className=" w-[30px] p-[3px]  h-[30px] hover:bg-black rounded-[100%] hover:text-white"
          >
            <HiOutlinePlus className="text-[23px]" />
          </label>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Type a message"
              className="
      w-full
      focus:border-b-2
      outline-none
      text-sm sm:text-base
      py-1
      px-1
      sm:px-3
      
       focus:border-b-[#2eb82e] focus:scale-[0.98]
    "
    value={text}
              onChange={(e) => settext(e.target.value)}
            />

            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>
          <div className=" w-[30px] p-[5px] sm:w-[30px] h-[30px] hover:bg-[black] hover:text-white rounded-[100%] ">
            <IoSend className="text-[22px]" onClick={sendMessage} />
          </div>
        </div>
      </div>
      <div
        className="sm:absolute top-[0] left-[0] z-[400] w-full fixed "
        hidden={backAr}
      >
        <Otherpro selectedUser={selectedUser} setbackAr={setbackAr} />
      </div>
    </div>
  );
};

export default Message;
