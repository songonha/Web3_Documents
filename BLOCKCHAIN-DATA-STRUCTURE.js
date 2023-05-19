Task 1:
==> Block.js
const SHA256 = require('crypto-js/sha256');

class Block {
    toHash() {
         return SHA256("");
    }
}

module.exports = Block;

==> hashTest.js
const Block = require('../Block');
const assert = require('assert');

describe('Block', function() {
    const newBlock = new Block();

    it('should have a hash property', function() {
        assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));
    });
});

=======================================================
Task 2:
==>Block.js
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.data = data;
    }
    toHash() {
        return SHA256(this.data.toString());
    }
}

module.exports = Block;

===> blockSHATest.js
const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Block', function() {
    it('should store a random name', function() {
        const randomName = require('faker').name.findName();
        assert.equal(randomName, new Block(randomName).data)
    });

    it('should hash some random data', function() {
        const randomEmail = require('faker').internet.email();
        const myHash = SHA256(randomEmail).toString();
        const yourHash = new Block(randomEmail).toHash().toString();
        assert.equal(myHash, yourHash);
    })
})
=========================================================================
Task 3: 
======> Blockchain.js
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [ /* TODO: Create the genesis block here */ ];
    }
}

module.exports = Blockchain;
===> Block.js
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [ /* TODO: Create the genesis block here */ ];
    }
}

module.exports = Blockchain;
=====> blockchainTest.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');

describe('Blockchain', function() {
    it('should have a genesis block', function() {
        const blockchain = new Blockchain();
        const genesisBlock = blockchain.chain[0];
        assert(genesisBlock, 'Could not find the genesis block!');
        assert(genesisBlock instanceof Block, 'genesis block should be a block!');
    })
})
-------================================================================================================================================
Task 4:
addingblocksTest.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');

let blockchain;

describe('Blockchain', function() {
    before(() => {
        blockchain = new Blockchain();
    });

    it('should have an addBlock function', function() {
        assert.equal(typeof blockchain.addBlock, 'function');
    });

    describe('adding new blocks', function() {
        let block1;
        let block2;
        before(() => {
            block1 = new Block("Some data");
            block2 = new Block("Some other data");
            blockchain.addBlock(block1);
            blockchain.addBlock(block2);
        });

        it('should be a chain of three blocks', function() {
            assert.equal(blockchain.chain.length, 3);
        });

        it('should include block1 and block2', function () {
            assert(blockchain.chain.some((x) => x === block1), "Could not find block1. Remember to push the block argument in addBlock!")
            assert(blockchain.chain.some((x) => x === block2), "Could not find block1. Remember to push the block argument in addBlock!")
        });
    });
});

===============================================================
Task 5: Linking Test
============>linkingTests.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

let blockchain;
describe('Linking Blocks', function () {
    beforeEach(() => {
        blockchain = new Blockchain();
    });
    
    describe('adding a new block to our blockchain', function () {
        let genesisBlock;
        let block1;
        beforeEach(() => {
            genesisBlock = new Block(5);
            block1 = new Block(5);
            blockchain.addBlock(genesisBlock);
            blockchain.addBlock(block1);
        });

        it('should have a previousHash property equal to the previous blocks hash', function () {
            assert.equal(block1.previousHash.toString(), genesisBlock.toHash().toString());
        });

        describe('after changing the genesis block data', () => {
            let initialGenesisHash;
            let initialBlock1Hash;
            beforeEach(() => {
                initialGenesisHash = genesisBlock.toHash().toString();
                initialBlock1Hash = block1.toHash().toString();
                genesisBlock.data = 10;
            });

            it('should alter the genesis hash', () => {
                const newHash = genesisBlock.toHash().toString();
                assert.notEqual(initialGenesisHash, newHash, "Expected changing the genesis blocks data to change its hash calculation!");    
            });

            it('should alter the second blocks hash', () => {
                const newHash = genesisBlock.toHash().toString();
                assert.notEqual(initialBlock1Hash, newHash, "Expected changing the genesis blocks data to change the second blocks hash calculation!");
            });
        });
    });
});


