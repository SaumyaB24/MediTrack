import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Initialize provider ----------
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

provider
  .getNetwork()
  .then((network) => console.log("Connected to network:", network.name))
  .catch((err) => console.error("Provider connection error:", err));

// ---------- Initialize wallet ----------
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log("Wallet address:", wallet.address);

// ---------- Load ABI ----------
const abiPath = path.join(__dirname, "DrugInventory.json");
if (!fs.existsSync(abiPath)) {
  throw new Error(
    `ABI not found at ${abiPath}. Please copy your contract ABI there.`
  );
}

const artifact = JSON.parse(fs.readFileSync(abiPath, "utf8"));
const abi = artifact.abi || artifact;

// ---------- Initialize contract ----------
const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) throw new Error("CONTRACT_ADDRESS not set in .env");

const contract = new ethers.Contract(contractAddress, abi, wallet);
console.log("Contract loaded at:", contractAddress);
console.log("contract Interface:", contract.interface);

// ---------- Export ----------
export { provider, wallet, contract, ethers };
