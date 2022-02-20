/**
 * Problem 5
 * 
 * Smallest multiple
 * 2520 is the smallest number that can be divided by each of the number
 * from 1 to 10 without any remainder.
 * 
 * What is the smallest positive number that is evenly divisible by all 
 * of the numbers from 1 to 20?
 * 
 * 
 * Solution: 
 *  Factorizing from 1 to 20
 *  [
 *      2 -> 2, 3 -> 3,  4 -> 2^2, 5 -> 5, 
 *      6 -> 2*3, 7 -> 7, 8 -> 2^3, 9 -> 3^2,
 *      10 -> 2*5, 11 -> 11, 12 -> 2^2*3, 13 -> 13,
 *      14 -> 2*7, 15 -> 3*5, 16 -> 2^4, 17 -> 17,
 *      18 -> 2*3^2, 19 -> 19, 20 -> 2^2*5  
 * ]
 * 
 *  Then get the bases with the greatest power 
 *  [2^4, 3^2, 5^1, 7^1, 11^1, 13^1, 17^1, 19^1]
 * 
 *  Finally multiply all of them
 */

/**
 * 
 * Generate a list of pseudo primes
 * between 2 to srqt(n)
 */
function generate_pseudo_primes(n) {
    let limit = Math.trunc((Math.sqrt(n) - 1) / 6);
    let list_primes = [2, 3, 5];

    for(let i=1; i<=limit; i++) {
        list_primes.push(6*i-1);
        list_primes.push(6*i+1);
    }

    if (n > list_primes[0]) {
        list_primes.push(n);
    }
    
    return list_primes;
}

function generate_factors(n) {
    let current_index = 0;
    let list_factors = [];
    let list_primes = generate_pseudo_primes(n);
    let total_primes = list_primes.length;
    let current_prime = 0;

    do {
        current_prime = list_primes[current_index++];

        if(n % current_prime == 0) {
            while(n % current_prime == 0) {
                n /= current_prime;
                list_factors.push(current_prime);
            }
        }

    // Second condition avoid index out of bounds
    } while(n > 1 && current_index + 1 < total_primes);

    /**
     * There are some cases in which the primes between
     * 2 and srqt(n) are not enough to factor n,
     * in these cases we can say the value of n is
     * the last prime factor.
     * 
     * Also, is there are no factors, then n is a prime itself
     */
    if (n > 1 || list_factors.length == 0) {
        list_factors.push(n);
    }

    return list_factors;
}

/**
 * assume ordered input array
 * group numbers by base and power
 * [2,2,2,3,5,5] => [[2,3],[3,1],[5,5]]
 */
 function group_powers(input) {
    let output = [];
    let count_pow = 1;
    
    // Important append extra element on the input array
    input.push(0);

    for(let i=1; i<input.length; i++) {
        if(input[i] == input[i-1]) {
            count_pow++;
        } else {
            output.push([input[i-1], count_pow]);
            count_pow = 1;
        }
    }

    return output;
}

function group_factors(n) {
    let list_factors = [];

    for(let i=2; i<=n; i++) {
        let factors = generate_factors(i);
        let powers = group_powers(factors);
        let length_powers = powers.length;

        for(let j=0; j<length_powers; j++) {
            list_factors.push(powers[j]);
        }
    }

    return list_factors;
}

/**
 * Group the array by the base (1st element of the sub-array),
 * getting the greater power (2nd element of the sub-array)
 * [[2,1], [3, 3], [2, 2], [3,2], [2,1]] => [[2,2], [3,2]]
 */
function get_greater_power_values(n) {
    let output = new Map();
    let base = 0;
    let power = 0;
    let factors = group_factors(n);
    for(let i=0; i<factors.length; i++) {
        base = factors[i][0];
        power = factors[i][1];

        // Check base
        if (output.has(base)) {
            if (power > output.get(base)) {
                // Keep greatest power
                output.set(base, power);
            }
        } else {
            output.set(base, power);
        }
    }

    return output;
}

function get_smallest_multiple(n) {
    let result = 1;
    let greater_powers = get_greater_power_values(n);
    for(const [base, power] of greater_powers) {
        result *= Math.pow(base, power);
    }
    return result;
}

console.log(get_smallest_multiple(process.argv[2]));
// node smallest_multiple.js 20 => 232792560