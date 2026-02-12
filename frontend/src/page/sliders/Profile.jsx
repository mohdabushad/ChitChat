import React from "react";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { IoMdMail } from "react-icons/io";
import { MdOutlineEdit, MdCheck } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import Showimg from "./Showimg";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { PiUserCirclePlusFill } from "react-icons/pi";
const Profile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [username, setusername] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("ab");
  const [email, setemail] = useState("abcd@gmailcom");
  const [isabout, setisabout] = useState(false);
  const [about, setabout] = useState("At a collage");
  let [showpro, setshowpro] = useState(true);

  let edithandle = async (e) => {
    e.preventDefault(); // stop page refresh

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("about", about);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.put(
        "http://localhost:8000/user/updateprofile",
        formData,
        { withCredentials: true },
      );

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleabout = () => {
    setisabout(true);
  };
  const handleSaveabout = () => {
    setisabout(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/getprofile", {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.user;
        setName(user.name);
        setabout(user.about);
        setemail(user.email);
        setImagePreview(user.profilePicture);
        setusername(user.username);
      })
      .catch(console.error);
  }, []);
 
  return (
    <div>
      <div hidden={showpro}>
        {imagePreview && (
          <div
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-3"
            onClick={() => setshowpro(true)} // body click close
          >
            <div
              className="
        relative
    bg-blue-100
       sm:max-h-[90vh]
        rounded-xl
       
        flex
   
        items-center
        justify-center
      "
              // stop bubbling
            >
              {/* Close Icon */}
              <button className="fixed top-5 right-10 z-[300] sm:right-20  sm:top-15 ">
                <RxCross2 className="text-3xl sm:text-4xl text-red-600 " />
              </button>

              {/* Image */}
              <Showimg
                imagePreview={imagePreview}
                className={"max-w-full max-h-[80vh] object-contain mx-auto"}
              />
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[600px] max-h-[100vh] bg-[#ffffff]">
        <div className="flex justify-between py-[20px]  mx-[50px] items-center w-full h-full ">
          <div className="">
            <h1 className=" text-[25px] font-[600]">My-Profile</h1>
          </div>
        </div>

        <div className="relative  h-full">
          <div className="w-[100%]  h-[150px] bg-[#b0d0db] sm:h-[200px]"></div>
          <label
            htmlFor="profileUpload"
            className="upload-icon absolute  bottom-[8px] sm:bottom-[0px] right-[32%] sm:right-[42%]  z-[100] bg-amber-50 p-[5px] rounded-[100%]"
          >
            <FaCamera className="text-[25px] text-[#4e9c4e] cursor-pointer " />
          </label>
          <div className=" absolute top-[30%] bottom-[50%] right-[32%] sm:right-[42%]   sm:top-[45%]  cursor-pointer z-[]">
            <div onClick={() => setshowpro(false)}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-[130px] h-[130px] rounded-full"
                />
              ) : (
                <PiUserCirclePlusFill className="w-[130px] h-[130px] rounded-full" />
              )}
            </div>

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="my-[50px] ">
          <form onSubmit={edithandle}>
            <div className=" flex  justify-between px-[20px] my-[20px] sm:my-[30px] sm:px-[60px] align-center w-full">
              <div className=" flex gap-[30px] items-center w-full">
                <FaUserEdit className=" text-[25px]" />

                {isEdit ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-2 py-1 rounded max-w-[350px] w-full"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-[20px]">{name}</h1>
                )}
              </div>
              <div>
                {isEdit ? (
                  <div className="p-[5px] hover:bg-[green] rounded-[50%] hover:text-white">
                    <MdCheck
                      className="text-[25px] cursor-pointer"
                      onClick={handleSave}
                    />
                  </div>
                ) : (
                  <div className="p-[5px] hover:bg-black rounded-[50%] hover:text-white">
                    <MdOutlineEdit
                      className="text-[25px] cursor-pointer"
                      onClick={handleEdit}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className=" flex  justify-between px-[20px]  sm:px-[60px]  my-[20px] sm:my-[50px]align-center">
              <div className=" flex gap-[30px] items-center">
                <PiUserCirclePlusFill className=" text-[25px]" />
                <h1 className="text-[20px]">{username}</h1>
              </div>
            </div>
            <div className=" flex  justify-between px-[20px]  sm:px-[60px]  my-[20px] sm:my-[50px]align-center">
              <div className=" flex gap-[30px] items-center">
                <IoMdMail className=" text-[25px]" />
                <h1 className="text-[20px]">{email}</h1>
              </div>
            </div>
            <div className=" flex  justify-between px-[20px] my-[20px] sm:my-[30px] sm:px-[60px] align-center w-full">
              <div className=" flex gap-[30px] items-center w-full">
                <FcAbout className=" text-[25px]" />

                {isabout ? (
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setabout(e.target.value)}
                    className="border px-2 py-1 rounded max-w-[350px] w-full"
                    min={250}
                    max={10}
                    autoFocus
                  />
                ) : (
                  <h1 className="text-[20px] line-clamp-2">{about}</h1>
                )}
              </div>
              <div>
                {isabout ? (
                  <div className="p-[5px] hover:bg-[green] rounded-[50%] hover:text-white">
                    <MdCheck
                      className="text-[25px] cursor-pointer  "
                      onClick={handleSaveabout}
                    />
                  </div>
                ) : (
                  <div className="p-[5px] hover:bg-black rounded-[50%] hover:text-white">
                    <MdOutlineEdit
                      className="text-[25px] cursor-pointer  "
                      onClick={handleabout}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="  w-full flex justify-center py-[6vh]">
              <button
                type="submit"
                className=" max-w-[300px] border-[1px] rounded-[20px] hover:bg-[black] hover:scale-[0.99]  text-[#5EA785] w-full h-[40px] hover:text-white cursor-pointer"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
