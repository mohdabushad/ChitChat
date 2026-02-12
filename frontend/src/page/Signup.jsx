import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiChatSmileAiLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Signup = () => {
  let [inp, setinp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });



  let navigate = useNavigate();

  let postdata = async () => {
    if (inp.name == "" || inp.email == "" || inp.password == "" || inp.username =="" ) {
      toast.error("please fill all input");
    } else {
      let posturl = "http://localhost:8000/user/signup";
      let res = await fetch(posturl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inp),
      });
      let result = await res.json();
      let { massege, success, error } = result;



      if (success) {
        toast.success(massege);
        navigate("/login");
      } else if (error) {
        toast.error(error.details[0].message);
      } else if (!success) {
        toast.error(massege);
      }

 
    }
  };


  let handleinp = (e) => {
    let { name, value } = e.target;
    setinp({ ...inp, [name]: value });
  };

  const handlesignup = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4  bg-gradient-to-br from-[#35412c] via-[#a6ff6b75] to-[#20d155]">
      <StyledWrapper>
        <div className="form-container w-full max-w-[420px] max-h-[500px] ">
          <p className="title text-center">Create account</p>
          <div className="w-full ">
            <RiChatSmileAiLine className="text-center mx-auto size-[50px] text-[red]" />
          </div>

          <p className="sub-title text-center text-sm sm:text-base">
            Let's get started with your 30 days free trial
          </p>

          <form className="form" onSubmit={handlesignup}>
            <input
              type="text"
              className=" w-full  focus:border-b-[#3ab93a] focus:scale-[0.98] focus:border-b-2
      outline-none border-b-1 focus:placeholder:text-[#3ab93a]"
              placeholder="Name"
              name="name"
              value={inp.name}
              onChange={handleinp}
            />
            <input
              type="text"
              className=" w-full  focus:border-b-[#3ab93a] focus:scale-[0.98] focus:border-b-2
      outline-none border-b-1 focus:placeholder:text-[#3ab93a]"
              placeholder="UserName"
              name="username"
              value={inp.username}
              onChange={handleinp}
            />

            <input
              type="email"
              className="w-full  focus:border-b-[#3ab93a] focus:scale-[0.98] focus:border-b-2
      outline-none border-b-1 focus:placeholder:text-[#3ab93a]"
              placeholder="Email"
              name="email"
              onChange={handleinp}
              value={inp.email}
            />

            <input
              type="password"
              className="w-full  focus:border-b-[#3ab93a] focus:scale-[0.98] focus:border-b-2
      outline-none border-b-1 focus:placeholder:text-[#3ab93a]"
              placeholder="Password"
              name="password"
              onChange={handleinp}
              value={inp.password}
            />

            <button
              type="submit"
              className="form-btn w-full"
              onClick={postdata}
            >
              Create account
            </button>
          </form>

          <p className="sign-up-label text-center">
            Already have an account?
            <span
              className="sign-up-link cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form-container {
    width: 350px;
    height: 550px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 30px;
  }

  .title {
    text-align: center;
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    margin: 10px 0 30px 0;
    font-size: 28px;
    font-weight: 800;
  }

  .sub-title {
    margin: 0;
    margin-bottom: 5px;
    font-size: 9px;
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 15px;
  }

  .input {
    border-radius: 20px;
    border: 1px solid #c0c0c0;
    outline: 0 !important;
    box-sizing: border-box;
    padding: 12px 15px;
  }

  .form-btn {
    padding: 10px 15px;
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    border-radius: 20px;
    border: 0 !important;
    outline: 0 !important;
    background: teal;
    color: white;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .form-btn:active {
    box-shadow: none;
  }

  .sign-up-label {
    margin: 0;
    font-size: 10px;
    color: #747474;
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  .sign-up-link {
    margin-left: 1px;
    font-size: 11px;
    text-decoration: underline;
    text-decoration-color: teal;
    color: teal;
    cursor: pointer;
    font-weight: 800;
  }

  .buttons-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
    gap: 15px;
  }

  .apple-login-button,
  .google-login-button {
    border-radius: 20px;
    box-sizing: border-box;
    padding: 10px 15px;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 11px;
    gap: 5px;
  }

  .apple-login-button {
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
  }

  .google-login-button {
    border: 2px solid #747474;
  }

  .apple-icon,
  .google-icon {
    font-size: 18px;
    margin-bottom: 1px;
  }
`;

export default Signup;
