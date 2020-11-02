class Component {

  protected props: Record<string, any>;
  protected children: any[];
  private _root: any
  constructor() {
    this.props = Object.create(null)
    this.children = [];
    this._root = null;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  render(): any {
    throw new Error('Component need render')
  }

  get root() {
    if (!this._root) {
      this._root = this.render().root
    }
    return this._root;
  }
}

export default Component