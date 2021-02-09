/**
 * Convert the given number into a roman numeral.
 * All roman numerals answers should be provided in upper-case.
 * http://www.mathsisfun.com/roman-numerals.html
 * @param {Number} num 
 */
function convertToRoman(num) {
    const CONVERSIONMAP = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];

    let romanNum = [];
    CONVERSIONMAP.reduce(function(number, element) {
        //don't consider any elements larger than the number
        if (element[0] > number) {
            return number;
        }

        // console.log(element);
        // console.log(number);
        let product = Math.floor(number / element[0]);
        while (product > 0) {
            romanNum.push(element[1]);
            product--;
        }

        number = number % element[0];
        // console.log(product);
        // console.log(number);
        
        return number;
    }, num);

    // console.log(romanNum.join(''));
    return romanNum.join('');
}

convertToRoman(36);