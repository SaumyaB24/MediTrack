import React, { useEffect, useState } from "react";
import { getContract } from "../contract/connection";

const DisplayDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrugs = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const drugCount = await contract.drugCount();
      const allDrugs = [];

      for (let i = 0; i < drugCount; i++) {
        const drug = await contract.getDrug(i);
        const ownerAddress = drug[3];

        // Fetch owner name from backend
        let ownerName = "Unknown Owner";
        if (ownerAddress !== "0x0000000000000000000000000000000000000000") {
          try {
            const res = await fetch(
              `http://localhost:5000/api/users?ethAddress=${ownerAddress}`
            );
            if (res.ok) {
              const data = await res.json();
              ownerName = data.name || "Unnamed";
            }
          } catch (err) {
            console.log("Owner not found in DB");
          }
        }

        allDrugs.push({
          id: drug[0].toString(),
          name: drug[1],
          manufacturer: drug[2] || "N/A",
          currentOwner: ownerAddress,
          ownerName: ownerName, // ⭐ ADD THIS
          status: ["Manufactured", "InTransit", "Delivered"][drug[4]],
          quantity: drug[5]?.toString() || "0",
          manufactureDate: drug[6],
          expiryDate: drug[7],
        });
      }

      setDrugs(allDrugs);
    } catch (err) {
      console.error("Error fetching drugs:", err);
      setDrugs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">
        Loading drugs...
      </p>
    );

  if (!drugs.length)
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        No drugs added yet.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900">
        Available Drugs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drugs.map((drug) => (
          <div
            key={drug.id}
            className="relative bg-white/60 backdrop-blur-xl border border-white/40 
                       shadow-xl rounded-2xl p-6 transition-all duration-300
                       hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>

            <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center gap-2">
              💊 {drug.name}
            </h3>

            {/* GRID INFO */}
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">ID:</span> {drug.id}
              </p>

              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                <span className="text-blue-700 font-bold">{drug.quantity}</span>
              </p>

              <p>
                <span className="font-semibold">Manufacturer:</span>{" "}
                {drug.manufacturer !== "N/A"
                  ? `${drug.manufacturer.slice(
                      0,
                      6
                    )}...${drug.manufacturer.slice(-4)}`
                  : "N/A"}
              </p>

              <p>
                <span className="font-medium">Current Owner:</span>{" "}
                <span className="text-blue-700 font-bold">
                  {drug.ownerName}
                </span>
                <br />
                <span className="text-gray-600 text-sm">
                  ({drug.currentOwner.slice(0, 6)}...
                  {drug.currentOwner.slice(-4)})
                </span>
              </p>

              {/* STATUS BADGE */}
              <p className="font-semibold">
                Status:{" "}
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                    drug.status === "Delivered"
                      ? "bg-green-600"
                      : drug.status === "InTransit"
                      ? "bg-yellow-600"
                      : "bg-blue-600"
                  }`}
                >
                  {drug.status}
                </span>
              </p>

              {/* DATES */}
              <p>
                <span className="font-semibold">Manufacture Date:</span>{" "}
                {new Date(
                  Number(drug.manufactureDate) * 1000
                ).toLocaleDateString()}
              </p>

              <p>
                <span className="font-semibold">Expiry Date:</span>{" "}
                {new Date(Number(drug.expiryDate) * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayDrugs;
