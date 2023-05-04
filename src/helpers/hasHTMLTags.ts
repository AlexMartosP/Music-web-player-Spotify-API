function hasHTMLTags(inputString: string | undefined): boolean {
  if (!inputString) return false;

  const tester = /<\/?[a-z][\s\S]*>/i;

  return tester.test(inputString);
}

export default hasHTMLTags;
