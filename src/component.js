const ReactMultiChild = require('react-dom/lib/ReactMultiChild')
const { noop } = require('./utils')

function ReactMounterComponent (element) {
  this._currentElement = element
  this._renderedChildren = null
}

Object.assign(
  ReactMounterComponent.prototype,
  {
    mountComponent (transaction, nativeParent, hostContainerInfo, context) {
      const element = this._currentElement
      this.mountChildren(element.props.children, transaction, context)
    },
    // eliminate React warnings
    receiveComponent: noop,
    getHostNode: noop,
    unmountComponent: noop,
  },
  ReactMultiChild.Mixin
)

module.exports = ReactMounterComponent
