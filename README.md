# Web3 Lab

An incremental Hardhat lab for learning Web3 fundamentals hands-on: Solidity contracts, deployment scripts, tests, and eventually DeFi, NFTs, and infrastructure experiments.

The current first lab is `HelloWeb3`, a tiny smart contract that stores a message and lets it be updated.

## Current Project

- `contracts/HelloWeb3.sol` - the first Solidity contract in the lab.
- `scripts/deploy.js` - deploys `HelloWeb3`, reads the initial message, updates it, and reads it again.
- `test/HelloWeb3.js` - tests the initial message and update flow.
- `hardhat.config.js` - Hardhat configuration using Solidity `0.8.28`.

## Requirements

- Node.js 18 or newer
- npm

Install dependencies:

```shell
npm install
```

## Commands

Compile contracts:

```shell
npm run compile
```

Run tests:

```shell
npm test
```

Deploy `HelloWeb3` to the local in-memory Hardhat network:

```shell
npm run deploy:hello
```

## Learning Roadmap

This repo is meant to grow one small checkpoint at a time.

1. `HelloWeb3` - deploy a contract, read state, write state, test behavior.
2. ERC-20 token - learn fungible tokens, balances, transfers, allowances, and events.
3. ERC-721 NFT - learn minting, ownership, token metadata, and collection basics.
4. Toy AMM - learn liquidity pools, swaps, reserves, and constant-product pricing.
5. Infrastructure - learn local nodes, testnets, contract verification, indexing, and frontend reads/writes.

## GitHub Notes

The `.gitignore` excludes local and generated files such as `node_modules`, `.env`, `cache`, `artifacts`, coverage output, and local Hardhat Ignition deployments.

Suggested first commit:

```shell
git init
git add .
git commit -m "day-001: hello web3 contract"
```

## Suggested Reading

If you are new to this area, read these in roughly this order:

1. Ethereum basics - https://ethereum.org/en/developers/docs/

   Start here for the big picture: accounts, transactions, gas, smart contracts, and how Ethereum works.

2. Solidity introduction - https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html

   Solidity is the language used for the contracts in this repo.

3. Hardhat getting started - https://hardhat.org/docs

   Hardhat is the local development environment used to compile, test, and run deployment scripts.

4. ethers.js documentation - https://docs.ethers.org/v6/

   ethers.js is the JavaScript library used by the deploy script to talk to contracts.

5. OpenZeppelin Contracts - https://docs.openzeppelin.com/contracts/5.x/

   OpenZeppelin provides standard, audited building blocks for tokens, NFTs, access control, and other common contract patterns. This will become more useful once the lab reaches ERC-20 and NFT examples.

6. CryptoZombies - https://cryptozombies.io/

   A beginner-friendly interactive Solidity tutorial. It is a little game-like, but useful for getting comfortable writing contracts.

For now, focus on understanding accounts, transactions, contract state, reads vs. writes, gas, and events. DeFi and NFTs will make much more sense after those pieces feel familiar.
