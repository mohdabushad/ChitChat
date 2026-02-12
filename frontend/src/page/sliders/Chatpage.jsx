import React from 'react'
import { RiChatSmileAiLine } from "react-icons/ri";
const Chatpage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className=" ">
        <div>
          <RiChatSmileAiLine className="text-center mx-auto size-[50px] my-[20px] text-[red]" />
        </div>
        <h1 className="text-black text-center mt-4 text-[35px]">
          Wellcome ChitChat App
        </h1>
      </div>
    </div>
  );
}

export default Chatpage