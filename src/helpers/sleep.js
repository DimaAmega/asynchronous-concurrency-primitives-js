module.exports = (ms) => {
  return new Promise((r) => setTimeout(r, 1000 * ms, 1000 * ms))
}
