const hre = require("hardhat");

async function main() {
  // 1️⃣ Get test accounts
  const [vendor, distributor] = await hre.ethers.getSigners();
  console.log("Vendor:", vendor.address);
  console.log("Distributor:", distributor.address);

  // 2️⃣ Deploy DrugInventory contract
  const DrugInventory = await hre.ethers.getContractFactory("DrugInventory");
  const contract = await DrugInventory.deploy();
  await contract.deployed();
  console.log("DrugInventory deployed at:", contract.address);

  // 3️⃣ Register users
  console.log("\nRegistering users...");
  let tx = await contract.connect(vendor).registerUser(
    vendor.address,
    0, // internal userId
    0, // Role: 0 = Vendor
    "VENDOR123", // License No
    "vendor@email.com",
    "9999999999"
  );
  await tx.wait();

  tx = await contract.connect(distributor).registerUser(
    distributor.address,
    1, // internal userId
    1, // Role: 1 = Distributor
    "DIST123", // License No
    "distributor@email.com",
    "8888888888"
  );
  await tx.wait();

  console.log("Users registered.");

  // 4️⃣ Vendor adds a drug
  console.log("\nVendor adding a drug...");
  tx = await contract.connect(vendor).addDrug("Paracetamol");
  await tx.wait();
  console.log("Drug added.");

  // 5️⃣ Vendor transfers drug to distributor
  console.log("\nTransferring drug to distributor...");
  tx = await contract.connect(vendor).transferDrug(0, distributor.address);
  await tx.wait();
  console.log("Drug transferred.");

  // 6️⃣ Distributor delivers drug to customer
  console.log("\nDistributor delivering drug to customer...");
  const customerAddress = "0x0000000000000000000000000000000000000001"; // Example customer
  tx = await contract.connect(distributor).transferDrug(0, customerAddress);
  await tx.wait();
  console.log("Drug delivered.");

  // 7️⃣ Check final drug info
  const drug = await contract.getDrug(0);
  console.log("\nFinal drug info:");
  console.log({
    id: drug[0].toString(),
    name: drug[1],
    manufacturer: drug[2],
    currentOwner: drug[3],
    status: drug[4].toString(),
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
