import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [address, setAddress] = useState("");
  const { isAuthenticated, principal, login, logout } = useAuth();
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask belum terinstall!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      document.cookie = `PeanutFundtoken=${userAddress}; path=/; secure; samesite=strict`;
    } catch (error) {
      console.error("User rejected ada error:", error);
    }
  };

  useEffect(() => {
    const isAuthenticatedCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PeanutFundtoken="));

    if (isAuthenticatedCookie) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen">
      <div
        className="
          flex-1 
          relative 
          flex 
          flex-col 
          justify-center 
          items-center 
          overflow-hidden 
          p-6 
          bg-gradient-to-br
          from-[#1c223f]
          to-[#242b4d]
        "
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.svgrepo.com/show/530666/gene-sequence.svg')] bg-cover bg-no-repeat" />

        <div className="z-10 text-center mb-6">
          <h2 className="text-3xl font-bold text-white">PeanutFund</h2>
          <p className="text-gray-200 mt-2">Automate Your Crypto Trading.</p>
        </div>

        <img
          src="login-image.png"
          alt="3D Robot"
          className="z-10 w-2/3 max-w-[400px] mb-8"
        />
      </div>

      <div className="w-full md:w-[400px] bg-[#252a41] px-8 py-10 flex flex-col justify-center">
        <h1 className="text-2xl text-white font-bold mb-6">
          Welcome to PeanutFund!
        </h1>

        <form className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-300 mb-1"
          >
            Email or Username
          </label>
          <input
            id="email"
            type="text"
            className="mb-4 rounded p-2 outline-none bg-[#1f2340] text-white"
            placeholder="Enter your email or username"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mb-4 rounded p-2 outline-none bg-[#1f2340] text-white"
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 accent-purple-300"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-200">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-sm text-purple-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2 rounded mb-4"
          >
            Login
          </button>

          <div className="text-center text-gray-400 text-sm mb-2">
            New on our platform?{" "}
            <a href="#!" className="text-purple-400 hover:underline">
              Create an account
            </a>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-2 text-white">or</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>

          <div className="flex items-center justify-center space-x-10 mt-2">
            <div
              className="hover:scale-105 transition-transform cursor-pointer"
              onClick={connectWallet}
            >
              <div className="flex items-center justify-center">
                <img
                  src="metamask-logo.png"
                  alt="MetaMask"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div
              className="hover:scale-105 transition-transform cursor-pointer"
              onClick={login}
            >
              <div className="flex items-center justify-center">
                <img
                  src="dfinity-logo.png"
                  alt="Dfinity"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
