const Barrier = require(`../src/barrier`)
const ColorLog = require("../src/helpers/color-log")
const sleep = require("../src/helpers/sleep")
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
