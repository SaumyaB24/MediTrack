import React, { useState, useEffect } from "react";
import { getContract } from "../contract/connection";

const Login = ({ setIsLoggedIn, setUserAddress }) => {
  const [account, setAccount] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask first!");
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);

      const contract = await getContract();
      const user = await contract.users(selectedAccount);

      if (!user.exists) {
        setRole("Not registered");
        alert("This wallet is not registered. Please signup first.");
      } else {
        const roleName = user.role === 1 ? "Vendor" : "Distributor";
        setRole(roleName);

        // ✅ Update App.js state so navbar switches to Logout
        setIsLoggedIn(true);
        setUserAddress(selectedAccount);
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      alert("Failed to connect wallet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {account ? (
        <>
          <p>
            <span className="font-medium">Connected Account:</span>{" "}
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <p>
            <span className="font-medium">Role:</span> {role}
          </p>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default Login;
