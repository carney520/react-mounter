# react-mounter
A mini renderer for React, this renderer only trigger componentWillMount() in Server Side Rendering.

## why?
如何在同构化的服务端渲染中触发异步操作？有两种方法：
1. 在路由组件中定义静态方法，比如next.js 的getInitialProps 或 Vue中建议定义的[asyncData()](https://ssr.vuejs.org/en/data.html)
2. 调用`renderToString`挂载一次，触发所有componentWillMount()

两种方法都有优缺点:

第一种方法，只能在路由组件的静态方法中定义需要触发的异步操作，子孙组件中不能触发异步操作。这就要求你额外地将子孙组件
中的异步操作提升到路由组件。显然不够优雅，我们更希望能够在componentWillMount() 中直接定义. 但是这个方法很快。

第二种方法，缺点可能让人无法忍受，如下面配合`redux` + `redux-saga`在服务端触发异步操作:
```js
async function render (store, App) {
  const Component = (<App store={store} />)
  // watch ACTIONS
  store.runSaga(saga)

  // trigger all async actions
  renderToStaticMarkup(Component)

  // stop watch ACTIONS immediately
  store.end()

  // wait all async actions done
  await store.done

  return renderToString(Component)
}
```

我们必须使用两次renderToString(), 第一次执行用于触发所有异步操作，第二次执行用于渲染最终的页面。就目前而言renderToString在服务端存在较大的性能瓶颈，它是同步的。如果页面比较复杂，两次渲染效率简直无法忍受。

我最初打算对渲染器进行简化，但是我发现这个方向是无用功，renderToString 已经非常精简、非常快了，尤其是开启了production。对渲染器进行简化带来的性能提升几乎可以忽略不计，因为**渲染器的主要消耗在于遍历组件树**。

但是我们的目的只是为了触发组件中的异步操作, 这些异步操作主要位于`container`中，即组件树的顶层，再往下遍历就是
浪费了。所以`react-mounter`使用一个类似于`shouldComponentUpdate`的`shouldOmitChildren`方法，告诉渲染器
不需要往下遍历了。

## Installing
```
npm i lg-react-mounter
```

## Usage
define Your `Container`
```js
class MyContainer extends React.PureComponent {
  componentWillMount () {
    // async actions
    this.props.dispatch(getList())
  }
  shouldOmitChildren () {
    // pretty simple
    return true
  }
  // or
  // shouldOmitChildren = true
  render () {
    // if shouldOmitChildren return true, render method will not be called
    // ...
  }
}
```

Server-side rendering
```js
import ReactMounter from 'react-mounter'
async function render (store, App) {
  const Component = (<App store={store} />)
  // watch ACTIONS
  store.runSaga(saga)

  // trigger all async actions
  ReactMounter.render(Component)

  // stop watch ACTIONS immediately
  store.end()

  // wait all async actions done
  await store.done

  return renderToString(Component)
}
```

## example
[lg-react-boilerplate](https://github.com/carney520/lg-react-boilerplate/blob/ssr/app/ssr/render.js)
