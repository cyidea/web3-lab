const assert = require("node:assert/strict");
const hre = require("hardhat");

describe("LabToken", function () {
  const INITIAL_SUPPLY = hre.ethers.parseUnits("1000", 18);

  async function deployLabToken() {
    const [owner, alice, bob, spender] = await hre.ethers.getSigners();
    const LabToken = await hre.ethers.getContractFactory("LabToken");
    const token = await LabToken.deploy(INITIAL_SUPPLY);

    return { token, owner, alice, bob, spender };
  }

  it("sets ERC-20 metadata and mints the initial supply to the deployer", async function () {
    const { token, owner } = await deployLabToken();

    assert.equal(await token.name(), "Lab Token");
    assert.equal(await token.symbol(), "LAB");
    assert.equal(await token.decimals(), 18n);
    assert.equal(await token.totalSupply(), INITIAL_SUPPLY);
    assert.equal(await token.balanceOf(owner.address), INITIAL_SUPPLY);
  });

  it("transfers tokens between accounts", async function () {
    const { token, owner, alice } = await deployLabToken();
    const amount = hre.ethers.parseUnits("25", 18);

    const tx = await token.transfer(alice.address, amount);
    await tx.wait();

    assert.equal(await token.balanceOf(alice.address), amount);
    assert.equal(await token.balanceOf(owner.address), INITIAL_SUPPLY - amount);
  });

  it("lets an approved spender transfer tokens from the owner", async function () {
    const { token, owner, bob, spender } = await deployLabToken();
    const allowance = hre.ethers.parseUnits("40", 18);
    const amount = hre.ethers.parseUnits("15", 18);

    let tx = await token.approve(spender.address, allowance);
    await tx.wait();

    assert.equal(await token.allowance(owner.address, spender.address), allowance);

    tx = await token.connect(spender).transferFrom(owner.address, bob.address, amount);
    await tx.wait();

    assert.equal(await token.balanceOf(bob.address), amount);
    assert.equal(await token.allowance(owner.address, spender.address), allowance - amount);
  });

  it("rejects transferFrom when the spender has no allowance", async function () {
    const { token, owner, bob, spender } = await deployLabToken();
    const amount = hre.ethers.parseUnits("1", 18);

    await assert.rejects(
      token.connect(spender).transferFrom(owner.address, bob.address, amount)
    );
  });
});
