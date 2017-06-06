const cp = require('child_process')
const path = require('path')

cp.fork(path.join(__dirname, './testNative.js'))
cp.fork(path.join(__dirname, './testReactMounter.js'))
