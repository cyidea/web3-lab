const assert = require("node:assert/strict");
const hre = require("hardhat");

describe("HelloWeb3", function () {
  async function deployHelloWeb3() {
    const HelloWeb3 = await hre.ethers.getContractFactory("HelloWeb3");
    return HelloWeb3.deploy();
  }

  it("starts with the default message", async function () {
    const hello = await deployHelloWeb3();

    assert.equal(await hello.message(), "Hello Web3");
  });

  it("updates the message", async function () {
    const hello = await deployHelloWeb3();

    const tx = await hello.setMessage("Blockchain is alive");
    await tx.wait();

    assert.equal(await hello.message(), "Blockchain is alive");
  });
});
