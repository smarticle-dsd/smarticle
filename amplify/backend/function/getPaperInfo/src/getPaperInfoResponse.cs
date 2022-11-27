using System;

namespace getPaperInfo
{
    public class GetPaperInfoResponse
    {
        public string PaperId { get; set; }
        public Uri Url { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
        public long Year { get; set; }
        public PaperInfoAuthor[] Authors { get; set; }
        public Tldr Tldr { get; set; }
    }
}