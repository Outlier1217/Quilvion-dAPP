require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

module.exports = {
  solidity: "0.8.20",

  networks: {
    skale_base_sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 324705682
    }
  }
};