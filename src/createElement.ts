/**
 * create by yangran on 2018/3/7
 * @param {String} compName
 * @param {Object} props
 * @param {ArrayLike} args
 * @returns {{props: Object; children: Array; nodeName: String}}
 */
export function createElement(comp: string | VNode, props: IProps, ...args): VNode {
  let children = []
  props = props || {}
  for (let i = 0; i < args.length; i++) {
    if (Array.isArray(args[i])) {
      children = [ ...children, ...args[i] ]
    } else {
      children = [ ...children, args[i] ]
    }
  }
  return {
    nodeName: comp,
    props: props || {},
    children,
  }
}