/**
 * Given the array arr, iterate through and remove each element 
 * starting from the first element (the 0 index) until 
 * the function func returns true when the iterated element is passed through it.
 * 
 * Then return the rest of the array once the condition is satisfied, 
 * otherwise, arr should be returned as an empty array.
 * @param {Array} arr 
 * @param {Function} func 
 * @return {Array}
 */
function dropElements(arr, func) {
  let premise = false;
  let newArr = arr.filter(function(element, index) {
    //if the function call already return true,
    //add element (rest of array after)
    if (premise) {
      return true;
    }

    premise = func(element);
    // console.log(element);
    // console.log(premise);
    return premise;
  });

  // console.log(newArr)
  return newArr;
}

dropElements([1, 2, 3], function(n) { return n < 3; });