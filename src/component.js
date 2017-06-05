const ReactMultiChild = require('react-dom/lib/ReactMultiChild')

const Noop = () => {}
function ReactMounterComponent (element) {
  this._currentElement = element
  this._renderedChildren = null
}

Object.assign(
  ReactMounterComponent.prototype,
  {
    mountComponent (transaction, nativeParent, hostContainerInfo, context) {
      const element = this._currentElement
      console.log(this)
      this.mountChildren(element.props.children, transaction, context)
    },
    // eliminate React warnings
    receiveComponent: Noop,
    getHostNode: Noop,
    unmountComponent: Noop,
  },
  ReactMultiChild.Mixin
)

module.exports = ReactMounterComponent
