import React, { useState } from "react";
import { getContract } from "../contract/connection";

const TransferDrug = () => {
  const [drugId, setDrugId] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!drugId || !toAddress || quantity <= 0)
      return alert("Enter all details correctly.");

    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.transferDrug(drugId, toAddress, quantity);
      await tx.wait();
      alert(`Drug ID ${drugId} transferred successfully!`);
      setDrugId("");
      setToAddress("");
      setQuantity(1);
    } catch (err) {
      console.error("Error transferring drug:", err);
      alert("Transfer failed. Make sure the account and quantity are correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Transfer Drug</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Drug ID</label>
        <input
          type="number"
          placeholder="Enter Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Recipient Address</label>
        <input
          type="text"
          placeholder="Enter Recipient Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={handleTransfer}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Transferring..." : "Transfer Drug"}
      </button>
    </div>
  );
};

export default TransferDrug;
