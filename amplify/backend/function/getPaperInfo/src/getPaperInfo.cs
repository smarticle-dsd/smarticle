using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Flurl.Http;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace getPaperInfo
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class getPaperInfo
    {
        private static readonly FlurlClient MyClient = new FlurlClient("https://api.semanticscholar.org/graph/v1");

        public getPaperInfo()
        {
            MyClient.Headers.Add("x-api-key", "74YznjI4XpavHyy6QrUw91YlRNrOa0kr4c3k1j3N");
        }

        /// <summary>
        /// Your Lambda's input type.
        /// Change this to match whatever event you intend to send, or
        /// use one of the Amazon.Lambda.XXXEvents NuGet packages
        /// </summary>
        public class LambdaEvent
        {
            public string PaperTitle { get; set; }
            public string[] AuthorsLastNames { get; set; }
        }

        // If you rename this function, you will need to update the invocation shim
        // to match if you intend to test the function with 'amplify mock function'
#pragma warning disable CS1998
        public async Task<dynamic> LambdaHandler(LambdaEvent input, ILambdaContext context)
        {
            // TODO implement pagination
            var searchByTitleRequest = MyClient
                .Request("paper", "search")
                .SetQueryParam("query", input.PaperTitle)
                .SetQueryParam("limit", "100")
                .SetQueryParam("fields", "authors");

            var titleSearchResponse = await searchByTitleRequest.SendAsync(HttpMethod.Get).ReceiveJson<SearchByTitle>();

            if (titleSearchResponse.Total == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            if (titleSearchResponse.Total > 1)
            {
                var foundSinglePaper = false;

                // Try to find the right paper by searching through the last names of the authors of each paper.
                // If exactly one paper is found, the flag is set.
                if (!ArrayIsNullOrEmpty(input.AuthorsLastNames))
                {
                    foundSinglePaper = titleSearchResponse.Data
                        .Count(o => o.Authors.Any(author => input.AuthorsLastNames.Contains(ExtractLastName(author.Name)))) == 1;

                    if (foundSinglePaper)
                    {
                        // We've found our paper, new Data is then created to extract the proper ID in the getPaperInfoRequest
                        titleSearchResponse.Data = new[]
                        {
                            titleSearchResponse.Data
                                .First(o => o.Authors.Any(author => input.AuthorsLastNames.Contains(ExtractLastName(author.Name))))
                        };
                    }
                }

                // If no authors were provided in the request or the title was not found
                if (ArrayIsNullOrEmpty(input.AuthorsLastNames) || !foundSinglePaper)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent(
                            "Semantic Scholar API returned multiple papers when searching the " +
                            $"title: {input.PaperTitle}.")
                    };
                }
            }

            var getPaperInfoRequest = MyClient
                .Request("paper")
                .SetQueryParam("fields", "url,title,abstract,year,authors,tldr")
                .AppendPathSegment(titleSearchResponse.Data.FirstOrDefault()?.PaperId);

            var paperInfo = await getPaperInfoRequest.SendAsync(HttpMethod.Get).ReceiveJson<PaperInfo>();

            var response = new GetPaperInfoResponse
            {
                Title = paperInfo.Title,
                Abstract = paperInfo.Abstract,
                Authors = paperInfo.Authors,
                PaperId = paperInfo.PaperId,
                Tldr = paperInfo.Tldr,
                Url = paperInfo.Url,
                Year = paperInfo.Year
            };

            return response;
        }

        private static string ExtractLastName(string name)
        {
            return name.Split().Last();
        }

        private static bool ArrayIsNullOrEmpty<T>(T[] array)
        {
            return array == null || array.Length == 0;
        }
    }
}