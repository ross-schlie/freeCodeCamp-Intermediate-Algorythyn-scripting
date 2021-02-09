/**
 * A prime number is a whole number greater than 1 with exactly two divisors: 
 * 1 and itself. For example, 2 is a prime number because it is 
 * only divisible by 1 and 2. 
 * 
 * In contrast, 4 is not prime since it is divisible by 1, 2 and 4.
 * Rewrite sumPrimes so it returns the sum of all prime numbers 
 * that are less than or equal to num.
 * @param {Number} num 
 * @return {Number}
 */
function sumPrimes(num) {
  // console.log(num);
  const PRIMES = getPrimes(1, num);
  const SUM = PRIMES.reduce((accumulator, currentValue) => accumulator + currentValue);
  // console.log(PRIMES);
  // console.log(SUM);
  return SUM;
}

/**
 * Get Prime numbers as an Array
 * @param {Number} index 
 * @param {Number} max 
 * @param {Array} primes 
 */
function getPrimes(index, max, primes = []) {
  //cutoff condition
  if (index > max) {
    return primes;
  }

  //base case (simplest)
  if (index <= 1) {
    return getPrimes(index + 1, max, primes);
  }

  let current = index;
  for (let i = 2; i <= Math.floor(current / 2); i++) {
    // console.log(current + " divided by i " + i + " leaves " + current % i);
    if (current % i == 0) {
      return getPrimes(index + 1, max, primes);
    }
  }

  // console.log(current + " is a prime!");
  //if we made it through the check... add
  primes.push(current);

  //incrementer
  return getPrimes(index + 1, max, primes);
}

sumPrimes(10);