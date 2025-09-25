import React from "react";
import heroImage from "./hero.jpg";
const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg mt-6">
        {/* Replace src with your hero image */}
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to MediTrack
          </h1>
          <p className="text-md md:text-lg max-w-2xl">
            Your decentralized solution to track, manage, and ensure the
            integrity of pharmaceutical products from vendors to distributors.
          </p>
        </div>
      </div>

      {/* Features / Highlights */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Track Drugs</h3>
          <p>
            View all available drugs, their status, manufacture and expiry
            dates, and current ownership.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Add & Manage</h3>
          <p>
            Vendors can add new drugs with details like quantity and expiry, and
            transfer to distributors securely.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
          <p>
            Powered by blockchain, all transactions are immutable, ensuring
            trust and transparency throughout the supply chain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
