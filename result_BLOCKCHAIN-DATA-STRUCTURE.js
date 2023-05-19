The First Primitive
Cryptographic Hashes
1: Find Favorite Color

const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    hex = toHex(hash);
    for(let i = 0; i < COLORS.length; i++) {
        b = utf8ToBytes(COLORS[i]);
        h = sha256(b);
        if (toHex(h) === hex) {
            return COLORS[i];
        }
    }
}

module.exports = findColor;

=============================================================================

Digital Signatures
Public Key Exercise
1: Hash Message\ 查看要求：

const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

module.exports = hashMessage;

=============================================================================

2: Sign Message

const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    return secp.sign(hashMessage(msg), PRIVATE_KEY, { recovered : true});
}

module.exports = signMessage;

=============================================================================

3: Recover Key

const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
}

module.exports = recoverKey;

=============================================================================

4: Key to Address

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20);
}

module.exports = getAddress;

=============================================================================

Proof of Work
Proof of Work Miner
1: Mempool

const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

=============================================================================

2: Mine Block

const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let block = {id:blocks.length};
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

=============================================================================

3: Block Hash

const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let block = {id:blocks.length};
    block.hash = SHA256(JSON.stringify(block));
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

=============================================================================

4: Mine TX

const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let block = {id:blocks.length, transactions:[]};
    if (mempool.length > 0) {
        for (let i = 0; i < MAX_TRANSACTIONS; i++) {
            block.transactions.push(mempool[0]);
            mempool.shift();
            if (mempool.length <= 0) {
                break;
            }
        }
    }
    block.hash = SHA256(JSON.stringify(block));
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

=============================================================================

5: Difficulty

const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let block = {id:blocks.length, transactions:[]};
    if (mempool.length > 0) {
        for (let i = 0; i < MAX_TRANSACTIONS; i++) {
            block.transactions.push(mempool[0]);
            mempool.shift();
            if (mempool.length <= 0) {
                break;
            }
        }
    }
    block.nonce = 0;
    block.hash = SHA256(JSON.stringify(block));
    let hash = block.hash;
    while (BigInt(`0x${hash}`) >= TARGET_DIFFICULTY) {
        block.nonce = block.nonce + 1;
        block.hash = SHA256(JSON.stringify(block));
        hash = block.hash;
    }
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};

Blockchain Network
Blockchain Data Structure
1: Blocks and Hashes

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor() {
    }
    toHash() {
        return SHA256("a string");
    }
}

module.exports = Block;

=============================================================================

2: What's in a Hash?

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

=============================================================================
  
3: The Genesis Block

const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis")];
    }
}

module.exports = Blockchain;

=============================================================================

4: Adding Blocks

const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis")];
    }

    addBlock(block) {
        this.chain.push(block);
    }
}

module.exports = Blockchain;
=============================================================================

5: Linking The Blocks

const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis")];
    }

    addBlock(block) {
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }
}

module.exports = Blockchain;

and =>

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.data = data;
    }
    toHash() {
        if (this.previousHash) {
            return SHA256(this.data.toString() + this.previousHash.toString());
        } else {
            return SHA256(this.data.toString());
        }
    }
}

module.exports = Block;

=============================================================================

6: Validating the Chain
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis")];
    }

    addBlock(block) {
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }

    isValid() {
        for (let i = 0; i < this.chain.length; i++) {
            if ((i + 1) >= this.chain.length) {
                break;
            }
            if (this.chain[i].toHash().toString() !== this.chain[i+1].previousHash.toString()) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
