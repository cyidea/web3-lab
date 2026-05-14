// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LabToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Lab Token", "LAB") {
        _mint(msg.sender, initialSupply);
    }
}
