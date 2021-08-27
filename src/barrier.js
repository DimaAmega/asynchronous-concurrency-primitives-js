const resolveFunctions = Symbol()

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
    const cb = this[resolveFunctions].shift()
    if (cb) cb()
    else throw "Too much UnLocks was invoked :)"
  }
}

module.exports = Barrier
