import React from "react";
import heroImage from "./hero.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* HERO SECTION */}
      <div className="relative w-full h-80 md:h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-2xl mt-6">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4 backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl animate-fadeIn">
            Welcome to <span className="text-blue-300">MediTrack</span>
          </h1>
          <p className="text-md md:text-lg max-w-3xl mt-4 opacity-90 animate-fadeIn delay-200">
            A modern, decentralized platform built to ensure{" "}
            <span className="font-semibold text-blue-300">authenticity</span>,
            <span className="font-semibold text-green-300"> safety</span>, and{" "}
            <span className="font-semibold text-purple-300">transparency</span>{" "}
            across the pharmaceutical supply chain.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE SECTION */}
      <div className="mt-12 px-6 md:px-12 w-full max-w-5xl text-center">
        <div className="bg-white/60 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-white/40 animate-slideUp">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose <span className="text-blue-600">MediTrack?</span>
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed text-lg">
            MediTrack combines the power of{" "}
            <span className="font-semibold text-blue-700">Blockchain</span>,
            <span className="font-semibold text-green-700">
              {" "}
              Smart Contracts
            </span>
            , and{" "}
            <span className="font-semibold text-purple-700">
              Off-Chain Data Management
            </span>{" "}
            to ensure a secure, tamper-proof, and transparent flow of
            pharmaceutical products.
            <br />
            <br />
            It empowers{" "}
            <span className="font-semibold text-blue-700">
              Vendors
            </span> and{" "}
            <span className="font-semibold text-green-700">Distributors</span>{" "}
            with:
          </p>

          <ul className="mt-4 text-gray-700 text-lg space-y-2">
            <li>
              <span className="font-semibold text-green-600">✔</span>{" "}
              <span className="font-semibold">
                End-to-End Drug Traceability
              </span>
            </li>
            <li>
              <span className="font-semibold text-green-600">✔</span>{" "}
              <span className="font-semibold">
                Real-Time Ownership Tracking
              </span>
            </li>
            <li>
              <span className="font-semibold text-green-600">✔</span>{" "}
              <span className="font-semibold">
                Secure Vendor–Distributor Transfers
              </span>
            </li>
            <li>
              <span className="font-semibold text-green-600">✔</span>{" "}
              <span className="font-semibold">Immutable Drug History</span>
            </li>
            <li>
              <span className="font-semibold text-green-600">✔</span>{" "}
              <span className="font-semibold">
                Fraud Prevention & Counterfeit Reduction
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12 max-w-6xl">
        {/* CARD 1 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border border-gray-200">
          <div className="text-blue-600 text-5xl mb-4">📦</div>
          <h3 className="text-2xl font-bold mb-3">Track Drugs</h3>
          <p className="text-gray-700">
            Explore detailed information on each drug including{" "}
            <span className="font-semibold text-blue-600">status</span>,{" "}
            <span className="font-semibold text-blue-600">batch details</span>,{" "}
            and{" "}
            <span className="font-semibold text-blue-600">
              ownership history
            </span>
            .
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border border-gray-200">
          <div className="text-green-600 text-5xl mb-4">🧪</div>
          <h3 className="text-2xl font-bold mb-3">Add & Manage</h3>
          <p className="text-gray-700">
            Vendors can add new drug batches and transfer them securely using{" "}
            <span className="font-semibold text-green-600">
              smart contracts
            </span>
            — ensuring limit-less transparency.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border border-gray-200">
          <div className="text-purple-600 text-5xl mb-4">🔗</div>
          <h3 className="text-2xl font-bold mb-3">Secure & Transparent</h3>
          <p className="text-gray-700">
            Powered by a{" "}
            <span className="font-semibold text-purple-600">
              tamper-proof blockchain
            </span>
            , ensuring every action is permanent, verifiable, and trustworthy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
