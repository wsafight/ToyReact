import { RENDER_TO_DOM } from "./const";
import { mergeState, updateNode } from "./utils";

class ToyComponent {
  /**
   * 组件属性
   * @protected
   */
  protected props: Record<string, any> = Object.create(null);
  protected children: any[] = [];
  protected state: any;
  protected root: any = null;
  protected range: any = null
  private _vdom: any = null

  setAttribute(name, value) {
    this.props[name] = value;
  }

  appendChild(component) {
    this.children.push(component);
  }

  get vdom() {
    return this.render().vdom
  }

  render(): any {
    throw new Error('Component need render function')
  }

  [RENDER_TO_DOM](range) {
    this.range = range
    this._vdom = this.vdom
    this._vdom[RENDER_TO_DOM](range)
  }

  update() {
    const vdom = this.vdom
    updateNode(this._vdom, vdom)
    this._vdom = vdom
  }

  setState(newState) {
    if (this.state === null || typeof this.state !== "object") {
      this.state = newState
      this.update()
      return
    }
    mergeState(this.state, newState)
    this.update()
  }
}

export default ToyComponent