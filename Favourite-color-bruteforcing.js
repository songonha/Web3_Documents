Favourite color bruteforcing
index.js
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    const hashAsHex = toHex(hash)
    const rainbowTable = COLORS.map((color) => {
        const colorBytes = utf8ToBytes(color)
        return {color: color , hash: toHex(sha256(colorBytes))}
    })
    let result;
    rainbowTable.forEach((entry) => {
        if (entry.hash === hashAsHex) {
            result = entry.color
        } 
    })
    return result
}

module.exports = findColor;

=====================================================================
test.js
const {assert} = require('chai');
const findColor = require('../index');
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

describe('findColor', () => {
    COLORS.forEach((color) => {
        it(`should work for ${color}`, () => {
            assert.equal(findColor(sha256(utf8ToBytes(color))), color);
        });
    });
});
