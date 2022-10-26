# asynchronous-mutex-js
### simple example (see examples/simple-mutex.js)
```js
const Mutex = require(`../src/mutex`)
const ColorLog = require("../src/helpers/color-log")
const sleep = require("../src/helpers/sleep")

// setup
const COroutineS_NUMBER = 3
const Coroutines = [...Array(COroutineS_NUMBER).keys()].map(
  (n) => `coroutine ${n}`
)
const sleepTimes = [...Array(COroutineS_NUMBER).keys()]

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
COroutine 0: Lock mutex
COroutine 1: Lock mutex
COroutine 2: Lock mutex
COroutine 0: In CS
COroutine 0: Sleep 0s ...
COroutine 0: Out CS
COroutine 0: mutex UnLock was invoked :)
COroutine 0: Done
COroutine 1: In CS
COroutine 1: Sleep 1s ...
COroutine 1: Out CS
COroutine 1: mutex UnLock was invoked :)
COroutine 1: Done
COroutine 2: In CS
COroutine 2: Sleep 2s ...
COroutine 2: Out CS
COroutine 2: mutex UnLock was invoked :)
COroutine 2: Done
```
