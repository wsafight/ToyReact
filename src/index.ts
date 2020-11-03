import Component from "./Component";
import ElementWrapper from "./ElementWrapper";
import TextWrapper from "./TextWrapper";
import { RENDER_TO_DOM } from "./const";

/**
 * 插入孩子节点
 * @param children
 */
export function insertChild(e: HTMLElement, children: any[]) {
  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child)
    }

    if (children === null) {
      continue
    }

    Array.isArray(child) ? insertChild(e, child) : e.appendChild(child)
  }
}

function createElement(type, attributes, ...children) {
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

function render(component: Component, parentElement: HTMLElement) {
  const range = document.createRange()
  range.setStart(parentElement, 0)
  range.setEnd(parentElement, parentElement.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_DOM](range)
}


export {
  Component,
  createElement,
  render
}