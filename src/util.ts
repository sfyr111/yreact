/**
 * create by yangran on 2018/3/8
 */

import Component from './component'

/**
 * todo 获取 olddom
 * @param 由谁渲染
 * @returns {HTMLElement}
 */
export function getDOM(comp: IComponent): HTMLElement {
  let rendered = comp.__rendered
  while (rendered instanceof Component) { // 是组件实例就递归
    rendered = rendered.__rendered
  }
  return rendered
}