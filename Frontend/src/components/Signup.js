import React, { useState } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const Signup = ({ setIsLoggedIn, setUserAddress, setUserData }) => {
  const [role, setRole] = useState("Vendor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !license || !phone) {
      alert("Please fill all required fields.");
      return;
    }

    if (!window.ethereum) {
      alert("Please install MetaMask first!");
      return;
    }

    setLoading(true);

    try {
      // Connect wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const ethAddress = accounts[0];

      // Call backend signup API
      const res = await axios.post(`${API_BASE}/api/users/signup`, {
        ethAddress,
        name,
        email,
        phone,
        license,
        role,
      });

      if (res.data.success) {
        alert("User registered successfully!");
        setIsLoggedIn(true);
        setUserAddress(ethAddress);
        setUserData(res.data.user);
      } else {
        alert("Signup failed: " + res.data.error);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert(
        err.response?.data?.error || "Signup failed. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
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
