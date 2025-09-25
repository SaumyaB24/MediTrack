// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DrugInventory {

    // Roles
    enum Role { None, Vendor, Distributor }

    // Drug statuses
    enum Status { Manufactured, InTransit, Delivered }

    // User struct (minimal on-chain info)
    struct User {
        Role role;
        bool exists;
    }

    // Drug struct with quantity, manufacture & expiry
    struct Drug {
        uint id;
        string name;
        address manufacturer;
        address currentOwner;
        Status status;
        uint quantity;
        uint manufactureDate; // block.timestamp when added
        uint expiryDate;      // provided by vendor in UNIX timestamp
    }

    mapping(address => User) public users;   // Ethereum address → Role
    mapping(uint => Drug) public drugs;      // Drug ID → Drug
    uint public drugCount;

    // ---------- Modifiers ----------
    modifier onlyVendor() {
        require(users[msg.sender].exists, "Not registered");
        require(users[msg.sender].role == Role.Vendor, "Not a vendor");
        _;
    }

    modifier onlyDistributor() {
        require(users[msg.sender].exists, "Not registered");
        require(users[msg.sender].role == Role.Distributor, "Not a distributor");
        _;
    }

    // ---------- User Functions ----------
    function registerUser(Role _role) public {
        require(!users[msg.sender].exists, "Already registered");
        require(_role == Role.Vendor || _role == Role.Distributor, "Invalid role");

        users[msg.sender] = User({
            role: _role,
            exists: true
        });
    }

    // ---------- Drug Functions ----------
    function addDrug(
        string memory _name, 
        uint _quantity, 
        uint _expiryDate
    ) public onlyVendor {
        require(_expiryDate > block.timestamp, "Expiry must be in future");

        drugs[drugCount] = Drug({
            id: drugCount,
            name: _name,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            status: Status.Manufactured,
            quantity: _quantity,
            manufactureDate: block.timestamp,
            expiryDate: _expiryDate
        });

        drugCount++;
    }

    function transferDrug(uint _drugId, address _to, uint _quantity) public {
        Drug storage d = drugs[_drugId];
        require(_quantity > 0 && _quantity <= d.quantity, "Invalid quantity");

        if (d.status == Status.Manufactured) {
            require(users[msg.sender].role == Role.Vendor, "Only vendor can ship");
            require(users[_to].role == Role.Distributor, "Recipient must be distributor");
            d.currentOwner = _to;
            d.status = Status.InTransit;
        } else if (d.status == Status.InTransit) {
            require(users[msg.sender].role == Role.Distributor, "Only distributor can deliver");
            d.currentOwner = _to;
            d.status = Status.Delivered;
        } else {
            revert("Drug already delivered");
        }

        d.quantity -= _quantity;
    }

    function getDrug(uint _drugId) public view returns (
        uint, string memory, address, address, Status, uint, uint, uint
    ) {
        Drug memory d = drugs[_drugId];
        return (
            d.id, 
            d.name, 
            d.manufacturer, 
            d.currentOwner, 
            d.status, 
            d.quantity, 
            d.manufactureDate, 
            d.expiryDate
        );
    }
}
