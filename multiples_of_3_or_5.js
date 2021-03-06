/**
 * Problem 1
 *
 * Multiples of 3 or 5
 * If we list all the natural numbers below 10 thar are multiples
 * of 3 or 5 then whe get 3, 5, 6 and 9. The sum of these multiples is 23
 *
 * Find the sum o all the multiples of 3 or 5 bellow 1000
 */

/**
 * Calculate the limit of the gauss serie
 */
function get_sum_limit(limit, multiple) {
	return (limit % multiple == 0) ? 
		Math.trunc(limit / multiple) - 1 : 
		Math.trunc((limit / multiple)); 
}

/**
 * Calculate the individual sum of the multiples
 * Using the gauss formula for series
 */
function calc_sum(limit, multiple) {
	let sum_limit = get_sum_limit(limit, multiple);
	return multiple * (sum_limit * (sum_limit + 1) / 2);
}

/** 
* Substract multiples_of_15 to the sum of 3 and 5 multiples.
* multiples of 3 = {3, 6, 9, 12, 15, ...}
* multiples of 5 = {5, 10, 15, ...}
* the substract produce a inner join of the both sets, no repeat values
* {3, 5, 6, 9, 10, 12, 15, ...}
*/
function calc_multiple_sum(limit) {
	return calc_sum(limit, 3) + calc_sum(limit, 5) - calc_sum(limit, 15);
}

console.log('1000 => ', calc_multiple_sum(1000));
