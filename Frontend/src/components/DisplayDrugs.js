import React, { useEffect, useState } from "react";

const DisplayDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusMap = {
    0: "Manufactured",
    1: "InTransit",
    2: "Delivered",
  };

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/blockchain/drug/all");

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error: ${text}`);
      }

      const data = await res.json();

      if (data.success) {
        setDrugs(data.drugs); // ✅ Corrected key
      } else {
        console.error("Error fetching drugs:", data.error);
        setDrugs([]);
      }
    } catch (err) {
      console.error("Failed to fetch drugs via backend:", err);
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
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>

            <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center gap-2">
              💊 {drug.name}
            </h3>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">ID:</span> {drug._id}
              </p>

              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                <span className="text-blue-700 font-bold">{drug.quantity}</span>
              </p>

              <p>
                <span className="font-semibold">Manufacturer:</span>{" "}
                {drug.manufacturer
                  ? `${drug.manufacturer.slice(
                      0,
                      6
                    )}...${drug.manufacturer.slice(-4)}`
                  : "N/A"}
              </p>

              <p>
                <span className="font-semibold">Current Owner:</span>{" "}
                {drug.currentOwner
                  ? `${drug.currentOwner.slice(
                      0,
                      6
                    )}...${drug.currentOwner.slice(-4)}`
                  : "N/A"}
              </p>

              <p className="font-semibold">
                Status:{" "}
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                    statusMap[drug.status] === "Delivered"
                      ? "bg-green-600"
                      : statusMap[drug.status] === "InTransit"
                      ? "bg-yellow-600"
                      : "bg-blue-600"
                  }`}
                >
                  {statusMap[drug.status]}
                </span>
              </p>

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
