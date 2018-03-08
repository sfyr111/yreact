/**
 * create by yangran on 2018/3/7
 * @param {VNode | Component} vnode
 * @returns {VNode}
 */
export function renderVDOM(vnode: VNode): VNode {
  if (!vnode) return // 可能是函数执行
  // text 节点
  if (typeof vnode === 'string') return vnode
  // 普通vnode
  else if (typeof vnode.nodeName === 'string') {
    let result = {
      nodeName: vnode.nodeName,
      props: vnode.props,
      children: []
    }

    for (let i = 0; i < vnode.children.length; i++) {
      result.children.push(renderVDOM(vnode.children[i]))
    }
    return result
    // class 组件
  } else if (typeof vnode.nodeName === 'function') {
    let func = vnode.nodeName
    let inst = new func(vnode.props)
    let innerVnode = inst.render()
    return renderVDOM(innerVnode)
  }
}