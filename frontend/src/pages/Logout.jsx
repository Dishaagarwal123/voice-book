import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear user information from local storage
    localStorage.removeItem("id");
    localStorage.removeItem("token");

    // Update authentication state
    dispatch(authActions.logout());

    // Navigate to home page
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
      <div className="max-w-sm rounded-3xl bg-gradient-to-b from-orange-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
        <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Logging out...</h1>
            <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">You will be redirected to the home page shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
