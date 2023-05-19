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
    
