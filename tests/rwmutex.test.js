const RWMutex = require("../src/rwmutex")
const sleep = require("../src/helpers/sleep")

describe("Simple tests", () => {
  let rwmutex = undefined
  let readersInCs = 0
  let writersInCs = 0

  const CSJob = async (workerType) => {
    switch (workerType) {
      case "reader":
        ++readersInCs
        if (writersInCs > 0) {
          throw "reader with writer"
        }
        break
      case "writer":
        ++writersInCs
        if (writersInCs > 1) {
          throw "a few writers in cs"
        }
        if (readersInCs > 0) {
          throw "writer with reader"
        }
        break

      default:
        throw `unsupported ${workerType}`
    }

    await sleep(1e-4 * Math.random())

    switch (workerType) {
      case "reader":
        --readersInCs
        break
      case "writer":
        --writersInCs
        break
    }
  }

  const execute = async (cb, type) => {
    if (type === "reader") {
      await rwmutex.RLock()
    } else if (type === "writer") {
      await rwmutex.Lock()
    } else {
      throw "unsupported 1"
    }
    await cb(type)
    if (type === "reader") {
      await rwmutex.RUnLock()
    } else if (type === "writer") {
      await rwmutex.UnLock()
    } else {
      throw "unsupported"
    }
  }

  afterEach(() => {
    rwmutex = undefined
    threadsInCs = 0
  })

  beforeEach(() => {
    rwmutex = new RWMutex()
    threadsInCs = 0
  })

  test("reader and writer", async () => {
    await Promise.all([
      execute(CSJob, "reader"),
      execute(CSJob, "writer"),
    ])
  })

  test("a few writers", async () => {
    console.time("a few writers")

    await Promise.all(
      Array(50)
        .fill()
        .map(() => execute(CSJob, "writer"))
    )
    console.timeEnd("a few writers")
  })

  test("a few readers", async () => {
    console.time("a few readers")

    await Promise.all(
      Array(50)
        .fill()
        .map(() => execute(CSJob, "reader"))
    )
    console.timeEnd("a few readers")
  })

  test("readers and writers", async () => {
    console.time("readers and writers")

    await Promise.all([
      ...Array(500)
        .fill()
        .map(() => execute(CSJob, "reader")),
      ...Array(500)
        .fill()
        .map(() => execute(CSJob, "writer")),
    ])
    console.timeEnd("readers and writers")
  })
})
