import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AddDrug from "./components/AddDrug";
import TransferDrugs from "./components/TransferDrug";
import DisplayDrugs from "./components/DisplayDrugs";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state
  const [userAddress, setUserAddress] = useState(null); // optional to store account
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <div className="flex h-screen bg-transparent">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <div className="flex justify-end p-4 bg-gray-100 border-b border-gray-300">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setUserAddress(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <Routes>
              <Route
                path="/login"
                element={
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    setUserAddress={setUserAddress}
                    setUserData={setUserData}
                  />
                }
              />

              <Route
                path="/signup"
                element={
                  <Signup
                    setIsLoggedIn={setIsLoggedIn}
                    setUserAddress={setUserAddress}
                  />
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/add-drug" element={<AddDrug />} />
              <Route path="/transfer-drug" element={<TransferDrugs />} />
              <Route path="/display-drugs" element={<DisplayDrugs />} />
              <Route
                path="/profile"
                element={
                  <Profile userData={userData} userAddress={userAddress} />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
