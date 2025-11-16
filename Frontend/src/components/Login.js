import React, { useState } from "react";
import axios from "axios";
import { getContract } from "../contract/connection";

const Login = ({ setIsLoggedIn, setUserAddress, setUserData }) => {
  const [account, setAccount] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const connectWallet = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      if (!window.ethereum) {
        setErrorMsg("Please install MetaMask first!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const selectedAccount = accounts[0];
      setAccount(selectedAccount);

      // **1. Fetch role from blockchain**
      const contract = await getContract();
      const user = await contract.users(selectedAccount);

      if (!user.exists) {
        setErrorMsg("Wallet not registered. Please signup first.");
        return;
      }

      const roleName = user.role === 1 ? "Vendor" : "Distributor";
      setRole(roleName);

      // **2. Fetch OFF-CHAIN details (name, email)**
      const res = await axios.get(
        `http://localhost:5000/api/users/${selectedAccount}`
      );

      if (res.data.success) {
        // Save user data in App.js
        setUserData(res.data.user); // {name, email, walletAddress, role}
      }

      // **3. Update App.js login state**
      setIsLoggedIn(true);
      setUserAddress(selectedAccount);
    } catch (err) {
      console.error(err);
      setErrorMsg("Login failed. Check MetaMask connection or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {errorMsg && <p className="text-red-600 mb-3">{errorMsg}</p>}

      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Wallet to Login"}
        </button>
      ) : (
        <>
          <p>
            <span className="font-medium">Connected Account: </span>
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <p>
            <span className="font-medium">Role: </span>
            {role}
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
