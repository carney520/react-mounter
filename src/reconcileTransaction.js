const PooledClass = require('react-dom/lib/PooledClass')
const Transaction = require('react-dom/lib/Transaction')
const ReactUpdateQueue = require('react-dom/lib/ReactUpdateQueue')
const { noop } = require('./utils')

const noopCallbackQueue = {
  enqueue: noop
}

const TRANSACTION_WRAPPER = []

function ReactMounterRecocilerTransaction () {
  this.reinitializeTransaction()
}

const Mixin = {
  getTransactionWrappers () {
    return TRANSACTION_WRAPPER
  },
  getReactMountReady () {
    return noopCallbackQueue
  },
  getUpdateQueue () {
    return ReactUpdateQueue
  },
  destructor: noop,
  checkpoint: noop,
  rollback: noop,
}

Object.assign(
  ReactMounterRecocilerTransaction.prototype,
  Transaction,
  ReactMounterRecocilerTransaction,
  Mixin
)

PooledClass.addPoolingTo(ReactMounterRecocilerTransaction)

module.exports = ReactMounterRecocilerTransaction
