// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Staking
 * @dev Contract for staking tokens and earning rewards
 */
contract Staking {
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public rewards;
    address public tokenAddress;
    uint256 public rewardRate = 100; // Reward per token staked

    event Stake(address indexed user, uint256 amount);
    event Unstake(address indexed user, uint256 amount);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Stake amount must be greater than 0");
        stakes[msg.sender] += amount;
        rewards[msg.sender] += amount * rewardRate;
        emit Stake(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakes[msg.sender] >= amount, "Insufficient staked balance");
        stakes[msg.sender] -= amount;
        rewards[msg.sender] -= amount * rewardRate;
        emit Unstake(msg.sender, amount);
    }

    function getStakedBalance() external view returns (uint256) {
        return stakes[msg.sender];
    }

    function getRewards() external view returns (uint256) {
        return rewards[msg.sender];
    }
}
