const { ethers } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  // Deploy Mock USDC
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");

  const usdc = await ERC20Mock.deploy(
    "Mock USDC",
    "USDC",
    deployer.address,
    ethers.parseUnits("1000000", 6)
  );

  await usdc.waitForDeployment();

  console.log("USDC deployed:", usdc.target);

  // Deploy CommerceCore
  const CommerceCore = await ethers.getContractFactory("CommerceCore");

  const commerce = await CommerceCore.deploy(
    usdc.target,
    ethers.ZeroAddress
  );

  await commerce.waitForDeployment();

  console.log("CommerceCore deployed:", commerce.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});