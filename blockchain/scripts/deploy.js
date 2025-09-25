const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const DrugInventory = await hre.ethers.getContractFactory("DrugInventory");
  const drugInventory = await DrugInventory.deploy(); // ethers v6 auto-awaits

  console.log("DrugInventory deployed at:", drugInventory.target); // <--- full address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
