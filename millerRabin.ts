function isPossiblyPrime(n: number, round: number) {
    if (n <= 3 && n > 0) {
        return true;
    }

    if (n % 2 === 0) {
        return false;
    }

    // Write (n - 1) as 2^s * d
    let s = 0, d = n - 1;

    while (d % 2 === 0) {
        d /= 2;
        ++s;
    }

    witnessLoop: do {
        //A base between 2 and n - 2
        let a = Math.floor(Math.random() * ((n - 2) - 2 + 1) + 2);

        // let x = Math.pow(a, d) % n;
        let x = exp(a, d, n);

        if (x === 1 || x === n - 1) {
            continue;
        }

        for (let i = s - 1; i--;) {
            x = x ** 2 % n;

            if (x === 1) {
                return false;
            }

            if (x === n - 1) {
                continue witnessLoop;
            }
        }

        return false;
    } while (--round);

    return true;
}

function exp(target: number, index: number, module: number) {
    let y = target;
    while (--index) {
        target = target * y;

        if (target > module) {
            target = target % module;
        }
    }

    return target;
}

console.log(isPossiblyPrime(99961, 1) ? 'It\'s a prime number' : 'It\'s a composite number');
