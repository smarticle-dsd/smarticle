using System.Text.Json.Serialization;

namespace getPaperInfo
{
    public class SearchByTitle
    {
        [JsonPropertyName("total")]
        public int Total { get; set; }

        [JsonPropertyName("data")]
        public Data[] Data { get; set; }
    }

    public class Data
    {
        [JsonPropertyName("paperId")]
        public string PaperId { get; set; }

        [JsonPropertyName("authors")]
        public PaperInfoAuthor[] Authors { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
    }
}