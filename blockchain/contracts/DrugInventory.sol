// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DrugInventory {

    // ---------- Roles ----------
    enum Role { None, Vendor, Distributor }

    // ---------- Drug Status ----------
    enum Status { Manufactured, InTransit, Delivered }

    // ---------- User ----------
    struct User {
        Role role;
        bool exists;
    }

    // ---------- Drug ----------
    struct Drug {
        uint id;
        string name;
        address manufacturer;
        address currentOwner;
        Status status;
        string quantity;        // stored as string
        string manufactureDate; // stored as string (e.g., "2025-11-22")
        string expiryDate;      // stored as string (e.g., "2026-12-31")
    }

    // ---------- State ----------
    mapping(address => User) public users;   // Ethereum address → User
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
        string memory _quantity,
        string memory _manufactureDate,
        string memory _expiryDate
    ) public onlyVendor returns (uint) {
        drugs[drugCount] = Drug({
            id: drugCount,
            name: _name,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            status: Status.Manufactured,
            quantity: _quantity,
            manufactureDate: _manufactureDate,
            expiryDate: _expiryDate
        });

        drugCount++;

        return drugCount - 1; // return the ID of the new drug
    }

    function transferDrug(uint _drugId, address _to) public {
        require(_drugId < drugCount, "Invalid drug ID");
        Drug storage d = drugs[_drugId];

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
    }

    function getDrug(uint _drugId) public view returns (
        uint id,
        string memory name,
        address manufacturer,
        address currentOwner,
        Status status,
        string memory quantity,
        string memory manufactureDate,
        string memory expiryDate
    ) {
        require(_drugId < drugCount, "Invalid drug ID");
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
