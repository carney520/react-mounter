// pacth ReactCompositeComponent, it must loaded before instantiateReactComponent
const ReactCompositeComponent = require('react-dom/lib/ReactCompositeComponent')

ReactCompositeComponent._performInitialMountWithErrorHandling = ReactCompositeComponent.performInitialMountWithErrorHandling
ReactCompositeComponent._performInitialMount = ReactCompositeComponent.performInitialMount

function performInitialMount (fallback) {
  return function () {
    const instance = this._instance
    let shouldOmitChildren = false
    if (instance.shouldOmitChildren) {
      shouldOmitChildren = typeof instance.shouldOmitChildren === 'function'
        ? instance.shouldOmitChildren()
        : instance.shouldOmitChildren
    }

    if (shouldOmitChildren) {
      if (instance.componentWillMount) {
        instance.componentWillMount()
      }
      return
    } else {
      return fallback.apply(this, arguments)
    }
  }
}
ReactCompositeComponent.performInitialMountWithErrorHandling = performInitialMount(ReactCompositeComponent._performInitialMountWithErrorHandling)
ReactCompositeComponent.performInitialMount = performInitialMount(ReactCompositeComponent._performInitialMount)
