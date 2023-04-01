# asynchronous concurrency primitives js
[![Node.js CI](https://github.com/DimaAmega/asynchronous-mutex-js/actions/workflows/tests.js.yml/badge.svg)](https://github.com/DimaAmega/asynchronous-mutex-js/actions/workflows/tests.js.yml)

### simple example (see examples/simple-mutex.js)
```js
const Mutex = require(`../src/mutex`)
const ColorLog = require("../src/helpers/color-log")
const sleep = require("../src/helpers/sleep")

// setup
const CoroutineS_NUMBER = 3
const Coroutines = [...Array(CoroutineS_NUMBER).keys()].map(
  (n) => `coroutine ${n}`
)
const sleepTimes = [...Array(CoroutineS_NUMBER).keys()]

// Global variables
const m = new Mutex()
const c = new ColorLog()

const CreateWorker = (sleepTime, workerNumber) => async () => {
  c.log(`Lock mutex`, Coroutines[workerNumber])
  await m.Lock()
  c.log(`In CS`, Coroutines[workerNumber])
  c.log(`Sleep ${sleepTime}s ...`, Coroutines[workerNumber])
  await sleep(sleepTime)
  c.log(`Out CS`, Coroutines[workerNumber])
  m.UnLock()
  c.log(`mutex UnLock was invoked :)`, Coroutines[workerNumber])
  c.log(`Done`, Coroutines[workerNumber])
}

;(async () => {
  const promises = sleepTimes
    // create workers
    .map((sleepTime, workerNumber) => CreateWorker(sleepTime, workerNumber))
    // execute workers
    .map((worker) => worker())
  // wait all tasks
  await Promise.all(promises)
})()
```
### stdout:
```bash
Coroutine 0: Lock mutex
Coroutine 1: Lock mutex
Coroutine 2: Lock mutex
Coroutine 0: In CS
Coroutine 0: Sleep 0s ...
Coroutine 0: Out CS
Coroutine 0: mutex UnLock was invoked :)
Coroutine 0: Done
Coroutine 1: In CS
Coroutine 1: Sleep 1s ...
Coroutine 1: Out CS
Coroutine 1: mutex UnLock was invoked :)
Coroutine 1: Done
Coroutine 2: In CS
Coroutine 2: Sleep 2s ...
Coroutine 2: Out CS
Coroutine 2: mutex UnLock was invoked :)
Coroutine 2: Done
```

### Get started:
deps:
```shell
npm i
```

run tests:
```shell
npm test
```
