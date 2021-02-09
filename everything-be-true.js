/**
 * Check if the predicate (second argument) is truthy 
 * on all elements of a collection (first argument).
 * 
 * In other words, you are given an array collection of objects. 
 * The predicate pre will be an object property and you need 
 * to return true if its value is truthy. Otherwise, return false.
 * 
 * In JavaScript, truthy values are values that translate to true 
 * when evaluated in a Boolean context.
 * 
 * Remember, you can access object properties through 
 * either dot notation or [] notation.
 * 
 * @param {Array} collection - Array of objects
 * @param {String} pre - Property to check the objects for thruthyness
 */
function truthCheck(collection, pre) {
  // console.log(collection);
  const allTrue = collection.every(function(obj) {
    console.log(obj[pre]);
    return new Boolean(obj[pre]) == true;
  });

  // console.log(allTrue);
  return allTrue;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, 
{"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, 
{"user": "Po", "sex": "female"}], "sex");

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, 
{"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex")