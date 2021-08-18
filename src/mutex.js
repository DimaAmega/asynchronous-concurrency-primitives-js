const UNDEFINED_RESOLVE_FUNCTION = "RESOLVE_FUNCTION_IS_UNDEFINED";
const resolveFunction = Symbol();

class Mutex {
  constructor() {
    this[resolveFunction] = UNDEFINED_RESOLVE_FUNCTION;
  }

  async _createLock() {
    await new Promise((r) => (this[resolveFunction] = r));
  }

  async Lock() {
    await this._createLock();
  }

  UnLock() {
    this[resolveFunction]();
  }
}

module.exports = Mutex;
