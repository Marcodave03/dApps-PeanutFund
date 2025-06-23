import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BrowserProvider } from 'ethers';
import { registerUser } from '../lib/api';
import { RegistrationPayload } from '../lib/types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginMetamask, loginICP } = useAuth();
  const navigate = useNavigate();
  
  const connectMetamask = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setIsLoading(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const userData = {
        address: userAddress,
        username: `User_${userAddress.substring(0, 6)}`
      };

      const registrationPayload: RegistrationPayload = {
        InternetID: userAddress,
        InternalUserKey: userAddress, 
        Username: userData.username, 
        Email: `${userAddress.substring(0,10).toLowerCase()}@example.com` 
      };

      try {
        const registrationResult = await registerUser(registrationPayload);
        console.log('User registered successfully:', registrationResult);
      } catch (registrationError: any) {
        console.error("Registration error:", registrationError);
    
        alert(`Registration failed: ${registrationError.message}. Proceeding with local login.`);
      }

      await loginMetamask(userData);
      
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const connectICP = async () => {
    try {
      setIsLoading(true);
      await loginICP();
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="flex flex-col min-h-screen bg-[#1C223F] text-slate-200 items-center justify-center p-6">
      <div className="z-10 text-center mb-6">
        <h2 className="text-5xl font-bold text-white">PeanutFund</h2>
        <p className="mt-2 mb-10 text-gray-200">
          Automate Your Crypto Trading.
        </p>
      </div>
      
      <img
        src="/login-image.png"
        alt="3D Robot"
        className="z-10 w-2/3 max-w-[400px] mb-8"
      />

      <p className="mb-6">
        You are not logged in. Please connect your wallet:
      </p>

      <div className="flex items-center justify-center space-x-10 mt-2">
          <div
            className="hover:scale-150 transition-transform cursor-pointer"
            onClick={connectMetamask}
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
            className="hover:scale-150 transition-transform cursor-pointer"
            onClick={connectICP}
          >
            <div className="flex items-center justify-center">
              <img src="dfinity-logo.png" alt="Dfinity" className="w-10 h-10" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;