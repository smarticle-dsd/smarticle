export const formatDataForDisplay = (data: Record<string, string>) => {
  const returnValues: Record<string, string> = {};

  returnValues["Paper Title"] = data.label;
  returnValues["Paper ID"] = data.id;
  returnValues["Authors"] = data.authors;
  if (data.referenceCount != null)
    returnValues["Number of References"] = data.referenceCount;
  if (data.citationCount != null)
    returnValues["Number of Citations"] = data.citationCount;
  if (data.published != null)
    returnValues["Date of Publication"] = data.published;
  if (data.journal != null) returnValues["Published Journal"] = data.journal;

  return returnValues;
};
