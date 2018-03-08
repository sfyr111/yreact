import { createElement, renderVDOM, render } from "./src/yreact";
import Component from './src/component'

const React = {}
React.createElement = createElement
React.Component = Component

class C1 extends React.Component {
  render() {
    return (
      <div><span>2</span></div>
    )
  }
}

class Grandson extends React.Component {
  render() {
    // return <div>i am grandson</div>  // React.createElement('div', null, "i am grandson")
    console.log(this.props)
    return (
      <div>
        <span>1123</span>
      </div>
    )
  }
}

class Son extends React.Component {
  render() {
    // return <Grandson /> // React.createElement(Grandson)
    return (
      <header>
        <Grandson />
      </header>
    )
  }
}
class Father extends React.Component {
  render() {
    return <Son /> // React.createElement(Son)
  }
}

// const vv = renderVDOM(<Father />)
// console.log("vv:", vv)
render(<Father />, document.getElementById('app'))