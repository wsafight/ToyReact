(() => {
  // src/toy-react.ts
  class ElementWrapper {
    constructor(type) {
      this.root = document.createElement(type);
    }
    setAttribute(name, value) {
      this.root.setAttribute(name, value);
    }
    appendChild(component) {
      this.root.appendChild(component.root);
    }
  }
  class TextWrapper {
    constructor(component) {
      this.root = document.createTextNode(component);
    }
  }
  class Component {
    constructor() {
      this.props = Object.create(null);
      this.children = [];
      this._root = null;
    }
    setAttribute(name, value) {
      this.props[name] = value;
    }
    appendChild(component) {
      this.children.push(component);
    }
    render() {
      throw new Error("Component need render");
    }
    get root() {
      if (!this._root) {
        this._root = this.render().root;
      }
      return this._root;
    }
  }
  function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === "string") {
      e = new ElementWrapper(type);
    } else {
      e = new type();
    }
    for (let p in attributes) {
      e.setAttribute(p, attributes[p]);
    }
    function insertChild(children2) {
      for (let child of children2) {
        if (typeof child === "string") {
          child = new TextWrapper(child);
        }
        if (typeof child === "object" && child instanceof Array) {
          insertChild(child);
        } else {
          e.appendChild(child);
        }
      }
    }
    insertChild(children);
    return e;
  }
  function render(component, parentElement) {
    parentElement.appendChild(component.root);
  }

  // main.tsx
  class MyComponent extends Component {
    render() {
      return /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h1", null, "my component"), this.children);
    }
  }
  render(/* @__PURE__ */ createElement(MyComponent, {
    id: "a",
    class: "c"
  }, /* @__PURE__ */ createElement("div", null, "abc"), /* @__PURE__ */ createElement("div", null), /* @__PURE__ */ createElement("div", null)), document.body);
})();
