import React, { useState } from "react";

const AddDrug = () => {
  const [drugName, setDrugName] = useState("");
  const [quantity, setQuantity] = useState("1"); // store as string
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddDrug = async () => {
    if (!drugName) return alert("Please enter a drug name.");
    if (!quantity || Number(quantity) <= 0)
      return alert("Quantity must be greater than 0.");
    if (!expiryDate) return alert("Please select expiry date.");

    setLoading(true);

    try {
      // Convert expiry date to Unix timestamp (string)
      const expiryTimestamp = Math.floor(
        new Date(expiryDate).getTime() / 1000
      ).toString();
      const manufactureTimestamp = Math.floor(Date.now() / 1000).toString();

      // Call backend API
      const response = await fetch(
        "http://localhost:5000/api/blockchain/drug/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: drugName,
            quantity: quantity, // string
            manufactureDate: manufactureTimestamp,
            expiryDate: expiryTimestamp,
            userId: "frontend-user",
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error: ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        alert(`Drug "${drugName}" added successfully!\nTxHash: ${data.txHash}`);
        setDrugName("");
        setQuantity("1");
        setExpiryDate("");
      } else {
        alert("Error adding drug: " + data.error);
      }
    } catch (err) {
      console.error("Failed to add drug via backend:", err);
      alert("Something went wrong! See console for details.");
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
          onChange={(e) => setQuantity(e.target.value)}
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
