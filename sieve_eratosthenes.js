const { performance } = require('perf_hooks');
const UNCHECKED = 0;
const PRIME = 1;
const NON_PRIME = 2;

function generate_natural_numbers(n) {
    let natural_numbers = [...Array(n).keys()];
    return natural_numbers.map(function(x) {
        return { value : x + 1, state : UNCHECKED  }
    });
}

function sieve_eratosthenes(n) {
    
    let current_prime = 2;
    let list_primes = [];
    let natural_numbers = generate_natural_numbers(n);
    let i=1;
    
    natural_numbers[0].state = NON_PRIME;

    do {
        list_primes.push(current_prime);
        natural_numbers[current_prime - 1].state = PRIME;

        // Mark the next factors as non-primes
        for (let j=2*current_prime - 1; j<n; j+= current_prime) {
            natural_numbers[j].state = NON_PRIME;
        }

        // find the next prime
        do {
            current_prime++;
        }
        while (natural_numbers[current_prime - 1].state != UNCHECKED);

        current_prime = natural_numbers[current_prime - 1].value;   
    } while (current_prime < Math.sqrt(n, 2));

    // Add the remaining numbers on the primes list
    let start_loop = current_prime - 1;
    for (i=start_loop; i<n; i++) {
        if (natural_numbers[i].state == UNCHECKED) {
            list_primes.push(natural_numbers[i].value);
        }
    }

    return list_primes;
}

function print_assert(n, expected_value) {
    let start_time = performance.now();
    let output = sieve_eratosthenes(n);
    let end_time = performance.now();
    console.log(`assert of ${n}`, output.length == expected_value, `milliseconds: ${end_time - start_time}`);
   // console.dir(output, { 'maxArrayLength' : null });
    console.log('total', output.length);
    //console.table(output[10001]);
}

/*
print_assert(10, 4);
print_assert(100, 25);
print_assert(1000, 168);
print_assert(10000, 1229);
print_assert(100000, 9592);
print_assert(1000000, 78498);
print_assert(10000000, 664579);
*/
print_assert(775146, 0);