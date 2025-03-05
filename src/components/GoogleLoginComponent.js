import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSuccess = (response) => {
    console.log("Google Token:", response.credential);
    dispatch(googleLogin(response.credential)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/profile");
      }
    });
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="20961636685-ef7b6atj562vtj8uunbuchppidd2q3u6.apps.googleusercontent.com">
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-sm mb-4 text-teal-400">Google Login</h3>
          {error && <p className="text-red-500">{error}</p>}
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
          {loading && <p className="text-gray-400 mt-2">Logging in...</p>}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
