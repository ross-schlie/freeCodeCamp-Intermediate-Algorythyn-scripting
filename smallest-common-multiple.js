/**
 * Find the smallest common multiple of the provided parameters 
 * that can be evenly divided by both, as well as by all sequential numbers 
 * in the range between these parameters.
 * 
 * The range will be an array of two numbers that will 
 * not necessarily be in numerical order.
 * 
 * For example, if given 1 and 3, find the smallest common multiple of 
 * both 1 and 3 that is also evenly divisible by all numbers between 1 and 3. 
 * The answer here would be 6.
 * @param {Array} arr - Array of numbers (2) of which 
 * to find the smallest common multiple
 * @return {Number} - The smallest common multiple
 */
function smallestCommons(arr) {
  const LOW = Math.min(arr[0], arr[1]);
  const HIGH = Math.max(arr[0], arr[1]);

  const RANGE = makeRange(LOW, HIGH);
  let commonMultiple = 0;

  //Number.MAX_SAFE_INTEGER
  for (let i = 2; i < Number.MAX_SAFE_INTEGER; i++) {
    let multiple = HIGH * i;
    let isOK = RANGE.every(value => multiple % value == 0);
    // console.log(multiple);
    // console.log(isOK);
    if (isOK) {
      commonMultiple = multiple;
      break;
    }
  }

  // console.log(commonMultiple);
  return commonMultiple;
}

/**
 * Maken an array of numbers from low to high
 * @param {Number} low 
 * @param {Number} high
 * @return {Array} 
 */
function makeRange(low, high) {
  let range = [];
  for (let i = low; i <= high; i++) {
    range.push(i);
  }

  return range;
}

smallestCommons([1, 5]);