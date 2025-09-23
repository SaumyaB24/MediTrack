// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DrugInventory {

    // Roles
    enum Role { None, Vendor, Distributor }

    // Drug statuses
    enum Status { Manufactured, InTransit, Delivered }

    // User struct
    struct User {
        Role role;            // Vendor or Distributor
        uint256 userId;       // internal DB ID
        bytes32 personalHash; // hash of licenseNo, email, phone
        bool verified;        // true if license verified
    }

    // Drug struct
    struct Drug {
        uint id;
        string name;
        address manufacturer;
        address currentOwner;
        Status status;
    }

    mapping(address => User) public users;   // Ethereum address → User
    mapping(uint => Drug) public drugs;      // Drug ID → Drug
    uint public drugCount;

    // ---------- User Functions ----------

    function registerUser(
        address _userAddress,
        uint256 _userId,
        Role _role,
        string memory _licenseNo,
        string memory _email,
        string memory _phone
    ) public {
        bytes32 hash = keccak256(abi.encodePacked(_licenseNo, _email, _phone));
        users[_userAddress] = User(_role, _userId, hash, true);
    }

    function verifyUser(
        address _userAddress,
        string memory _licenseNo,
        string memory _email,
        string memory _phone
    ) public view returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(_licenseNo, _email, _phone));
        return users[_userAddress].personalHash == hash && users[_userAddress].verified;
    }

    // ---------- Modifiers ----------

    modifier onlyVerifiedVendor() {
        require(users[msg.sender].role == Role.Vendor, "Not a vendor");
        require(users[msg.sender].verified, "Vendor not verified");
        _;
    }

    modifier onlyVerifiedDistributor() {
        require(users[msg.sender].role == Role.Distributor, "Not a distributor");
        require(users[msg.sender].verified, "Distributor not verified");
        _;
    }

    // ---------- Drug Functions ----------

    function addDrug(string memory _name) public onlyVerifiedVendor {
        drugs[drugCount] = Drug({
            id: drugCount,
            name: _name,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            status: Status.Manufactured
        });
        drugCount++;
    }

    function transferDrug(uint _drugId, address _to) public {
        Drug storage d = drugs[_drugId];

        // Only vendor can transfer Manufactured drugs
        if (d.status == Status.Manufactured) {
            require(users[msg.sender].role == Role.Vendor, "Only vendor can ship");
            require(users[_to].role == Role.Distributor, "Recipient must be distributor");
            d.currentOwner = _to;
            d.status = Status.InTransit;
        }
        // Only distributor can deliver InTransit drugs
        else if (d.status == Status.InTransit) {
            require(users[msg.sender].role == Role.Distributor, "Only distributor can deliver");
            d.currentOwner = _to;
            d.status = Status.Delivered;
        }
        else {
            revert("Drug already delivered");
        }
    }

    function getDrug(uint _drugId) public view returns (
        uint, string memory, address, address, Status
    ) {
        Drug memory d = drugs[_drugId];
        return (d.id, d.name, d.manufacturer, d.currentOwner, d.status);
    }
}
