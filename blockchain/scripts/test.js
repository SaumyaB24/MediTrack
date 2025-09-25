const hre = require("hardhat");

async function main() {
  const [vendor, distributor] = await hre.ethers.getSigners();

  const DrugInventory = await hre.ethers.getContractFactory("DrugInventory");
  const contract = await DrugInventory.attach(
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
  );

  // Register users
  await contract.connect(vendor).registerUser(0);
  await contract.connect(distributor).registerUser(1);

  // Add drug
  await contract.connect(vendor).addDrug("Paracetamol");

  // Transfer drug
  await contract.connect(vendor).transferDrug(0, distributor.address);

  // Get drug info
  const drug = await contract.getDrug(0);
  console.log(drug);
}

main().catch(console.error);
