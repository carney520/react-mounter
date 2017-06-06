import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import RecursiveDirs from './RecursiveDivs'

const Component = (<RecursiveDirs depth={5} breadth={5} textLength />)

console.time('renderToStaticMarkup')

for (let i = 0; i < 30; i++) {
  renderToStaticMarkup(Component)
}

console.timeEnd('renderToStaticMarkup')

console.time('renderToString')
for (let i = 0; i < 30; i++) {
  renderToString(Component)
}
console.timeEnd('renderToString')
