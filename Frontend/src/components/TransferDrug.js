import React, { useState } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const TransferDrug = () => {
  const [drugId, setDrugId] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    const idNum = Number(drugId);
    const qtyNum = Number(quantity);
    const toAddr = toAddress.trim();

    if (isNaN(idNum) || idNum < 0) {
      return alert("Enter a valid Drug ID.");
    }
    if (!toAddr || !/^0x[a-fA-F0-9]{40}$/.test(toAddr)) {
      return alert("Enter a valid Ethereum address.");
    }
    if (isNaN(qtyNum) || qtyNum <= 0) {
      return alert("Quantity must be a positive number.");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/api/blockchain/drug/transfer`, {
        drugId: idNum,
        toAddress: toAddr,
        quantity: qtyNum,
      });

      if (res.data.success) {
        alert(
          `Drug ID ${idNum} transferred successfully!\nTxHash: ${res.data.txHash}`
        );
        setDrugId("");
        setToAddress("");
        setQuantity(1);
      } else {
        alert("Transfer failed: " + res.data.error);
      }
    } catch (err) {
      console.error("Error transferring drug:", err);
      alert(
        err.response?.data?.error ||
          "Transfer failed. Check console for details."
      );
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
          onChange={(e) => setQuantity(e.target.value)}
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
