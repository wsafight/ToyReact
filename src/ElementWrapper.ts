import ToyComponent from "./ToyComponent";
import {replaceContent} from "./utils";
import { RENDER_TO_DOM } from "./const";

class ElementWrapper extends ToyComponent {
  protected vchildren: any[]
  constructor(protected type: string) {
    super()
  }

  get vdom () {
    this.vchildren = this.children.map(child => child.vdom)
    return this
  }

  [RENDER_TO_DOM](range) {
    this.range = range

    const root = document.createElement(this.type)

    for (let name in this.props) {
      const value = this.props[name]
      if (name.match(/^on([\s\S]+)$/)) {
        root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value)
      } else {
        if (name === 'className') {
          root.setAttribute('class', value)
        } else {
          root.setAttribute(name, value)
        }
      }
    }

    if (!this.vchildren) {
      this.vchildren = this.children.map(child => child.vdom)
    }

    for (let child of this.vchildren) {
      let childRange = document.createRange()
      childRange.setStart(root, root.childNodes.length)
      childRange.setEnd(root, root.childNodes.length)
      child[RENDER_TO_DOM](childRange)
    }

    replaceContent(range, root)
  }
}

export default ElementWrapper