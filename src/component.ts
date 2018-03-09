import { getDOM } from "./util"
import { render } from "./render"

export default class Component {
  public state: object
  public props: IProps
  public render: Function
  constructor(props) {
    this.props = props
  }

  setState(state) {
    setTimeout(() => {
      this.state = state
      const vnode = this.render()
      let olddom = getDOM(this)
      render(vnode, olddom.parentNode, this, olddom)
    }, 0)
  }

}