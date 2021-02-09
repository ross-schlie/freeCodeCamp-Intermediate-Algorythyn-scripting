/**
 * Flatten a nested array. You must account for varying levels of nesting.
 * Your solution should not use the Array.prototype.flat() 
 * or Array.prototype.flatMap() methods.
 * @param {Array} arr 
 * @return {Array}
 */
function steamrollArray(arr) {
  // console.log(arr);
  let newArr = [];
  arr.filter(function(element) {
    steam(element, newArr);
  });

  // console.log(newArr);
  return newArr;
}

/**
 * Recursive function to flatten array
 * @param {Object} element 
 * @param {Array} baseArr 
 * @return {Array}
 */
function steam(element, baseArr) {
  if (Array.isArray(element)) {
    element.forEach(function(elem) {
      steam(elem, baseArr);
    });
  } else {
    baseArr.push(element);
  }

  return baseArr;
}

steamrollArray([1, [2], [3, [[4]]]]);