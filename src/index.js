const instantiateReactComponent = require('react-dom/lib/instantiateReactComponent')
const ReactUpdates = require('react-dom/lib/ReactUpdates')
const inject = require('./injection')

inject()

function mountComponentIntoNode (
  componentInstance,
  transaction,
  hostParent,
  hostContainerInfo,
) {
  const image = componentInstance.mountComponent(
    transaction,
    null,
    hostContainerInfo,
    {},
  )
  return image
}

function render (nextElement) {
  const instance = instantiateReactComponent(nextElement, false)
  ReactUpdates.batchedUpdates(() => {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled()
    console.log(transaction)
    const image = transaction.perform(() => {
      mountComponentIntoNode(
        instance,
        transaction,
        null,
        null
      )
    })
    console.log(image)
  })
  return instance
}

module.exports = {
  render,
}
