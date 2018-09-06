const ENGNSRegistrar = artifacts.require('ENGNSRegistrar.sol');
const ENGNSRegistry = artifacts.require('ENGNSRegistry.sol');
const ENGNSResolver = artifacts.require('ENGNSResolver.sol');
const namehash = require('eth-ens-namehash');
const Web3 = require('web3');
let web3 = new Web3();

contract('ENGNS', function (accounts) {

  let registry, registrar, resolver;

  beforeEach(async () => {
    registry = await ENGNSRegistry.new();
    registrar = await ENGNSRegistrar.new(registry.address, 0);
    resolver = await ENGNSResolver.new(registry.address);

    await registry.setOwner(0, registrar.address, {from: accounts[0]});
  });

  it('should allow registration of names', async () => {
    await registrar.register(web3.sha3('eng'), accounts[0], {from: accounts[0]});
    assert.equal(await registry.owner(0), registrar.address);
    assert.equal(await registry.owner(namehash.hash('eng')), accounts[0]);
  });

  it('should register a domain', async () => {
    await registrar.register(web3.sha3('eng'), accounts[1], {from: accounts[1]});
    assert.equal(await registry.owner(namehash.hash('eng')), accounts[1]);
    // register a subdomain
    await registry.setSubnodeOwner(namehash.hash('eng'), web3.sha3('subdomain'), accounts[1], {from: accounts[1]});
    assert.equal(await registry.owner(namehash.hash('subdomain.eng')), accounts[1]);
  });

  it('should check resolver interfaces', async () => {
    assert.equal(await resolver.supportsInterface('0x3b3b57de'), true);
    assert.equal(await resolver.supportsInterface('0xd8389dc5'), true);
    assert.equal(await resolver.supportsInterface('0x691f3431'), true);
    assert.equal(await resolver.supportsInterface('0xe89401a1'), true);
    assert.equal(await resolver.supportsInterface('0x59d1d43c'), true);
  });

  it('should not support a random interface', async () => {
    assert.equal(await resolver.supportsInterface('0x3b3b57df'), false);
  });

  it('should set resolver for node', async () => {
    await registrar.register(web3.sha3('eng'), accounts[1], {from: accounts[1]});
    await registry.setSubnodeOwner(namehash.hash('eng'), web3.sha3('subdomain'), accounts[1], {from: accounts[1]});
    await registry.setResolver(namehash.hash('eng'), resolver.address, {from: accounts[1]});
    assert.equal(await registry.resolver(namehash.hash('eng')), resolver.address);
  });

  it('should set text', async () => {
    await registrar.register(web3.sha3('eng'), accounts[1], {from: accounts[1]});
    await registry.setSubnodeOwner(namehash.hash('eng'), web3.sha3('subdomain'), accounts[1], {from: accounts[1]});
    await registry.setResolver(namehash.hash('eng'), resolver.address, {from: accounts[1]});
    await resolver.setText(namehash.hash('eng'), 'ENGNS', 'Enigma Name Service', {from: accounts[1]});
    assert.equal(await resolver.text(namehash.hash('eng'), 'ENGNS'), 'Enigma Name Service');
  }); 

  it('should set address', async () => {
    await registrar.register(web3.sha3('eng'), accounts[1], {from: accounts[1]});
    await registry.setSubnodeOwner(namehash.hash('eng'), web3.sha3('subdomain'), accounts[1], {from: accounts[1]});
    await registry.setResolver(namehash.hash('eng'), resolver.address, {from: accounts[1]});
    await resolver.setAddr(namehash.hash('eng'), accounts[1], {from: accounts[1]});
    assert.equal(await resolver.addr(namehash.hash('eng')), accounts[1]);
  });

  it('should set multihash', async () => {
    await registrar.register(web3.sha3('eng'), accounts[1], {from: accounts[1]});
    await registry.setSubnodeOwner(namehash.hash('eng'), web3.sha3('subdomain'), accounts[1], {from: accounts[1]});
    await registry.setResolver(namehash.hash('eng'), resolver.address, {from: accounts[1]});
    await resolver.setMultihash(namehash.hash('eng'), 'IPFS', '0x0000000000000000000000000000000000123456', {from: accounts[1]});
    assert.equal(await resolver.multihash(namehash.hash('eng'), 'IPFS'), '0x0000000000000000000000000000000000123456');
  });
});
