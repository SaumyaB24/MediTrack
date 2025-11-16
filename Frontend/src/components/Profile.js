import React, { useEffect, useState } from "react";
import axios from "axios";
import { getContract } from "../contract/connection";

const Profile = ({ isLoggedIn, userAddress }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);

      // If logged out → clear
      if (!isLoggedIn || !userAddress) {
        setUserInfo(null);
        setLoading(false);
        return;
      }

      // ---- 1️⃣ Fetch Blockchain Data ----
      const contract = await getContract();
      const userOnChain = await contract.users(userAddress);

      const roleOnChain = ["None", "Vendor", "Distributor"][userOnChain.role];

      // ---- 2️⃣ Fetch Backend Data ----
      let userOffChain = null;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${userAddress}`
        );

        if (res.data.success) {
          userOffChain = res.data.user;
        }
      } catch (err) {
        console.warn("No off-chain user data found.");
      }

      // ---- 3️⃣ Combine Data ----
      setUserInfo({
        address: userAddress,
        role: roleOnChain,
        exists: userOnChain.exists,
        name: userOffChain?.name || null,
        email: userOffChain?.email || null,
        phone: userOffChain?.phone || null,
        license: userOffChain?.license || null,
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn, userAddress]);

  if (!isLoggedIn)
    return (
      <p className="text-center mt-10 text-gray-600">
        Please log in to view profile.
      </p>
    );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );

  if (!userInfo)
    return (
      <p className="text-center mt-10 text-gray-600">No user info found.</p>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

      {/* Name */}
      {userInfo.name && (
        <p>
          <span className="font-medium">Name:</span> {userInfo.name}
        </p>
      )}

      {/* Email */}
      {userInfo.email && (
        <p>
          <span className="font-medium">Email:</span> {userInfo.email}
        </p>
      )}

      {/* Phone */}
      {userInfo.phone && (
        <p>
          <span className="font-medium">Phone:</span> {userInfo.phone}
        </p>
      )}

      {/* License */}
      {userInfo.license && (
        <p>
          <span className="font-medium">License No:</span> {userInfo.license}
        </p>
      )}

      <p>
        <span className="font-medium">Role:</span> {userInfo.role}
      </p>

      <p>
        <span className="font-medium">Ethereum Address:</span>{" "}
        {userInfo.address}
      </p>

      <p>
        <span className="font-medium">Registered on Blockchain:</span>{" "}
        {userInfo.exists ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Profile;
