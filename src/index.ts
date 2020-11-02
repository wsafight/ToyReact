import ElementWrapper from "./ElementWrapper";
import TextWrapper from "./TextWrapper";

export {defautl as Component} from './Component'

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

    function insertChild(children) {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child)
            }
            if (typeof child === 'object' && child instanceof Array) {
                insertChild(child)
            } else {
                e.appendChild(child);
            }
        }
    }

    insertChild(children)

    return e;
}

export function render(component, parentElement) {
    parentElement.appendChild(component.root)
}