import React from 'react'
import ReactMounter from '../src/index'
import RecursiveDirs from './RecursiveDivs'
// stop mount children at depth 4
const Component = (<RecursiveDirs depth={5} breadth={5} textLength skipDepth={4} />)

console.time('ReactMounter')

for (let i = 0; i < 30; i++) {
  ReactMounter.render(Component)
}

console.timeEnd('ReactMounter')
