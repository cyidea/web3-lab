# Token Playground UI Plan

## Goal

Build a small local UI that makes the `LabToken` ERC-20 contract easier to understand.

The purpose is not to build a production dapp yet. The purpose is to make token mechanics visible:

- who owns tokens;
- how balances change after transfers;
- how approvals create spending permission;
- how `transferFrom` uses that permission;
- which actions are free reads and which actions are blockchain writes.

This checkpoint should happen after the ERC-20 lab and before the ERC-721 NFT lab.

## Recommended Approach

Use a small Vite + React frontend inside this repo.

Suggested structure:

```text
web3-lab/
  contracts/
  scripts/
  test/
  frontend/
    src/
      App.jsx
      main.jsx
      token.js
      deployment.json
    package.json
    vite.config.js
```

Use `ethers` in the frontend to connect directly to a local Hardhat node at:

```text
http://127.0.0.1:8545
```

Avoid MetaMask for this first UI. MetaMask is useful later, but it adds network setup, account imports, popups, and wallet-specific behavior. For this learning step, use Hardhat's local accounts directly so the UI can focus on ERC-20 behavior.

## Local Workflow

Run the local chain:

```shell
npx hardhat node
```

Deploy the token to the local chain:

```shell
npx hardhat run scripts/deploy-token.js --network localhost
```

Run the frontend:

```shell
cd frontend
npm install
npm run dev
```

## Deployment Data

Adjust the token deploy script so the frontend can discover the deployed token address without manual copy and paste.

Recommended file:

```text
frontend/src/deployment.json
```

Example contents:

```json
{
  "network": "localhost",
  "chainId": 31337,
  "labToken": "0x..."
}
```

The frontend can import this JSON and combine it with the compiled `LabToken` ABI from Hardhat artifacts.

## UI Scope

Keep the first version narrow.

Include:

- token summary: contract address, name, symbol, decimals, total supply;
- account selector: deployer, Alice, Bob, spender;
- selected account ETH balance;
- ERC-20 balances for the local accounts;
- transfer form: from selected account, to account, amount;
- approval form: owner account, spender account, amount;
- allowance viewer: owner plus spender to current allowance;
- transaction log: latest transaction hash, status, and short description.

Do not include yet:

- MetaMask;
- testnet deployment;
- routing;
- backend API;
- database;
- charts;
- token price data;
- indexing;
- production wallet libraries;
- NFT marketplace behavior.

## Key Learning Moments

The UI should make these concepts obvious:

- `balanceOf(account)` is a read. It does not cost gas on a local read call.
- `transfer(to, amount)` is a write. It creates a transaction and changes balances.
- `approve(spender, amount)` does not move tokens. It only gives permission.
- `allowance(owner, spender)` is permission remaining, not a token balance.
- `transferFrom(owner, to, amount)` lets the spender move tokens from the owner after approval.
- Token values are stored as integers. `1 LAB` with `18` decimals is stored as `1000000000000000000`.
- `ethers.parseUnits("25", 18)` converts display units into token base units.
- `ethers.formatUnits(value, 18)` converts token base units back into display units.
- Local Hardhat deployments are temporary. Restarting the node means redeploying contracts.

## Suggested Implementation Steps

1. Create the Vite React frontend under `frontend/`.
2. Add `ethers` as the frontend dependency.
3. Update `scripts/deploy-token.js` to write `frontend/src/deployment.json` when deploying to localhost.
4. Add a small frontend helper that loads the provider, local signers, token ABI, and deployed token address.
5. Build the token summary and balances view.
6. Add transfers.
7. Add approvals and allowance display.
8. Add `transferFrom` as an explicit demonstration of allowance spending.
9. Add a compact transaction log.
10. Update the README with the new UI commands.

## Design Direction

Make it a working lab interface, not a landing page.

The first screen should be the actual token playground. Use a quiet, practical layout:

- a token summary header;
- account and balance panels;
- transfer and approval controls;
- transaction log near the bottom or side.

Avoid decorative marketing sections. The UI should help compare balances before and after actions.
