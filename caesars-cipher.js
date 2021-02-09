/**
 * One of the simplest and most widely known ciphers is a Caesar cipher, 
 * also known as a shift cipher. In a shift cipher the meanings 
 * of the letters are shifted by some set amount.
 * 
 * A common modern use is the ROT13 cipher, where the values 
 * of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.
 * 
 * A function which takes a ROT13 encoded string as input and returns a decoded string.
 * All letters will be uppercase. 
 * Do not transform any non-alphabetic character (i.e. spaces, punctuation), 
 * but do pass them on.
 * @param {Array} [...str] - A string which I spread to an array
 * @return {String} - the 'ciphered' string 
 */
function rot13([...str]) {
  const MIN = 'A'.charCodeAt(0);
  const MAX = 'Z'.charCodeAt(0);

  let newArr = str.map(function(element) {
    if (element.charCodeAt(0) >= MIN && element.charCodeAt(0) <= MAX) {
      //shift
      if (element.charCodeAt(0) + 13 > MAX) {
        return String.fromCharCode(element.charCodeAt(0) - 13);
      }

      return String.fromCharCode(element.charCodeAt(0) + 13);
    }

    //ignore all others
    return element;
  });

  // console.log(newArr.join(''));
  return newArr.join('');
}

rot13("SERR PBQR PNZC");
rot13("SERR CVMMN!");