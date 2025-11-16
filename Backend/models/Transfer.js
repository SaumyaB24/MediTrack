import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    drugId: Number,
    toAddress: String,
    quantity: Number,
    txHash: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", transferSchema);
