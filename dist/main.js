(() => {
  // src/ElementWrapper.ts
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
  var ElementWrapper_default = ElementWrapper;

  // src/TextWrapper.ts
  class TextWrapper {
    constructor(component) {
      this.root = document.createTextNode(component);
    }
  }
  var TextWrapper_default = TextWrapper;

  // src/index.ts
  function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === "string") {
      e = new ElementWrapper_default(type);
    } else {
      e = new type();
    }
    for (let p in attributes) {
      e.setAttribute(p, attributes[p]);
    }
    function insertChild(children2) {
      for (let child of children2) {
        if (typeof child === "string") {
          child = new TextWrapper_default(child);
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
  class MyComponent extends defautl {
    render() {
      return /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h1", null, "my component"), this.children);
    }
  }
  render(/* @__PURE__ */ createElement(MyComponent, {
    id: "a",
    class: "c"
  }, /* @__PURE__ */ createElement("div", null, "abc"), /* @__PURE__ */ createElement("div", null), /* @__PURE__ */ createElement("div", null)), document.body);
})();
