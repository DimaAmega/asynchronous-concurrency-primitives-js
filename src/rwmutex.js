const Mutex = require("./mutex")

const [mutex, writersCount] = [Symbol(), Symbol()]

class RWMutex {
  constructor() {
    this[mutex] = new Mutex()
    this[writersCount] = 0
  }

  async Lock() {
    return this[mutex].Lock()
  }

  UnLock() {
    this[mutex].UnLock()
  }

  async RLock() {
    if (++this[writersCount] == 1) {
      await this[mutex].Lock()
    }
  }

  async RUnLock() {
    if (--this[writersCount] == 0) {
      await this[mutex].UnLock()
    }
  }
}

module.exports = RWMutex
