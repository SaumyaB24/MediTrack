import React, { useState } from "react";
import { getContract } from "../contract/connection";

const Signup = ({ setIsLoggedIn, setUserAddress }) => {
  const [role, setRole] = useState("Vendor");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const roleId = role === "Vendor" ? 1 : 2; // match contract Role enum

      const tx = await contract.registerUser(roleId);
      await tx.wait();

      // ✅ Update App state after successful signup
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setIsLoggedIn(true);
      setUserAddress(accounts[0]);

      alert("User registered successfully!");
    } catch (err) {
      console.error("Error registering user:", err);
      alert(
        "Failed to register. Maybe already registered or MetaMask not connected to Hardhat."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="Vendor">Vendor</option>
          <option value="Distributor">Distributor</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">License Number</label>
        <input
          type="text"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          placeholder="Enter License No"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone No"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Signup"}
      </button>
    </div>
  );
};

export default Signup;
