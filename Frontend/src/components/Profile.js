import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ isLoggedIn, userAddress }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);

      if (!isLoggedIn || !userAddress) {
        setUserInfo(null);
        setLoading(false);
        return;
      }

      // Fetch user data from backend
      const res = await axios.get(
        `http://localhost:5000/api/users/${userAddress}`
      );

      if (!res.data.success) {
        setUserInfo(null);
        return;
      }

      const user = res.data.user; // { name, email, phone, license, role, exists }

      setUserInfo({
        address: user.walletAddress || userAddress,
        role: user.role === "vendor" ? "Vendor" : "Distributor",
        exists: user.exists ?? true,
        name: user.name || null,
        email: user.email || null,
        phone: user.phone || null,
        license: user.license || null,
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

      {userInfo.name && (
        <p>
          <span className="font-medium">Name:</span> {userInfo.name}
        </p>
      )}
      {userInfo.email && (
        <p>
          <span className="font-medium">Email:</span> {userInfo.email}
        </p>
      )}
      {userInfo.phone && (
        <p>
          <span className="font-medium">Phone:</span> {userInfo.phone}
        </p>
      )}
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
