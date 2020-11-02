class TextWrapper {
  private root: Text
  constructor(component) {
    this.root = document.createTextNode(component)
  }
}

export default TextWrapper