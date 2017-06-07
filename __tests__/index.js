import React from 'react'
import ReactMounter from '../src/index'

describe('test shouldOmitChildren', () => {
  const mockFn = jest.fn()
  const mockFn4WillMount = jest.fn()

  afterEach(() => {
    mockFn.mockClear()
    mockFn4WillMount.mockClear()
  })

  test('shouldOmitChildren as attribute', () => {
    class Foo extends React.Component {
      componentWillMount () {
        mockFn4WillMount()
      }
      shouldOmitChildren = true
      render () {
        mockFn()
        return null
      }
    }
    ReactMounter.render(<Foo />)
    expect(mockFn).not.toHaveBeenCalled()
    expect(mockFn4WillMount).toHaveBeenCalled()

    class Bar extends React.Component {
      shouldOmitChildren = false
      render () {
        mockFn()
        return null
      }
    }
    ReactMounter.render(<Bar />)
    expect(mockFn).toHaveBeenCalled()
  })

  test('shouldOmitChildren as method', () => {
    class Foo extends React.PureComponent {
      shouldOmitChildren () {
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
      shouldOmitChildren () {
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
      shouldOmitChildren = false
      render () {
        mockFn4Baz()
        return <div>hello baz</div>
      }
    }

    class Bazz extends React.Component {
      componentWillMount () {
        mockFn4WillMount()
      }
      shouldOmitChildren = true
      render () {
        mockFn4Bazz()
      }
    }

    class Foo extends React.Component {
      shouldOmitChildren = true
      render () {
        mockFn()
        return <Baz />
      }
    }

    ReactMounter.render(<Foo />)
    expect(mockFn).not.toHaveBeenCalled()
    expect(mockFn4WillMount).not.toHaveBeenCalled()
    expect(mockFn4Baz).not.toHaveBeenCalled()

    class Bar extends React.Component {
      shouldOmitChildren = false
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
    expect(mockFn4WillMount).toHaveBeenCalled()
    expect(mockFn4Baz).toHaveBeenCalled()
    expect(mockFn4Bazz).not.toHaveBeenCalled()
  })
})
