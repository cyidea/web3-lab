// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWeb3 {
    string private message = "Hello Web3";

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
