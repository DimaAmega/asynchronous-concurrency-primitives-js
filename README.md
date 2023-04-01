# asynchronous concurrency primitives js
[![Node.js CI](https://github.com/DimaAmega/asynchronous-mutex-js/actions/workflows/tests.js.yml/badge.svg)](https://github.com/DimaAmega/asynchronous-mutex-js/actions/workflows/tests.js.yml)

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/DimaAmega/asynchronous-concurrency-primitives-js
)

There are a few asynchronous concurrency primitives js:

- [barrier.js](./examples/simple-barrier.js) 
- [mutex.js](./examples/simple-mutex.js)
- [rwmutex.js](./tests/rwmutex.test.js#L71)


Also see [tests](./tests)

### Get started:
deps:
```shell
npm i
```

run tests:
```shell
npm test
```

### Barrier
```js
const Coroutines = [0, 1, 2, 3].map((n) => `coroutine ${n}`)

// Global variables
const b = new Barrier()
const c = new ColorLog()

;(async () => {
  c.log(`Lock barrier`, Coroutines[0])
  await b.Lock()
  c.log(`Done`, Coroutines[0])
})()

;(async () => {
  c.log(`Sleep 1s ...`, Coroutines[1])
  await sleep(1)
  b.UnLock()
  c.log(`barrier UnLock was invoked :)`, Coroutines[1])
})()
```

<img width="763" alt="image" src="https://user-images.githubusercontent.com/32310771/229280109-cb6c15a9-4267-42b4-8bc6-b8e8710dc2cc.png">



### Mutex
```js
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

<img width="763" alt="image" src="https://user-images.githubusercontent.com/32310771/229280139-6e301420-da92-4e8f-a12f-f41d6515bc00.png">
