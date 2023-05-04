function isInputField(node: HTMLElement): boolean {
  const tagName = node.tagName.toLowerCase();
  if (tagName === "input" || tagName === "textarea") {
    return true;
  }

  return false;
}

export default isInputField;
