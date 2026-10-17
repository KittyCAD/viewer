// Update values and labels without replacing controls the user is interacting with.
export function createMarkupUpdater(document: Document) {
  const previousMarkup = new WeakMap<Element, string>()
  const syncChildren = (current: Node, desired: Node) => {
    const currentChildren = [...current.childNodes]
    const desiredChildren = [...desired.childNodes]
    for (let index = 0; index < Math.max(currentChildren.length, desiredChildren.length); index++) {
      const existing = currentChildren[index]
      const next = desiredChildren[index]
      if (!next) {
        existing.remove()
      } else if (!existing) {
        current.appendChild(next)
      } else if (existing.nodeType !== next.nodeType || existing.nodeName !== next.nodeName) {
        current.replaceChild(next, existing)
      } else if (existing instanceof Element && next instanceof Element) {
        for (const attribute of [...existing.attributes]) {
          if (!next.hasAttribute(attribute.name)) existing.removeAttribute(attribute.name)
        }
        for (const attribute of [...next.attributes]) {
          if (existing.getAttribute(attribute.name) !== attribute.value) {
            existing.setAttribute(attribute.name, attribute.value)
          }
        }
        syncChildren(existing, next)
        if (existing instanceof HTMLInputElement && next instanceof HTMLInputElement) {
          if (existing.value !== next.value) existing.value = next.value
          if (existing.checked !== next.checked) existing.checked = next.checked
        }
      } else if (existing.nodeValue !== next.nodeValue) {
        existing.nodeValue = next.nodeValue
      }
    }
  }

  return (element: Element, markup: string) => {
    if (previousMarkup.get(element) === markup) return
    const template = document.createElement('template')
    template.innerHTML = markup
    syncChildren(element, template.content)
    previousMarkup.set(element, markup)
  }
}
