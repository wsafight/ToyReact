import ToyComponent from "./ToyComponent";
import ElementWrapper from "./ElementWrapper";
import { insertChild } from "./utils";
import { RENDER_TO_DOM } from "./const";
export {ToyComponent}

export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === 'string') {
    e = new ElementWrapper(type)
  } else {
    e = new type;
  }
  for (let p in attributes) {
    e.setAttribute(p, attributes[p]);
  }

  insertChild(e, children)

  return e;
}

export function render(component: ToyComponent, parentElement: HTMLElement) {
  const range = document.createRange()
  range.setStart(parentElement, 0)
  range.setEnd(parentElement, parentElement.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
}
