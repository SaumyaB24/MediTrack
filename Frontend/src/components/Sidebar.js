import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">
        MediTrack
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-drug"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Add Drug
            </Link>
          </li>
          <li>
            <Link
              to="/transfer-drug"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Transfer Drug
            </Link>
          </li>
          <li>
            <Link
              to="/display-drugs"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Display Drugs
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
