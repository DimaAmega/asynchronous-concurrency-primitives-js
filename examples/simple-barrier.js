const Barrier = require(`../src/barrier`)
const ColorLog = require("../src/helpers/color-log")
const sleep = require("../src/helpers/sleep")
const Corutines = [0, 1, 2, 3].map((n) => `corutine ${n}`)

// Global variables
const b = new Barrier()
const c = new ColorLog()

;(async () => {
  c.log(`Lock barrier`, Corutines[0])
  await b.Lock()
  c.log(`Done`, Corutines[0])
})()

;(async () => {
  c.log(`Sleep 1s ...`, Corutines[1])
  await sleep(1)
  b.UnLock()
  c.log(`barrier UnLock was invoked :)`, Corutines[1])
})()
