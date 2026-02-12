import React from 'react'
import { RiChatSmileAiLine } from "react-icons/ri";
import photo from "../../assets/myimag.png";
const Frontpage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#35412c] via-[#a6ff6b75] to-[#20d155]">
      <img src={photo} alt="" className="sm:w-[400px] sm:h-[500px] w-[300px] h-[400px] rounded-2xl" />
    </div>
  );
}

export default Frontpage