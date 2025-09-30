// const { Router } = require("express");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const { ethers } =  require("ethers");
// // const contractAbi = require("../abi/DrugSupply.json");

// const router = Router();
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractAbi, wallet);

// router.post("/add", async (req, res) => {
//   const { drugId, name, details } = req.body;

//   try {
//     const tx = await contract.addDrug(drugId, name, details);
//     await tx.wait();

//     res.json({ success: true, message: "Drug added successfully" });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// });

// router.post("/transfer", async (req, res) => {
//   const { drugId, toAddress } = req.body;

//   try {
//     const tx = await contract.transferDrug(drugId, toAddress);
//     await tx.wait();

//     res.json({ success: true, message: "Drug transferred successfully" });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// });

// router.get("/profile/:userAddress", async (req, res) => {
//   try {
//     const info = await contract.getUser(req.params.userAddress);
//     res.json({ success: true, profile: info });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// });
