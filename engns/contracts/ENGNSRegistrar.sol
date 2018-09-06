pragma solidity ^0.4.24;

import './ENGNS.sol';

/**
 * A registrar that allocates subdomains to the first person to claim them.
 */
contract ENGNSRegistrar {
    ENGNS engns;
    bytes32 rootNode;

    modifier only_owner(bytes32 subnode) {
        address currentOwner = engns.owner(keccak256(rootNode, subnode));
        require(currentOwner == 0 || currentOwner == msg.sender);
        _;
    }

    /**
     * Constructor.
     */
    constructor(ENGNS engnsAddr, bytes32 node) public {
        engns = engnsAddr;
        rootNode = node;
    }

    /**
     * Register a name, or change the owner of an existing registration.
     * @param subnode The hash of the label to register.
     * @param owner The address of the new owner.
     */
    function register(bytes32 subnode, address owner) public only_owner(subnode) {
        engns.setSubnodeOwner(rootNode, subnode, owner);
    }
}