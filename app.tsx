import { createElement, renderVDOM, render } from "./src/yreact";
import Component from './src/component'

const React = {}
React.createElement = createElement
React.Component = Component

class Child extends Component {
  render() {
    return (
      <div style={{ color: this.props.color }}>color is: {this.props.color}<button onClick={() => console.log(this)}>child - this</button></div>
    )
  }
}

const colors = ['red', 'blue', 'yellow', 'black', 'green']
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'grey'
    }
  }
  handleClick() {
    console.log("handleClick")
    this.setState({
      color: colors[parseInt(Math.random() * 5)]
    })
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        <Child color={ this.state.color }/>
        <button onClick={() => console.log(this)}>app - this</button>
      </div>
    )
  }
}

// console.log(renderVDOM(<PS />))
render(<App />, document.getElementById("app"))
// window.fn = () => render(<App />, document.getElementById("app"))
// setTimeout(fn, 1000)
