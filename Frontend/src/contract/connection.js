import { ethers } from "ethers";
import DrugInventoryABI from "./DrugInventory.json";

const RAW_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const CONTRACT_ADDRESS = ethers.getAddress(RAW_ADDRESS); // checksum

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");

  // Switch MetaMask to Hardhat local network (chainId 31337)
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x7a69" }], // 31337 in hex
    });
  } catch (switchError) {
    // Add network if missing
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x7a69",
            chainName: "Hardhat Localhost",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: {
              name: "HardhatETH",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw switchError;
    }
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, DrugInventoryABI.abi, signer);
};
