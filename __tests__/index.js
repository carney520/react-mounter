import React from 'react'
import ReactMounter from '../src/index'

describe('test shouldSkipMountChildren', () => {
  const mockFn = jest.fn()
  afterEach(() => {
    mockFn.mockClear()
  })

  test('shouldSkipMountChildren as attribute', () => {
    class Foo extends React.Component {
      shouldSkipMountChildren = true
      render () {
        mockFn()
        return null
      }
    }
    ReactMounter.render(<Foo />)
    expect(mockFn).not.toHaveBeenCalled()

    class Bar extends React.Component {
      shouldSkipMountChildren = false
      render () {
        mockFn()
        return null
      }
    }
    ReactMounter.render(<Bar />)
    expect(mockFn).toHaveBeenCalled()
  })

  test('shouldSkipMountChildren as method', () => {
    class Foo extends React.PureComponent {
      shouldSkipMountChildren () {
        return true
      }
      render () {
        mockFn()
        return null
      }
    }

    ReactMounter.render(<Foo />)
    expect(mockFn).not.toHaveBeenCalled()

    class Bar extends React.PureComponent {
      shouldSkipMountChildren () {
        return false
      }
      render () {
        mockFn()
        return null
      }
    }

    ReactMounter.render(<Bar />)
    expect(mockFn).toHaveBeenCalled()
  })

  test('nested Component', () => {
    const mockFn4Baz = jest.fn()
    const mockFn4Bazz = jest.fn()

    class Baz extends React.Component {
      shouldSkipMountChildren = false
      render () {
        mockFn4Baz()
        return <div>hello baz</div>
      }
    }

    class Bazz extends React.Component {
      shouldSkipMountChildren = true
      render () {
        mockFn4Bazz()
      }
    }

    class Foo extends React.Component {
      shouldSkipMountChildren = true
      render () {
        mockFn()
        return <Baz />
      }
    }

    ReactMounter.render(<Foo />)
    expect(mockFn).not.toHaveBeenCalled()
    expect(mockFn4Baz).not.toHaveBeenCalled()

    class Bar extends React.Component {
      shouldSkipMountChildren = false
      render () {
        mockFn()
        return (<div>
          <Baz />
          <Bazz />
        </div>)
      }
    }

    ReactMounter.render(<Bar />)
    expect(mockFn).toHaveBeenCalled()
    expect(mockFn4Baz).toHaveBeenCalled()
    expect(mockFn4Bazz).not.toHaveBeenCalled()
  })
})
