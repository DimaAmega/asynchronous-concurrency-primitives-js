const [barrier, count] = [Symbol(), Symbol()]
const Barrier = require("./barrier")

class Mutex {
  constructor() {
    this[barrier] = new Barrier()
    this[count] = 0
  }

  async Lock() {
    this[count]++
    if (this[count] > 1) await this[barrier].Lock()
  }

  UnLock() {
    if (this[count] > 1) this[barrier].UnLock()
    this[count]--
  }
}

module.exports = Mutex
