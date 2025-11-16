import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {
    drugName: String,
    quantity: Number,
    expiryTimestamp: Number,
    txHash: String,
  },
  { timestamps: true }
);

export default mongoose.model("Drug", drugSchema);
