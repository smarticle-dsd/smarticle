using System;
using System.Text.Json.Serialization;

namespace getPaperInfo
{
    public class PaperInfo
    {
        [JsonPropertyName("paperId")]
        public string PaperId { get; set; }

        [JsonPropertyName("externalIds")]
        public CitationExternalIds ExternalIds { get; set; }

        [JsonPropertyName("url")]
        public Uri Url { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("abstract")]
        public string Abstract { get; set; }

        [JsonPropertyName("venue")]
        public string Venue { get; set; }

        [JsonPropertyName("year")]
        public long Year { get; set; }

        [JsonPropertyName("referenceCount")]
        public long ReferenceCount { get; set; }

        [JsonPropertyName("citationCount")]
        public long CitationCount { get; set; }

        [JsonPropertyName("influentialCitationCount")]
        public long InfluentialCitationCount { get; set; }

        [JsonPropertyName("isOpenAccess")]
        public bool IsOpenAccess { get; set; }

        [JsonPropertyName("openAccessPdf")]
        public OpenAccessPdf OpenAccessPdf { get; set; }

        [JsonPropertyName("fieldsOfStudy")]
        public string[] FieldsOfStudy { get; set; }

        [JsonPropertyName("s2FieldsOfStudy")]
        public S2FieldsOfStudy[] S2FieldsOfStudy { get; set; }

        [JsonPropertyName("publicationTypes")]
        public string[] PublicationTypes { get; set; }

        [JsonPropertyName("publicationDate")]
        public DateTimeOffset PublicationDate { get; set; }

        [JsonPropertyName("journal")]
        public Journal Journal { get; set; }

        [JsonPropertyName("authors")]
        public PaperInfoAuthor[] Authors { get; set; }

        [JsonPropertyName("citations")]
        public Citation[] Citations { get; set; }

        [JsonPropertyName("references")]
        public Citation[] References { get; set; }

        [JsonPropertyName("embedding")]
        public Embedding Embedding { get; set; }

        [JsonPropertyName("tldr")]
        public Tldr Tldr { get; set; }
    }

    public class PaperInfoAuthor
    {
        [JsonPropertyName("authorId")]
        public string AuthorId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("paperCount")]
        public long PaperCount { get; set; }

        [JsonPropertyName("citationCount")]
        public long CitationCount { get; set; }
    }

    public class AuthorExternalIds
    {
        [JsonPropertyName("DBLP")]
        public long Dblp { get; set; }

        [JsonPropertyName("ORCID")]
        public long Orcid { get; set; }
    }

    public class Citation
    {
        [JsonPropertyName("paperId")]
        public string PaperId { get; set; }

        [JsonPropertyName("externalIds")]
        public CitationExternalIds ExternalIds { get; set; }

        [JsonPropertyName("url")]
        public Uri Url { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("abstract")]
        public string Abstract { get; set; }

        [JsonPropertyName("venue")]
        public string Venue { get; set; }

        [JsonPropertyName("year")]
        public long Year { get; set; }

        [JsonPropertyName("referenceCount")]
        public long ReferenceCount { get; set; }

        [JsonPropertyName("citationCount")]
        public long CitationCount { get; set; }

        [JsonPropertyName("influentialCitationCount")]
        public long InfluentialCitationCount { get; set; }

        [JsonPropertyName("isOpenAcess")]
        public bool IsOpenAcess { get; set; }

        [JsonPropertyName("openAccessPdf")]
        public OpenAccessPdf OpenAccessPdf { get; set; }

        [JsonPropertyName("fieldsOfStudy")]
        public string[] FieldsOfStudy { get; set; }

        [JsonPropertyName("s2FieldsOfStudy")]
        public S2FieldsOfStudy[] S2FieldsOfStudy { get; set; }

        [JsonPropertyName("authors")]
        public CitationAuthor[] Authors { get; set; }
    }

    public class CitationAuthor
    {
        [JsonPropertyName("authorId")]
        public string AuthorId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class CitationExternalIds
    {
        [JsonPropertyName("ArXiv")]
        public string ArXiv { get; set; }

        [JsonPropertyName("DBLP")]
        public string Dblp { get; set; }

        [JsonPropertyName("PubMedCentral")]
        public string PubMedCentral { get; set; }
    }

    public class OpenAccessPdf
    {
        [JsonPropertyName("url")]
        public Uri Url { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }
    }

    public class S2FieldsOfStudy
    {
        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("source")]
        public string Source { get; set; }
    }

    public class Embedding
    {
        [JsonPropertyName("model")]
        public string Model { get; set; }

        [JsonPropertyName("vector")]
        public double[] Vector { get; set; }
    }

    public class Journal
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("pages")]
        public string Pages { get; set; }

        [JsonPropertyName("volume")]
        public string Volume { get; set; }
    }

    public class Tldr
    {
        [JsonPropertyName("model")]
        public string Model { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}
