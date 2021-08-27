const Mutex = require(`../src/mutex`)
const ColorLog = require("../src/helpers/color-log")
const sleep = require("../src/helpers/sleep")

// setup
const CORUTINES_NUMBER = 3
const Corutines = [...Array(CORUTINES_NUMBER).keys()].map(
  (n) => `corutine ${n}`
)
const sleepTimes = [...Array(CORUTINES_NUMBER).keys()]

// Global variables
const m = new Mutex()
const c = new ColorLog()

const CreateWorker = (sleepTime, workerNumber) => async () => {
  c.log(`Lock mutex`, Corutines[workerNumber])
  await m.Lock()
  c.log(`In CS`, Corutines[workerNumber])
  c.log(`Sleep ${sleepTime}s ...`, Corutines[workerNumber])
  await sleep(sleepTime)
  c.log(`Out CS`, Corutines[workerNumber])
  m.UnLock()
  c.log(`mutex UnLock was invoked :)`, Corutines[workerNumber])
  c.log(`Done`, Corutines[workerNumber])
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
