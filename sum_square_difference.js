/**
 * Problem 6
 * 
 * The sum of the squares of the first then natural numbers
 *  1^2 + 2^2 + ... + 10^2 = 385
 * The square of the sum of the firt ten natural numbers
 *  (1 + 2 + ... + n)^2 = 3025
 * Then, calculate the difference 3025 - 305
 */

/** 
 * Calculate the sum of 1^2 + 2^2 + ... + n^2
*/
function sum_squares(n) {
    return (n * (n + 1) * (2*n + 1)) / 6;
}

/**
 * Calculate the square of the sum
 * (1 + 2 + 3 + ... + n)^2
 */
function square_sum(n) {
    return Math.pow((n * (n + 1) / 2), 2)
}

function execute(n) {
    let integer_n = parseInt(n);
    return square_sum(integer_n) - sum_squares(integer_n);
}

if(process.argv[2] == undefined) {
    console.log('please suply a number');
} else {
    console.log(execute(process.argv[2]));
}


/**
 * Executing code
 * ~$ node sum_square_difference 100
 * 25164150
 */