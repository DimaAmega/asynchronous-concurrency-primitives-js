const resolveFunctions = Symbol()
const TO_MUCH_UNLOCKS = "Too much UnLocks was invoked :)"

class Barrier {
  constructor() {
    this[resolveFunctions] = []
  }

  #createLock() {
    return new Promise((r) => this[resolveFunctions].push(r))
  }

  async Lock() {
    return this.#createLock()
  }

  UnLock() {
    const release =
      this[resolveFunctions].shift() ||
      (() => {
        throw TO_MUCH_UNLOCKS
      })
    release()
  }
}

module.exports = Barrier
