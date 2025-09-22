// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DrugInventory {

    struct User {
        string userType; // Vendor or Distributor
        uint256 userId;  // internal DB ID
        string licenseNo;
        string email;
        string phone;
    }

    mapping(uint256 => User) public users;

    // Add a new user
    function addUser(
        uint256 _userId,
        string memory _userType,
        string memory _licenseNo,
        string memory _email,
        string memory _phone
    ) public {
        users[_userId] = User(_userType, _userId, _licenseNo, _email, _phone);
    }

    // Retrieve a user
    function getUser(uint256 _userId) public view returns (User memory) {
        return users[_userId];
    }
}

