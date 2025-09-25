import React, { useEffect, useState } from "react";
import { getContract } from "../contract/connection";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const contract = await getContract();

      // Get the connected account from the provider
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      // Fetch user info from contract
      const user = await contract.users(account);
      const role = ["None", "Vendor", "Distributor"][user.role];

      setUserInfo({
        address: account,
        role: role,
        exists: user.exists,
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
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  if (!userInfo || !userInfo.exists)
    return (
      <p className="text-center mt-10 text-gray-600">
        No user info found. Please sign up.
      </p>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
      <p>
        <span className="font-medium">Ethereum Address:</span>{" "}
        {userInfo.address}
      </p>
      <p>
        <span className="font-medium">Role:</span> {userInfo.role}
      </p>
      <p>
        <span className="font-medium">Registered:</span>{" "}
        {userInfo.exists ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Profile;
