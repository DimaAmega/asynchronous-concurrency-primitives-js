const COLORS = {
  // add new colors here
  c1: "\x1b[33m",
  c2: "\x1b[36m",
  c3: "\x1b[34m",
  c4: "\x1b[31m",
}

class ColorLog {
  constructor() {
    let num = 1
    this.colors = {
      ...COLORS,
      next: function () {
        if (this[`c${num}`]) return this[`c${num++}`]
        num = 1
        console.log("the colors are over, repeating")
        return this.next()
      },
    }
    this.prefix2Color = {}
  }

  log(message, prefix = "") {
    let resultString = ""

    if (prefix) {
      if (!this.prefix2Color[prefix])
        this.prefix2Color[prefix] = this.colors.next()

      resultString = `${prefix.toUpperCase()}: ${message}`
      console.log(`${this.prefix2Color[prefix]}%s\x1b[0m`, resultString)
    } else {
      resultString = message
      console.log(message)
    }
  }
}

module.exports = ColorLog
