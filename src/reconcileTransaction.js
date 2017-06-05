const CallbackQueue = require('react-dom/lib/CallbackQueue')
const PooledClass = require('react-dom/lib/PooledClass')
const Transaction = require('react-dom/lib/Transaction')

const ON_DOM_READY_QUEUEING = {
  initialize () {
    this.reactMountReady.reset()
  },
  close () {
    this.reactMountReady.notifyAll()
  }
}

const TRANSACTION_WRAPPER = [ON_DOM_READY_QUEUEING]

function ReactMounterRecocilerTransaction () {
  this.reinitializeTransaction()
  this.reactMountReady = CallbackQueue.getPooled(this)
}

const Mixin = {
  getTransactionWrappers () {
    return TRANSACTION_WRAPPER
  },
  getReactMountReady () {
    return this.reactMountReady
  },
  destructor () {
    CallbackQueue.release(this.reactMountReady)
    this.reactMountReady = null
  }
}

Object.assign(
  ReactMounterRecocilerTransaction.prototype,
  Transaction,
  ReactMounterRecocilerTransaction,
  Mixin
)

PooledClass.addPoolingTo(ReactMounterRecocilerTransaction)

module.exports = ReactMounterRecocilerTransaction
