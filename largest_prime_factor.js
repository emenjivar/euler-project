/**
 * Problem 3
 * 
 * The prime factor of 13195 are 5, 7, 13 and 29
 * What is the largest prime factor of the number 600851475143 ?
 */

const { performance } = require('perf_hooks');

/**
 * This function generates the list of pseudo-primes between 2 and sqrt(n)
 * the list contains some non-prime numbers such as 25, 35, 49, ...
 * https://en.wikipedia.org/wiki/Primality_test#Simple_methods
 */
function generate_pseudo_primes(n) {

    let sqrt_n = Math.trunc(Math.sqrt(n));

    /**
     * This limits are calculated using the solved
     * equations 6k-1 and 6k+1 detailed below
     */
    let limit_a = Math.trunc((sqrt_n + 1) / 6);
    let limit_b = Math.trunc((sqrt_n - 1) / 6);

    // use the largest limit
    let largest_limit = limit_a > limit_b ? limit_a : limit_b;
    let list_primes = [2, 3, 5];

    for(let i=1; i<largest_limit; i++) {
        /** 
        * Every prime number (and some non-primes) greated than 3
        * can be generated using the formulas 6k-1 and 6k+1
        */
        list_primes.push(6*i-1);
        list_primes.push(6*i+1);
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
        current_prime = list_primes[current_index];

        if(n % current_prime == 0) {
            while(n % current_prime == 0) {
                n /= current_prime;
                list_factors.push(current_prime);
            }
        }

        current_index++
    } while(n > 1 && current_index <= total_primes);

    // In case of n prime
    if (list_factors.length == 0) {
        list_factors.push(n);
    }

    return list_factors;
}

function test(n) {
    let start_time = performance.now();
    let output = generate_factors(n);
    let end_time = performance.now();

    console.log('data', output);
    console.log(`milliseconds of execution: ${end_time - start_time}`);
}

test(600851475143);

/**
 * ~$ node .\largest_prime_factor.js
 * data [ 71, 839, 1471, 6857 ]
 * milliseconds of execution: 8.366499999538064
 */