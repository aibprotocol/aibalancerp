// deployContracts.ts
/**
 * Script to deploy smart contracts
 */

import { ethers } from "hardhat";

async function main() {
    console.log("Deploying contracts...");

    // Deploy AIBalancer contract
    const AIBalancer = await ethers.getContractFactory("AIBalancer");
    const aibalancer = await AIBalancer.deploy();
    await aibalancer.deployed();
    console.log(`AIBalancer deployed to: ${aibalancer.address}`);

    // Deploy Token contract
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(ethers.utils.parseEther("1000000")); // 1 million tokens
    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);

    // Deploy Staking contract
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(token.address);
    await staking.deployed();
    console.log(`Staking deployed to: ${staking.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
