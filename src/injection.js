const ReactDefaultBatchingStrategy = require('react-dom/lib/ReactDefaultBatchingStrategy')
const ReactUpdates = require('react-dom/lib/ReactUpdates')
const ReactHostComponent = require('react-dom/lib/ReactHostComponent')
const ReactMounterRecocilerTransaction = require('./reconcileTransaction')
const Component = require('./component')

function TextComponent (element) {
  this._currentElement = element
}

TextComponent.prototype.receiveComponent =
TextComponent.prototype.mountComponent =
TextComponent.prototype.getHostNode =
TextComponent.prototype.unmountComponent = () => {}


let injected = false
module.exports = function inject () {
  if (injected) return
  injected = true

  ReactUpdates.injection.injectReconcileTransaction(
    ReactMounterRecocilerTransaction
  )
  ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy)
  ReactHostComponent.injection.injectGenericComponentClass(Component)
  ReactHostComponent.injection.injectTextComponentClass(TextComponent)
}
