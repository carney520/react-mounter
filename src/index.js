const inject = require('./injection')
const instantiateReactComponent = require('react-dom/lib/instantiateReactComponent')
const ReactDefaultBatchingStrategy = require('react-dom/lib/ReactDefaultBatchingStrategy')
const ReactMounterRecocilerTransaction = require('./reconcileTransaction')

inject()

function mountComponentIntoNode (
  componentInstance,
  transaction,
  hostParent,
  hostContainerInfo
) {
  const image = componentInstance.mountComponent(
    transaction,
    null,
    hostContainerInfo,
    {}
  )
  return image
}

function render (nextElement) {
  let transaction
  try {
    transaction = ReactMounterRecocilerTransaction.getPooled()
    return transaction.perform(() => {
      const instance = instantiateReactComponent(nextElement, false)
      return mountComponentIntoNode(instance, transaction, null, {})
    })
  } finally {
    ReactMounterRecocilerTransaction.release(transaction)
  }
}

module.exports = {
  render,
}
