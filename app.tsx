import { createElement, renderVDOM } from "./src/yreact";

const React = {}
React.createElement = createElement
React.Component = class Component {}

class Grandson extends React.Component {
  render() {
    return <div>i am grandson</div>  // React.createElement('div', null, "i am grandson")
}
}
class Son extends React.Component {
  render() {
    return <Grandson /> // React.createElement(Grandson)
  }
}
class Father extends React.Component {
  render() {
    return <Son /> // React.createElement(Son)
  }
}

const vv = renderVDOM(<Father />)
console.log("vv:", vv)