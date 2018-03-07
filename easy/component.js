const createDOMFromString = (domString) => {
  const d = document.createElement('div')
  d.innerHTML = domString
  return d
}

class Component {
  constructor(props = {}) {
    this.props = props
  }

  setState(state) {
    const oldEl = this.el
    this.state = state
    this.el = this.renderDOM()
    if (this.onSateChange) this.onSateChange(oldEl, this.el)
  }

  renderDOM() {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
} 