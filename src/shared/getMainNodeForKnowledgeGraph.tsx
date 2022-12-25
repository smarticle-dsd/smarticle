export const getMainNode = (
  elements: Array<Record<string, Record<string, string>>> | null,
) => {
  return elements
    ? elements.filter(
        (node: Record<string, Record<string, string>>) =>
          node.data.type === "main",
      )[0].data
    : null;
};
