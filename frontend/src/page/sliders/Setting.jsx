import React from "react";
import { RiChatNewFill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Setting = ({ setActiveTab }) => {
  let navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("ab");

  const [logoute,setlogoute]=useState(true)
  const [about, setabout] = useState("i am developer");
  useEffect(() => {
    axios
      .get("https://chitchat-j7bn.onrender.com/user/getprofile", {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.user;
        console.log(user);
        setName(user.name);
        setabout(user.about);

        setImagePreview(user.profilePicture);
      })
      .catch(console.error);
  }, []);

  let logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    toast.success("user logout successfully")
  };
  return (
    <div>
      {" "}
      <div className=" max-w-[600px] max-h-[100vh] bg-[#FFFFFF] w-full">
        <div className="flex justify-between py-[20px] mx-[50px] items-center">
          <div className="">
            <h1 className=" text-[25px] font-[600]"> Setting</h1>
          </div>
        </div>

        <div
          className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px] "
          onClick={() => setActiveTab("Profile")}
        >
          <div className=" relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-full"
              />
            ) : (
              <CgProfile className="w-[50px] h-[50px] rounded-full" />
            )}
          </div>
          <div className="flex flex-col ">
            <h1 className=" text-[16px] font-[500]">{name}</h1>
            <p className=" text-[13px] line-clamp-3">{about}</p>
          </div>
        </div>

        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-4" hidden={logoute}>
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
                onClick={() => setlogoute(true)}
              >
                Cancel
              </button>

              <button
                className="flex-1 bg-red-500 py-2 rounded-lg text-white hover:scale-95 transition"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <hr className="w-[90%] mx-[20px]" />
        <div className=" overflow-y-auto max-h-[52vh] sm:h-full no-scrollbar">
          <div className=" w-[94%]  h-[60px] px-[20px] mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px] ">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">Business</h1>
              <p className=" text-[13px]">Quick replies,labels,catalogue</p>
            </div>
          </div>

          <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">Account</h1>
              <p className=" text-[13px]">Secuity notifications,account info</p>
            </div>
          </div>

          <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">Privacy</h1>
              <p className=" text-[13px]">
                blocked contacts,disappearing massege
              </p>
            </div>
          </div>

          <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">Chats</h1>
              <p className=" text-[13px]">Theme wallpaper, chat settings</p>
            </div>
          </div>

          <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">Notifications</h1>
              <p className=" text-[13px]">massages, group sound</p>
            </div>
          </div>
          <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">Keyboard shortcuts</h1>
              <p className=" text-[13px]">quick actions</p>
            </div>
          </div>
          <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
            <div className=" relative">
              <RiChatNewFill />
            </div>
            <div className="flex flex-col ">
              <h1 className=" text-[16px] font-[500]">help and feedback</h1>
              <p className=" text-[13px]">
                Help center, contect us privacy policy
              </p>
            </div>
          </div>
        </div>

        <hr className="w-[90%] mx-[20px]" />
      </div>
      <div
        className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] my-[10px] flex items-center gap-[20px] hover:outline-red-400 hover:outline rounded-[20px]"
        onClick={() => setlogoute(false)}
      >
        <div className=" relative">
          <RiChatNewFill className=" text-[red]" />
        </div>
        <h1 className=" text-[16px] font-[500] text-[red]">Loug out</h1>
      </div>
    </div>
  );
};

export default Setting;
``;
