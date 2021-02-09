/**
 * Return an English translated sentence of the passed binary string.
 * The binary string will be space separated.
 * @param {String} str - Binary values to be converted to characters
 * e.g. 01000001 01110010
 * @return {String} - The characters/words/sentence equivalent
 */
function binaryAgent(str) {
  const BINARYARR = str.split(' ');
  // console.log(BINARYARR);
  
  const CONVERT = { 0: 1, 1: 2, 2: 4, 3: 8, 4: 16, 5: 32, 6: 64, 7: 128 };
  const SENTENCE = BINARYARR.map(function(binaryStr) {
    let intVal = binaryToInt(binaryStr, CONVERT);
    let char = String.fromCharCode(intVal);
    return char;
  });

  return SENTENCE.join('');
}

function binaryToInt(binaryStr, CONVERT) {
  let intVal = 0;
  for (let i = 0; i < 8; i++) {
    if (binaryStr[binaryStr.length - 1 - i] == 1) {
      intVal += CONVERT[i];
    }
  }

  return intVal;
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");