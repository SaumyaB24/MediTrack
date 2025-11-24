import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    status: { type: Number, default: 0 },
    currentOwner: { type: String },
    manufacturer: { type: String },

    manufactureDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    userId: { type: String },
    txHash: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Drug", drugSchema);
