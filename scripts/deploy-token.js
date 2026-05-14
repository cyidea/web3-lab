const hre = require("hardhat");

async function main() {
  const [deployer, alice, spender] = await hre.ethers.getSigners();
  const initialSupply = hre.ethers.parseUnits("1000", 18);

  const LabToken = await hre.ethers.getContractFactory("LabToken");
  const token = await LabToken.deploy(initialSupply);

  await token.waitForDeployment();

  console.log("LabToken deployed to:", await token.getAddress());
  console.log("Deployer:", deployer.address);
  console.log("Name:", await token.name());
  console.log("Symbol:", await token.symbol());
  console.log("Decimals:", String(await token.decimals()));
  console.log("Total supply:", hre.ethers.formatUnits(await token.totalSupply(), 18), "LAB");
  console.log("Deployer balance:", hre.ethers.formatUnits(await token.balanceOf(deployer.address), 18), "LAB");

  let tx = await token.transfer(alice.address, hre.ethers.parseUnits("25", 18));
  await tx.wait();

  console.log("Alice balance after transfer:", hre.ethers.formatUnits(await token.balanceOf(alice.address), 18), "LAB");

  tx = await token.approve(spender.address, hre.ethers.parseUnits("10", 18));
  await tx.wait();

  console.log("Spender allowance:", hre.ethers.formatUnits(await token.allowance(deployer.address, spender.address), 18), "LAB");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
