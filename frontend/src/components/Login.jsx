import React, { useEffect, useState } from "react";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, loggedIn]=useState(false);
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, sub, picture } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', {replace:true})
    });
  };
  useEffect(() => {
    if(localStorage.getItem('user')) loggedIn(true);
  }, [])
  
  return isLoggedIn?navigate('/', {replace:true}):(
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" className="invert" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            >
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className=""
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  ></button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
