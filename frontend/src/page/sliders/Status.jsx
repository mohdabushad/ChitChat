import React from 'react'
import { RiUploadCloudFill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";

import photo from "../../assets/react.svg";

const Status = () => {
  return (
    <div>
      <div className="max-w-[600px] h-[100vh] bg-[#FFFFFF]">
        <div className="flex justify-between py-[20px] mx-[20px] items-center">
          <div className="">
            <h1 className=" text-[22px] font-[400]"> Status</h1>
          </div>

          <div className="flex justify-between w-[70px] content-center">
            <div className="text-[25px] font-[100]">
              <RiUploadCloudFill />
            </div>
            <div className="text-[23px] font-[100]">
              <CiMenuKebab />
            </div>
          </div>
        </div>

        <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
          <div className=" relative">
            <img src={photo} alt="" />
            <div className="absolute right-[-7px] bottom-[-7px] ">
              <RiUploadCloudFill className="text-[18px] cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col ">
            <h1 className=" text-[16px] font-[500]">My Status</h1>
            <p className=" text-[13px]"> click to add status update</p>
          </div>
        </div>
        <div className="my-[30px] px-[30px]">
          <p className="text-[18px]">Recent</p>
        </div>

        <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
          <div className=" relative">
            <img src={photo} alt="" />
          </div>
          <div className="flex flex-col ">
            <h1 className=" text-[16px] font-[500]">My Status</h1>
            <p className=" text-[13px]"> just now</p>
          </div>
        </div>

        <div className="my-[30px] px-[30px]">
          <p className="text-[18px]">Viewed</p>
        </div>

        <div className=" w-[94%]  h-[60px] px-[20px] mx-[10px] sm:mx-[20px] flex items-center gap-[20px] hover:outline-green-400 hover:outline rounded-[20px]">
          <div className=" relative">
            <img src={photo} alt="" />
          </div>
          <div className="flex flex-col ">
            <h1 className=" text-[16px] font-[500]">My Status</h1>
            <p className=" text-[13px]"> just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status