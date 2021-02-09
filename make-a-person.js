/**
 * Fill in the object constructor with the following methods below:
 * getFirstName()
 * getLastName()
 * getFullName()
 * setFirstName(first)
 * setLastName(last)
 * setFullName(firstAndLast)
 * 
 * Run the tests to see the expected output for each method. 
 * The methods that take an argument must accept only one argument and it has to be a string. 
 * These methods must be the only available means of interacting with the object.
 * @param {String} firstAndLast 
 */
var Person = function(firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  let _firstname = "";
  let _lastname = "";

  this.getFullName = function() {
    return _firstname.concat(' ').concat(_lastname);
  };

  this.getFirstName = function() {
    return _firstname;
  };

  this.getLastName = function() {
    return _lastname;
  };

  this.setFirstName = function(first) {
    _firstname = first;
  };

  this.setLastName = function(last) {
    _lastname = last;
  };

  this.setFullName = function(firstAndLast) {
    _firstname = firstAndLast.split(' ')[0];
    _lastname = firstAndLast.split(' ')[1];
  };

  this.setFullName(firstAndLast);
  return this;
};

var bob = new Person('Bob Ross');
bob.getFullName();