const resolveFunctions = Symbol()
const TO_MUCH_UNLOCKS = "Too much UnLocks was invoked :)"

class Barrier {
  constructor() {
    this[resolveFunctions] = []
  }

  async _createLock() {
    await new Promise((r) => this[resolveFunctions].push(r))
  }

  async Lock() {
    await this._createLock()
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
