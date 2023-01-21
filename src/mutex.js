const [barrier, count] = [Symbol(), Symbol()]
const Barrier = require("./barrier")

class Mutex {
  constructor() {
    this[barrier] = new Barrier()
    this[count] = 0
  }

  async Lock() {
    (++this[count] > 1) && await this[barrier].Lock()
  }

  UnLock() {
    (--this[count] > 0) && this[barrier].UnLock()
  }
}

module.exports = Mutex
