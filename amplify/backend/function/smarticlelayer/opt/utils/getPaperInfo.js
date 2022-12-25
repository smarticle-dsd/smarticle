const getPapersByTitle = require("/opt/utils/getPapersByTitle");
const querySemanticScholarByPaperId = require("/opt/utils/querySemanticScholarByPaperId");

async function getPaperInfo({ paperId, paperTitle, fieldsToGet }) {
  if (paperId === null && paperTitle !== null) {
    const paperDetails = await getPapersByTitle({
      paperTitle,
      fieldsToGet: "paperId,title,authors",
      limit: 1,
    });
    console.log("Paper details", paperDetails);
    if (paperDetails.data.length > 0) paperId = paperDetails.data[0].paperId;
  }
  if (paperId !== null) {
    return await querySemanticScholarByPaperId({
      paperId,
      fieldsToGet,
    });
  }
}

module.exports = getPaperInfo;
