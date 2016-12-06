'use strict';

/**
 * Validate Chinese citizen identification number by check number(the last bit).
 *
 * GB 11643-1999
 * @param {string} id 18 bit id number
 * @return {bool}
 */
module.exports = function(idNumber) {
  var id = idNumber.toString();
  id = id.toUpperCase();
  if (!/\d{17}(X|\d)/.test(id)) {
    return false;
  }
  var codes = id.substr(0, 17).split('');
  var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = codes.reduce(function(prev, current, index) {
    return prev + weights[index] * parseInt(current);
  }, 0);
  var i = sum % 11;
  
  return id[17] === checkCodes[i];
}
