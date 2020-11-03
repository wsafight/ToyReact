import { RENDER_TO_DOM, textNode } from "./const";

interface ComponentNode {
  /** 组件类型 */
  type: string | Symbol;
  /** 组件属性 */
  props: Record<string, any>;
  /** 文本节点的内容 */
  content?: string;
  range: any;
  /** 虚拟子节点 */
  vchildren: any[]
}

/**
 * 是否为相同节点
 * @param oldNode
 * @param newNode
 */
export function isSameNode(
  oldNode: ComponentNode,
  newNode: ComponentNode
): boolean {
  if (oldNode.type !== newNode.type) {
    return false
  }

  if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length) {
    return false
  }

  for (let name in newNode.props) {
    if (newNode.props[name] !== oldNode.props[name]) {
      return false
    }
  }

  if (newNode.type === textNode) {
    if (newNode.content !== oldNode.content) {
      return false
    }
  }

  return true
}

export function updateNode(oldNode: ComponentNode, newNode: ComponentNode) {
  if (!isSameNode(oldNode, newNode)) {
    newNode[RENDER_TO_DOM](oldNode.range)
    return
  }

  newNode.range = oldNode.range

  const newChildren = newNode.vchildren
  const oldChildren = oldNode.vchildren

  if (!newChildren?.length) {
    return
  }
  let tailRange = oldChildren[oldChildren.length - 1]._range

  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i]
    const oldChild = oldChildren[i]
    if (i < oldChildren.length) {
      updateNode(oldChild, newChild)
    } else {
      const range = document.createRange()
      range.setStart(tailRange.endContainer, tailRange.endOffset)
      range.setEnd(tailRange.endContainer, tailRange.endOffset)
      newChild[RENDER_TO_DOM](range)
      tailRange = range
    }
  }
}

/**
 * 混合状态
 * @param oldState
 * @param newState
 */
export function mergeState(oldState: any, newState: any) {
  for (let p in newState) {
    if (oldState[p] === null || typeof oldState[p] !== 'object') {
      oldState[p] = newState[p]
    } else {
      mergeState(oldState[p], newState[p])
    }
  }
}

/**
 * 替换 content
 * @param range
 * @param node
 */
export function replaceContent(range, node) {
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents();

  range.setStartBefore(node)
  range.setEndAfter(node)
}

