# Introduction

## What is ENGNS?
ENGNS is the Enigma Name Service, a distributed, open, and extensible naming system based on the Enigma blockchain.  
ENGNS is to map human-readable names like `portal.eng` to machine-readable identifiers such as Enigma addresses, content hashes, and metadata.

ENGNS has similar goals to DNS, the Internet’s Domain Name Service, but has significantly different architecture, due to the capabilities and constraints provided by the Enigma blockchain. Like DNS, ENGNS operates on a system of dot-separated hierarchial names called domains, with the owner of a domain having full control over the allocation of subdomains.

Top-level domains, like `.eng` are owned by smart contracts called registrars, which specify rules governing the allocation of their subdomains. Anyone may, by following the rules imposed by these registrar contracts, obtain ownership of a second-level domain for their own use.

## Why we need ENGNS?
Blockchain addresses are not friendly enough to humans, the hash addresses are too long, hard to remember, and not easy to identify which is correct or incorrect.  

The blockchain now becomes more and more popular, the shortcomings of address transfer will become more and more obvious. Just as we are sending emails today, it is difficult to use a 32-bit string as an email account. Therefore, an alias service is very helpful for the ease of use of the blockchain system. For example, IPFS has an alias service called InterPlanetary Name Service (IPNS), and Ethereum has its own domain name service called Ethereum Name Service (ENS). We do think that Enigma system should also have its own alias service. Called Enigma Name Service (ENGNS),

## The Expandability of ENGNS
What kind of resource an alias should point to is flexible and can be implemented just by implementing the corresponding ENGNS resolvers. In addition to pointing to an address, it can also point to a contract address, thus enabling interaction through ENGNS and smart contracts.

## Resources
- [EIP137](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md) - Ethereum Name Service
- [EIP162](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-162.md) - Initial ENS Registrar Specification
- [EIP1062](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1062.md) - Formalize IPFS hash into ENS(Ethereum Name Service) resolver
