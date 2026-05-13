const hre = require("hardhat");

async function main() {
  const HelloWeb3 = await hre.ethers.getContractFactory("HelloWeb3");
  const hello = await HelloWeb3.deploy();

  await hello.waitForDeployment();

  console.log("Deployed to:", await hello.getAddress());

  console.log("Initial message:", await hello.getMessage());

  const tx = await hello.setMessage("Blockchain is alive");

  await tx.wait();

  console.log("Updated message:", await hello.getMessage());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
