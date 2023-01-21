const Mutex = require('../src/mutex')
const sleep = require("../src/helpers/sleep")

describe('Simple tests', () => {
    let mutex = undefined
    let threadsInCs = 0

    const CSJob = async () => {
        // START CS
        if (++threadsInCs > 1) {
            throw "A few workers in CS"
        }
        await sleep(1e-4 * Math.random())
        // END CS
        --threadsInCs;
    }

    const executeExclusive = async (cb) => {
        await mutex.Lock()
        await cb()
        mutex.UnLock()
    }

    afterEach(() => {
        mutex = undefined
        threadsInCs = 0
    });

    beforeEach(() => {
        mutex = new Mutex()
        threadsInCs = 0
    });
    

    test('two parallel workers', async () => {
        const workersCount = 2
        await Promise.all(Array(workersCount).fill().map(() => executeExclusive(CSJob)))
    });

    test('five parallel workers', async () => {
        const workersCount = 5
        await Promise.all(Array(workersCount).fill().map(() => executeExclusive(CSJob)))
    });

    test('fifteen parallel workers', async () => {
        const workersCount = 15
        await Promise.all(Array(workersCount).fill().map(() => executeExclusive(CSJob)))
    });

    test('a lot of parallel workers :)', async () => {
        const workersCount = 1500
        await Promise.all(Array(workersCount).fill().map(() => executeExclusive(CSJob)))
    });
});
