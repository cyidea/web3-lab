# Web3 Lab

An incremental Hardhat lab for learning Web3 fundamentals hands-on: Solidity contracts, deployment scripts, tests, and eventually DeFi, NFTs, and infrastructure experiments.

The first lab is `HelloWeb3`, a tiny smart contract that stores a message and lets it be updated.

The second lab is `LabToken`, a fixed-supply ERC-20 token built with OpenZeppelin Contracts.

## What Hardhat Is

Hardhat is a local Ethereum development environment. In this repo it is used to:

- compile Solidity contracts into artifacts that JavaScript can deploy and call;
- run tests against a temporary local Ethereum network;
- provide test accounts with fake ETH so transactions can be sent immediately;
- run deployment scripts without needing a real wallet, testnet, or gas money.

When you run `hardhat test` or `hardhat run`, Hardhat starts an in-memory blockchain, executes the script or tests, and then throws that chain away. That is why contract addresses and account balances reset between runs.

## Current Project

- `contracts/HelloWeb3.sol` - the first Solidity contract in the lab.
- `contracts/LabToken.sol` - an ERC-20 token named `Lab Token` with symbol `LAB`.
- `scripts/deploy.js` - deploys `HelloWeb3`, reads the initial message, updates it, and reads it again.
- `scripts/deploy-token.js` - deploys `LabToken`, reads metadata and balances, transfers tokens, and approves a spender.
- `test/HelloWeb3.js` - tests the initial message and update flow.
- `test/LabToken.js` - tests ERC-20 metadata, initial supply, transfers, approvals, and allowance spending.
- `hardhat.config.js` - Hardhat configuration using Solidity `0.8.28`.

## Requirements

- Node.js 18 or newer
- npm

## Quick Start

```shell
npm install
npm run compile
npm test
```

## Commands

Deploy `HelloWeb3` to the local in-memory Hardhat network:

```shell
npm run deploy:hello
```

Deploy `LabToken` to the local in-memory Hardhat network:

```shell
npm run deploy:token
```

## ERC-20 Lab

`LabToken` is intentionally small:

```solidity
contract LabToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Lab Token", "LAB") {
        _mint(msg.sender, initialSupply);
    }
}
```

The contract inherits OpenZeppelin's ERC-20 implementation instead of hand-writing token accounting. OpenZeppelin provides the standard behavior for:

- `name()` - human-readable token name, here `Lab Token`;
- `symbol()` - ticker-like token symbol, here `LAB`;
- `decimals()` - display precision, defaulting to `18`;
- `totalSupply()` - total token units currently minted;
- `balanceOf(account)` - token balance for an account;
- `transfer(to, amount)` - move your own tokens;
- `approve(spender, amount)` - allow another account or contract to spend your tokens;
- `allowance(owner, spender)` - read the remaining approved amount;
- `transferFrom(owner, to, amount)` - spend tokens using an allowance.

The deploy script creates `1000` tokens using `ethers.parseUnits("1000", 18)`. Internally that is stored as `1000 * 10^18` base units, similar to how `1 ETH` is stored as `10^18` wei.

Run the ERC-20 tests with:

```shell
npm test
```

The `LabToken` tests cover:

- the token metadata: name, symbol, and decimals;
- initial minting of the full supply to the deployer;
- direct transfers between accounts;
- approvals and `transferFrom`;
- rejected allowance spending when no approval exists.

## What To Watch Out For

- Local deployments are temporary. `npm run deploy:token` uses Hardhat's in-memory network unless you configure another network, so the printed address only exists for that run.
- Token amounts are integers. Use `ethers.parseUnits("25", 18)` when sending `25 LAB`; do not use JavaScript floating point numbers for token math.
- `decimals()` is only display metadata. It does not change contract arithmetic. A token balance of `1000000000000000000` displays as `1.0` when decimals are `18`.
- `approve` gives spending permission. In real applications, unlimited approvals are convenient but risky because the spender can move tokens until the allowance is reduced or used up.
- `transferFrom` spends allowance from the token owner, not from the caller's balance. That pattern is common in DeFi because contracts need permission to pull tokens from users.
- This token has no owner-only minting, burning, pausing, blacklist, tax, or upgrade feature. That is intentional for the learning checkpoint.
- OpenZeppelin is a dependency. If you clone this repo somewhere else, run `npm install` before compiling.

## Learning Roadmap

This repo is meant to grow one small checkpoint at a time.

1. `HelloWeb3` - deploy a contract, read state, write state, test behavior.
   - Solidity smart contract introduction - https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html
2. `LabToken` ERC-20 token - learn fungible tokens, balances, transfers, allowances, and events.
   - Ethereum ERC-20 token standard overview - https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
   - OpenZeppelin ERC-20 implementation guide - https://docs.openzeppelin.com/contracts/5.x/erc20
3. Token Playground UI - make ERC-20 behavior visible in a small local app.
   - Display the connected/local account, token metadata, total supply, balances, transfers, approvals, allowances, and transaction results.
   - Use this checkpoint to clarify reads vs. writes, token units vs. display decimals, and why allowances matter before moving to NFTs.
   - ethers.js getting started - https://docs.ethers.org/v6/getting-started/
4. ERC-721 NFT - learn minting, ownership, token metadata, and collection basics.
   - Ethereum ERC-721 token standard overview - https://ethereum.org/en/developers/docs/standards/tokens/erc-721/
   - OpenZeppelin ERC-721 implementation guide - https://docs.openzeppelin.com/contracts/5.x/erc721
   - OpenSea metadata standards - https://docs.opensea.io/docs/metadata-standards
5. Toy AMM - learn liquidity pools, swaps, reserves, and constant-product pricing.
   - Uniswap AMM concepts - https://developers.uniswap.org/docs/get-started/concepts/how-uniswap-works
   - Uniswap V2 pair contract reference - https://docs.uniswap.org/contracts/v2/reference/smart-contracts/pair
   - Uniswap V2 whitepaper - https://uniswap.org/whitepaper.pdf
6. Infrastructure - learn local nodes, testnets, contract verification, indexing, and frontend reads/writes.
   - Hardhat Network overview - https://v2.hardhat.org/hardhat-network/docs/overview
   - Hardhat live network deployment tutorial - https://v2.hardhat.org/tutorial/deploying-to-a-live-network
   - Hardhat contract verification plugin - https://v2.hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify
   - The Graph quick start - https://thegraph.com/docs/en/quick-start/
   - ethers.js getting started - https://docs.ethers.org/v6/getting-started/

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
