import React from 'react'
function foo () {}

export default class RecursiveDirs extends React.Component {
  componentWillMount () {
    foo()
  }
  render () {
    const { depth, breadth, textLength } = this.props
    if (depth <= 0) {
      return <div>hello world</div>
    }

    let children = []
    for (let i = 0; i < breadth; i++) {
      children.push(<RecursiveDirs key={i} depth={depth - 1} breadth={breadth} textLength={textLength} />)
    }
    return <div>{children}</div>
  }
}
