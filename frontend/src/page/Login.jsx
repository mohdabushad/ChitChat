import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { RiChatSmileAiLine } from "react-icons/ri";

const Login = () => {
  let [inp, setinp] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  let postdata = async () => {
    if (inp.email === "" || inp.password === "") {
      
      toast.error("please fill all input");
      return;
    }

    try {
      let posturl = "http://localhost:8000/user/login";

      let res = await axios.post(
        posturl,
        inp, // request body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      let { messege, success, name, data } = res.data;

      if (success) {
        toast.success(messege);
        
        localStorage.setItem("token", data);
        localStorage.setItem("username", name);

         setTimeout(() => {
           navigate("/home");
         }, 1000);
       
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error?.details?.[0]?.message ??
          err.response?.data?.message ??
          "Something went wrong",
      );
      // alert(
      //   err.response?.data?.error?.details?.[0]?.message ??
      //     err.response?.data?.message ??
      //     "Something went wrong",
      // );
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
    <div className=" ">
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#35412c] via-[#a6ff6b75] to-[#20d155]">
        <StyledWrapper>
          <div className="form-container w-full max-w-[380px] max-h-[450px]">
            <p className="title text-center">Welcome back</p>
            <div className="w-full ">
              <RiChatSmileAiLine className="text-center mx-auto size-[50px] my-[20px] text-[red]" />
            </div>
            <form className="form" onSubmit={handlesignup}>
              <input
                type="email"
                className=" w-full  focus:border-b-[#3ab93a] focus:scale-[0.98] focus:border-b-2
      outline-none border-b-1 focus:placeholder:text-[#3ab93a]"
                placeholder="Email"
                name="email"
                onChange={handleinp}
                value={inp.email}
              />

              <input
                type="password"
                className=" w-full  focus:border-b-[#3ab93a] focus:scale-[0.98] focus:border-b-2
      outline-none border-b-1 focus:placeholder:text-[#3ab93a]"
                placeholder="Password"
                onChange={handleinp}
                name="password"
                value={inp.password}
              />

              <p className="page-link text-right">
                <span className="page-link-label cursor-pointer">
                  Forgot Password?
                </span>
              </p>

              <button
                type="submit"
                className="form-btn w-full"
                onClick={postdata}
              >
                Log in
              </button>
            </form>

            <p className="sign-up-label text-center">
              Don't have an account?
              <span
                className="sign-up-link cursor-pointer ml-1"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </StyledWrapper>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form-container {
    width: 350px;
    height: 500px;
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

  .page-link {
    text-decoration: underline;
    margin: 0;
    text-align: end;
    color: #747474;
    text-decoration-color: #747474;
  }

  .page-link-label {
    cursor: pointer;
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 9px;
    font-weight: 700;
  }

  .page-link-label:hover {
    color: #000;
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
    font-family:
      "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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

export default Login;
