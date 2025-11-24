import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIsLoggedIn, setUserAddress, setUserData }) => {
  const [account, setAccount] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setErrorMsg("Please install MetaMask first!");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);

      // ✅ Call backend API to get user info
      const res = await axios.get(
        `http://localhost:5000/api/users/${selectedAccount}`
      );

      if (!res.data.success) {
        setErrorMsg("Wallet not registered. Please signup first.");
        setLoading(false);
        return;
      }

      const user = res.data.user; // {name, email, ethAddress, role, ...}
      setUserData(user);
      setUserAddress(selectedAccount);

      // Normalize role to proper casing
      const roleName =
        user.role.toLowerCase() === "vendor" ? "Vendor" : "Distributor";
      setRole(roleName);

      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(
        err.response?.data?.error ||
          "Login failed. Check MetaMask connection or backend."
      );
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
