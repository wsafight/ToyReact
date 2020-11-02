import ToyComponent from "./ToyComponent";
import { replaceContent } from "./utils";
import { RENDER_TO_DOM, textNode } from "./const";

class TextWrapper extends ToyComponent {
  private type: Symbol = textNode;
  protected content: string;

  constructor(content: string = '') {
    super()
    this.content = content
  }

  get vdom() {
    return this
  }

  [RENDER_TO_DOM](range) {
    this.range = range
    const root = document.createTextNode(this.content)
    replaceContent(range, root)
  }

}

export default TextWrapper