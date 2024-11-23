// app/signup/page.js
"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../UserContext";
import withUserProvider from "./withUserProvider";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { register } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      console.log("User registered successfully");
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };


  const handleRedirect = () => {
    setRedirectToLogin(true);
  };

  useEffect(() => {
    if (redirectToLogin) {
      router.push("/");
    }
  }, [redirectToLogin]);


  return (
    <div className="w-full max-w-md mx-auto">
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Registration successful!</strong>
          <span className="block sm:inline">
            {" "}
            Please click 'Got it' to proceed to the login page.
          </span>
          <button onClick={handleRedirect} className="btn bg-blue-500 hover:bg-blue-600 text-white ml-4">
            Got it
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="register-email"
            className="block text-gray-700 font-semibold mb-2 w-full"
          >
            Email
          </label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-300 rounded shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="register-password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 rounded shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default withUserProvider(Register);