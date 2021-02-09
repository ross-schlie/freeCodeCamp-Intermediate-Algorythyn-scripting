/**
 * Return true if the given string is a palindrome. Otherwise, return false.
 * 
 * A palindrome is a word or sentence that's spelled the same way 
 * both forward and backward, ignoring punctuation, case, and spacing.
 * Note: You'll need to remove all non-alphanumeric characters 
 * (punctuation, spaces and symbols) and turn everything into the same case 
 * (lower or upper case) in order to check for palindromes.
 * 
 * We'll pass strings with varying formats, 
 * such as "racecar", "RaceCar", and "race CAR" among others.
 * We'll also pass strings with special symbols, 
 * such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".
 * @param {String} str 
 */
function palindrome(str) {
  let cleanStr = str.replaceAll(/([\W+_+])/g, '').toLowerCase();
  // console.log(cleanStr);
  for (let i = 0; i < Math.ceil(cleanStr.length) / 2; i++) {
    // console.log(i + "th = " + cleanStr.charAt(i));
    // console.log(cleanStr.length - i + " th = " + cleanStr.charAt(cleanStr.length - 1 - i));
    if (cleanStr.charAt(i) != cleanStr.charAt(cleanStr.length - 1 - i)) {
      return false;
    }
  }

  return true;
}

palindrome("eye");