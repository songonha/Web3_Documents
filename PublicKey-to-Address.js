====>getAddress.js
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const sliced = publicKey.slice(0,1)
    console.log('fisrstByte ', sliced)
    const keccak = keccak256(publicKey.slice(1, publicKey.length))
    console.log('keczak', keccak)
    console.log(keccak.length-20)
    const last20Bytes = keccak.slice(keccak.length-20)
    console.log(last20Bytes)
    return last20Bytes
}

module.exports = getAddress;


======>test.js
const getAddress = require('../getAddress');
const secp = require("ethereum-cryptography/secp256k1");
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";

describe('Get Address', () => {
    it('should get the address from a public key', async () => {
        const publicKey = secp.getPublicKey(PRIVATE_KEY);
        
        const address = toHex(getAddress(publicKey));

        assert.equal(address.toLowerCase(), EXPECTED_ADDRESS.toLowerCase());
    });
});
