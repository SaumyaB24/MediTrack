import React, { useState } from "react";
import { getContract } from "../contract/connection";

const AddDrug = () => {
  const [drugName, setDrugName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddDrug = async () => {
    if (!drugName) return alert("Please enter a drug name.");
    if (quantity <= 0) return alert("Quantity must be greater than 0.");
    if (!expiryDate) return alert("Please select expiry date.");

    try {
      setLoading(true);
      const contract = await getContract();
      const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);
      const tx = await contract.addDrug(drugName, quantity, expiryTimestamp);
      await tx.wait();

      // ⬇️ AFTER tx.wait()
      await fetch("http://localhost:5000/api/drugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          drugName,
          quantity,
          expiryTimestamp,
          txHash: tx.hash,
        }),
      });

      alert(`Drug "${drugName}" (Qty: ${quantity}) added successfully!`);
      setDrugName("");
      setQuantity(1);
      setExpiryDate("");
    } catch (err) {
      console.error("Error adding drug:", err);
      alert(
        "Failed to add drug. Make sure your account is a Vendor and connected to Hardhat."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Drug</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Drug Name</label>
        <input
          type="text"
          placeholder="Enter drug name"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleAddDrug}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Adding..." : "Add Drug"}
      </button>
    </div>
  );
};

export default AddDrug;
