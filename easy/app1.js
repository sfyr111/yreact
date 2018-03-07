const mount = (wrapper, component) => {
  wrapper.appendChild(component.renderDOM())
  component.onSateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeChild(oldEl)
  }
}

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = { isLike: false }
  }

  onClick() {
    this.setState({
      isLike: !this.state.isLike
    })
  }

  render() {
    return `
      <button class='like-btn'>
        <span class='like-text'>${this.props.word || ''} ${this.state.isLike ? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `
  }
}

const wrapper = document.querySelector('.wrapper')
mount(wrapper, new LikeButton({ word: 'like?' }))
