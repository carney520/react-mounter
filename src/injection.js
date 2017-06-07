require('./patch')
const ReactUpdates = require('react-dom/lib/ReactUpdates')
const ReactHostComponent = require('react-dom/lib/ReactHostComponent')
const ReactEmptyComponent = require('react-dom/lib/ReactEmptyComponent')
const ReactServerBatchingStrategy = require('react-dom/lib/ReactServerBatchingStrategy')
const ReactMounterRecocilerTransaction = require('./reconcileTransaction')
const Component = require('./component')
const { noop } = require('./utils')

function TextComponent (element) {
  this._currentElement = element
}

function EmptyComponent () {
  this._currentElement = null
}

TextComponent.prototype.receiveComponent =
TextComponent.prototype.mountComponent =
TextComponent.prototype.getHostNode =
TextComponent.prototype.unmountComponent =
EmptyComponent.prototype.receiveComponent =
EmptyComponent.prototype.mountComponent =
EmptyComponent.prototype.getHostNode =
EmptyComponent.prototype.unmountComponent = noop

let injected = false
module.exports = function inject () {
  if (injected) return
  injected = true

  // eliminate wanring
  ReactUpdates.injection.injectReconcileTransaction(ReactMounterRecocilerTransaction)

  ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy)
  ReactHostComponent.injection.injectGenericComponentClass(Component)
  ReactHostComponent.injection.injectTextComponentClass(TextComponent)
  ReactEmptyComponent.injection.injectEmptyComponentFactory(() => {
    return new EmptyComponent()
  })
}
