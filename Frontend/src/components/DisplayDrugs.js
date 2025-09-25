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
        allDrugs.push({
          id: drug[0].toString(),
          name: drug[1],
          manufacturer: drug[2] || "N/A",
          currentOwner: drug[3] || "N/A",
          status: ["Manufactured", "InTransit", "Delivered"][drug[4]],
          quantity: drug[5]?.toString() || "0",
          manufactureDate: drug[6], // UNIX timestamp
          expiryDate: drug[7], // UNIX timestamp
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
    return <p className="text-center mt-10 text-gray-600">Loading drugs...</p>;

  if (!drugs.length)
    return (
      <p className="text-center mt-10 text-gray-600">No drugs added yet.</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Drugs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drugs.map((drug) => (
          <div
            key={drug.id}
            className="border rounded-lg p-5 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{drug.name}</h3>
            <p>
              <span className="font-medium">ID:</span> {drug.id}
            </p>
            <p>
              <span className="font-medium">Quantity:</span> {drug.quantity}
            </p>
            <p>
              <span className="font-medium">Manufacturer:</span>{" "}
              {drug.manufacturer !== "N/A"
                ? `${drug.manufacturer.slice(0, 6)}...${drug.manufacturer.slice(
                    -4
                  )}`
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Current Owner:</span>{" "}
              {drug.currentOwner !== "N/A"
                ? `${drug.currentOwner.slice(0, 6)}...${drug.currentOwner.slice(
                    -4
                  )}`
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`font-bold ${
                  drug.status === "Delivered"
                    ? "text-green-600"
                    : drug.status === "InTransit"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              >
                {drug.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Manufacture Date:</span>{" "}
              {new Date(
                Number(drug.manufactureDate) * 1000
              ).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Expiry Date:</span>{" "}
              {new Date(Number(drug.expiryDate) * 1000).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayDrugs;
