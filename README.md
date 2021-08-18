# asynchronous-mutex-js
### simple example (see index.js)
```js
const Mutex = require(`./src/mutex`);
const ColorLog = require("./src/helpers/color-log");
const sleep = require("./src/helpers/sleep");
const [CorutineOne, CorutineTwo] = [1, 2].map((n) => `corutine ${n}`);

// Global variables
const m = new Mutex();
const c = new ColorLog();

(async () => {
  c.log(`Lock mutex`, CorutineOne);
  await m.Lock();
  c.log(`Do some stuff`, CorutineOne);
})();

(async () => {
  c.log(`sleep ...`, CorutineTwo);
  await sleep(1);
  m.UnLock();
  c.log(`UnLock was invoked :)`, CorutineTwo);
})();
```
### stdout:
```bash
CORUTINE 1: Lock mutex
CORUTINE 2: sleep ...
CORUTINE 2: UnLock was invoked :)
CORUTINE 1: Do some stuff after
```
