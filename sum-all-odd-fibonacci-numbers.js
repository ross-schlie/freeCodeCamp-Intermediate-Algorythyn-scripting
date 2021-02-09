/**
 * Given a positive integer num, return the sum of all odd Fibonacci numbers 
 * that are less than or equal to num.
 * 
 * The first two numbers in the Fibonacci sequence are 1 and 1. 
 * 
 * Every additional number in the sequence is the sum of the two previous numbers. 
 * 
 * The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.
 * 
 * For example, sumFibs(10) should return 10 because all odd Fibonacci numbers 
 * less than or equal to 10 are 1, 1, 3, and 5.
 * @param {Number} num - positive integer num
 * @return {Number} - sum of odd Fibonacci numbers less than or eual to num
 */
function sumFibs(num) {
  if (num === undefined) {
    return false;
  }

  const FIBNUMBERS = reverseFib(0, num);
  const FIBSUM = FIBNUMBERS.reduce(function(sum, number) {
    //skip any numbers higher than input
    if (number > num) {
      return sum;
    }

    //skip even numbers
    if (number % 2 == 0) {
      return sum;
    }

    return sum + number;
  });

  return FIBSUM;
}

/**
 * Recursive? reverse function to get fibonacci numbers up (inclusive) to a max
 * @param {Number} index 
 * @param {Number} max 
 * @param {Array} fibs 
 */
function reverseFib(index, max, fibs = []) {
  if (index <= 1) {
    fibs.push(1);
    return reverseFib(index + 1, max, fibs);
  }

  let current = fibs[index -2] + fibs[index - 1];
  if (current > max) {
    return fibs;
  }

  fibs.push(current);
  return reverseFib(index + 1, max, fibs);
}

/**
 * ...
 */
// function fib(index, max) {
//   if (index <= 1) {
//       return [1, 1];
//   }

//   let previousNumbers = fib(index -1);
//   //if the number is too high (higher than max, skip)
//   if (previousNumbers[index - 1] > max) {
//     return previousNumbers;
//   }

//   previousNumbers.push(previousNumbers[index -2] + previousNumbers[index - 1]);
//   return previousNumbers;
// }

sumFibs(4);