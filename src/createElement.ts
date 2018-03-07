/**
 * create by yangran on 2018/3/7
 * @param {String} compName
 * @param {Object} props
 * @param {ArrayLike} args
 * @returns {{props: Object; children: Array; nodeName: String}}
 */
export function createElement(comp: Array | Component, props: Object, ...args: ArrayLike): VNode {
  let children = []
  for (let i = 0; i < args.length; i++) {
    if (Array.isArray(args[i])) {
      children = [ ...children, ...args[i] ]
    } else {
      children = [ ...children, args[i] ]
    }
  }
  return {
    props: props || {},
    children,
    nodeName: comp,
  }
}