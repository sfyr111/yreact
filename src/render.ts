export function render(vnode: VNode, parent: HTMLElement, comp: IComponent, olddom: HTMLElement) {
  let dom
  if (typeof vnode === 'string') { // 文本节点直接渲染
    dom = document.createTextNode(vnode)

    comp && (comp.__rendered = dom)
    parent.appendChild(dom)

    if (olddom) parent.replaceChild(dom, olddom)
    else parent.appendChild(dom)

  } else if(typeof vnode.nodeName === 'string') {
    dom = document.createElement(vnode.nodeName)

    comp && (comp.__rendered = dom)
    setAttrs(dom, vnode.props)

    if (olddom) parent.replaceChild(dom, olddom)
    else parent.appendChild(dom)

    // 虚拟dom 渲染后递归
    for (let i = 0; i < vnode.children.length; i++) {
      render(vnode.children[i], dom)
    }

  } else if (typeof vnode.nodeName === 'function') { // 组件
    let func = vnode.nodeName
    let inst = new func(vnode.props) // 组件实例

    comp && (comp.__rendered = inst)

    let innerVNode = inst.render() // 组件render 出来递归
    render(innerVNode, parent, inst, olddom)
  }
}

function setAttrs(dom: HTMLElement, props: object) {
  const keys: string[] = Object.keys(props)
  keys.forEach((k: string) => {
    const v = props[k]

    if (k === 'className') {
      dom.setAttribute('class', v)
      return
    }

    if (k === 'style') {
      if (typeof v === 'string') {
        dom.style.cssText = v
      }

      if (typeof v === 'object') {
        for (let i in v) {
          dom.style[i] = v[i]
        }
      }

      return
    }

    if (k[0] === 'o' && k[1] === 'n') {
      // onClickCapture
      const capture = k.indexOf('Capture') !== -1
      dom.addEventListener(k.replace('Capture', '').substring(2).toLowerCase(), v, capture)
      return
    }

    dom.setAttribute(k, v)
  })
}