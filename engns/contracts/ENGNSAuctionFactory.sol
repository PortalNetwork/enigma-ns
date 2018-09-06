pragma solidity ^0.4.24;

import "./ENGNSAuction.sol";

contract ENGNSAuctionFactory {

  /* EVENTS */
  event newAuction(address auction);

  /* STATE VARIABLES */
  address[] public auctions;
  address public engns;
  address public engnsRegistrar;

  /* CONSTRUCTOR */
  constructor(address _engns, address _engnsRegistrar) public {
    require(_engns != 0 && engns == 0);
    require(_engnsRegistrar != 0 && engnsRegistrar == 0);
    engns = _engns;
    engnsRegistrar = _engnsRegistrar;
  }

  /*
   * Creates a new auction.
   * NOTE: _startingPrice must be specified in wei.
   */
  function createAuction(uint _auctionLength, uint _startingPrice) external returns (address) {
    Auction auction = new Auction(msg.sender, _auctionLength, _startingPrice, engns, engnsRegistrar);
    auctions.push(auction);
    emit newAuction(auction);
  }

  /*
   * Get every auction address created.
   */
  function getAuctionAddresses() public view returns (address[]) {
    return auctions;
  }

}