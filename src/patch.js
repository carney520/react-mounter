// pacth ReactCompositeComponent, it must loaded before instantiateReactComponent
const ReactCompositeComponent = require('react-dom/lib/ReactCompositeComponent')

ReactCompositeComponent._performInitialMountWithErrorHandling = ReactCompositeComponent.performInitialMountWithErrorHandling
ReactCompositeComponent._performInitialMount = ReactCompositeComponent.performInitialMount

function performInitialMount (fallback) {
  return function () {
    const instance = this._instance
    let shouldSkipMountChildren = false
    if (instance.shouldSkipMountChildren) {
      shouldSkipMountChildren = typeof instance.shouldSkipMountChildren === 'function'
        ? instance.shouldSkipMountChildren()
        : instance.shouldSkipMountChildren
    }

    if (shouldSkipMountChildren) {
      return
    } else {
      return fallback.apply(this, arguments)
    }
  }
}
ReactCompositeComponent.performInitialMountWithErrorHandling = performInitialMount(ReactCompositeComponent._performInitialMountWithErrorHandling)
ReactCompositeComponent.performInitialMount = performInitialMount(ReactCompositeComponent._performInitialMount)
