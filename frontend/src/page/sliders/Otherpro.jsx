import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PiUserCirclePlusFill } from "react-icons/pi";
const Otherpro = ({ selectedUser, setbackAr}) => {
   let [showpro,setshowpro]=useState(true)


  return (
    <div>
      {!showpro && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-3"
          onClick={() => setshowpro(true)} // 👈 BODY CLICK = CLOSE
        >
          {/* Modal box */}
          <div
            className=" w-full max-w-[900px] max-h-[90vh] rounded-xl p-4"
            onClick={(e) => e.stopPropagation()} // 👈 INSIDE CLICK = STOP
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-[300]"
              onClick={() => setshowpro(true)}
            >
              <RxCross2 className="text-3xl text-red-600" />
            </button>

            {selectedUser &&
              (selectedUser.profilePicture ? (
                <img
                  src={selectedUser.profilePicture}
                  alt="Profile"
                  className="max-w-full max-h-[80vh] object-contain mx-auto"
                />
              ) : (
                <CgProfile className="w-40 h-40 mx-auto" />
              ))}
          </div>
        </div>
      )}

      <div className="max-w-[600px] h-[100vh] bg-[#FFFFFF] ">
        <div className=" py-[10px] mx-[20px] items-center sm:py-[30px] sm:mx-[40px] ">
          <div onClick={() => setbackAr(true)} className="cursor-pointer">
            <MdOutlineKeyboardBackspace className="text-[30px]" />
          </div>
          <div className="">
            <h1 className=" text-[25px] font-[600] text-center">
              {" "}
              {selectedUser?.name}
            </h1>
          </div>
        </div>

        <div className="relative h-[150px]">
          <div className="w-[100%] h-[200px] bg-[#EAF2F5]"></div>

          <div
            className=" absolute top-[15%]  sm:top-[45%]  bottom-[50%] right-[35%] z-[0] sm:right-[42%] cursor-pointer"
            onClick={() => setshowpro(false)}
          >
            <div></div>
            {selectedUser ? (
              <div>
                {selectedUser.profilePicture ? (
                  <img
                    src={selectedUser.profilePicture}
                    alt="Profile"
                    className="w-[130px] h-[130px] rounded-full"
                  />
                ) : (
                  <CgProfile className="w-[130px] h-[130px] rounded-full" />
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="my-[70px] sm:my-[100px]">
          <form>
            <div className=" flex  justify-between px-[10vw] my-[20px] align-center sm:my-[20px] sm:px-[60px] ">
              <div className=" flex gap-[30px] items-center">
                <PiUserCirclePlusFill className=" text-[26px]" />

                <h1 className="text-[20px]">{selectedUser?.username}</h1>
              </div>
              <div></div>
            </div>
            <div className=" flex  justify-between px-[10vw] my-[20px] align-center sm:my-[30px] sm:px-[60px] ">
              <div className=" flex gap-[30px] items-center">
                <CgProfile className=" text-[25px]" />

                <h1 className="text-[20px]">{selectedUser?.name}</h1>
              </div>
              <div></div>
            </div>

            <div className=" flex  justify-between px-[10vw] my-[20px] sm:my-[30px] sm:px-[60px] align-center">
              <div className=" flex gap-[20px] items-center sm:gap-[30px] ">
                <IoMdMail className=" text-[25px]" />
                <h1 className="text-[17px] sm:text-[20px] line-clamp-1">
                  {selectedUser?.email}
                </h1>
              </div>
            </div>
            <div className=" flex  justify-between px-[10vw] my-[0px] align-center sm:my-[30px] sm:px-[60px] ">
              <div className=" flex gap-[30px] items-center">
                <FcAbout className=" text-[25px]" />

                <h1 className="text-[20px]">{selectedUser?.about}</h1>
              </div>
              <div></div>
            </div>
            <div className="  "></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otherpro;
