const createDOMFromString = (domString) => {
  const d = document.createElement('div')
  d.innerHTML = domString
  return d.children[0]
}

class LikeButton {
  constructor() {
    this.state = { isLiked: false }
    this.changeLikeText = this.changeLikeText.bind(this)
  }

  setState(state) {
    const oldEl = this.el
    this.state = state
    this.el = this.render()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  changeLikeText() {
    this.setState({
      isLiked: !this.state.isLiked
    })
    console.log(this.state.isLiked);
    
  }

  render() {
    console.log('render');
    this.el = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `)
    this.el.addEventListener('click', this.changeLikeText, false)
    return this.el
  }
}

const wrapper = document.querySelector('.wrapper')
const likeButton1 = new LikeButton()
wrapper.appendChild(likeButton1.render())
likeButton1.onStateChange = (oldEl, newEl) => {
  wrapper.insertBefore(newEl, oldEl)
  wrapper.removeChild(oldEl)
}

// const likeButton2 = new LikeButton()
// wrapper.appendChild(likeButton2.render())