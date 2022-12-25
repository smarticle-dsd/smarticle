/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const getPaperInfo = require("/opt/utils/getPaperInfo");
const getReturnMessages = require("/opt/utils/getReturnMessages");

const getAuthorName = (data) => {
  const authors = data.authors.map((author) => {
    return author.name;
  });
  return authors.join(", ");
};

const getJournal = (data) => {
  const name =
    data.journal && data.journal.name ? data.journal.name : data.venue;
  const volume =
    data.journal && data.journal.volume ? "Vol." + data.journal.volume : "";
  const pages =
    data.journal && data.journal.pages ? "Pages " + data.journal.pages : "";
  const journal = name + " " + volume + " " + pages;
  return journal.replace(/\s+/g, " ").trim();
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let input = {};
  try {
    input = JSON.parse(event.body);
  } catch {
    input = event;
  }

  let paperId = input.paperId;
  let paperTitle = input.paperTitle;

  try {
    const paperInfo = await getPaperInfo({
      paperId,
      paperTitle,
      fieldsToGet:
        "title,authors,references,journal,venue,publicationDate,references.title,references.authors,references.journal,references.venue,references.publicationDate,citations,citations.title,citations.authors,citations.journal,citations.venue,citations.publicationDate,referenceCount,citationCount",
    });

    let nodesAndEdges = [];
    // Number of papers referenced in this paper.
    let referenceCount = paperInfo.data.referenceCount;

    // Number of papers which cite this paper.
    let citationCount = paperInfo.data.citationCount;

    // Number of vertices in the adjacency matrix, 1 is added for current paper
    let verticesCount = referenceCount + citationCount + 1;
    nodesAndEdges.push({
      data: {
        id: paperInfo.data.paperId,
        label: paperInfo.data.title,
        type: "main",
        referenceCount,
        citationCount,
        authors: getAuthorName(paperInfo.data),
        published: paperInfo.data.publicationDate,
        journal: getJournal(paperInfo.data),
        venue: paperInfo.data.venue,
        group: "nodes",
      },
    });

    // Adds a node for each referenced paper and sets up the
    // edges from current paper to all papers it references
    for (i = 1; i < referenceCount + 1; i++) {
      let reference = paperInfo.data.references[i - 1];
      if (reference && reference.paperId) {
        nodesAndEdges.push({
          data: {
            id: reference.paperId,
            label: reference.title,
            type: "reference",
            authors: getAuthorName(reference),
            published: reference.publicationDate,
            journal: getJournal(reference),
            venue: reference.venue,
            group: "nodes",
          },
        });
        nodesAndEdges.push({
          data: {
            source: paperInfo.data.paperId,
            target: reference.paperId,
            label: "Edge label placeholder",
            type: "reference",
            group: "edges",
          },
        });
      }
    }

    // Adds a node for each citation and sets up the
    // edges from papers which cite this paper to the current paper
    for (i = referenceCount + 1; i < verticesCount; i++) {
      let citation = paperInfo.data.citations[i - referenceCount - 1];
      if (citation && citation.paperId) {
        nodesAndEdges.push({
          data: {
            id: citation.paperId,
            label: citation.title,
            type: "citation",
            authors: getAuthorName(citation),
            published: citation.publicationDate,
            journal: getJournal(citation),
            venue: citation.venue,
            group: "nodes",
          },
        });
        nodesAndEdges.push({
          data: {
            source: paperInfo.data.paperId,
            target: citation.paperId,
            label: "Edge label placeholder",
            type: "citation",
            group: "edges",
          },
        });
      }
    }

    return await getReturnMessages({
      messageContent: nodesAndEdges,
    });
  } catch (e) {
    console.log(e);
    return await getReturnMessages({
      messageContent: {
        error: "Failed when search for paper details",
      },
    });
  }
};
