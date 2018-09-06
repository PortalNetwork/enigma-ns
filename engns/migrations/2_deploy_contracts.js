const ENGNSRegistry = artifacts.require("./ENGNSRegistry.sol");
const ENGNSRegistrar = artifacts.require('./ENGNSRegistrar.sol');
const ENGNSResolver = artifacts.require('./ENGNSResolver.sol');
//const ENGNSAuction = artifacts.require("./ENGNSAuction.sol");
const ENGNSAuctionFactory = artifacts.require("./ENGNSAuctionFactory.sol");

const web3 = new (require('web3'))();
const namehash = require('eth-ens-namehash');

const ENG = 'eng';

module.exports = async (deployer) => {
  // deploy registry
  let engnsResgirty = await deployer.deploy(ENGNSRegistry);
  // deploy registrar
  let engnsRegistrar = await deployer.deploy(ENGNSRegistrar, ENGNSRegistry.address, namehash.hash(ENG));
  // deploy resolver
  let engnsResolver = await deployer.deploy(ENGNSResolver, ENGNSRegistry.address);
  // deploy auction factory
  let engnsAuctionFactory = await deployer.deploy(ENGNSAuctionFactory, ENGNSRegistry.address, ENGNSRegistrar.address);
  ENGNSRegistry.at(ENGNSRegistry.address).setSubnodeOwner('0x0', web3.sha3(ENG), ENGNSRegistrar.address);
};
