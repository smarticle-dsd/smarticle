using System.Linq;
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

        /// <summary>
        /// Your Lambda's input type.
        /// Change this to match whatever event you intend to send, or
        /// use one of the Amazon.Lambda.XXXEvents NuGet packages
        /// </summary>
        public class LambdaEvent
        {
            public string PaperTitle { get; set; }
        }

        // If you rename this function, you will need to update the invocation shim
        // to match if you intend to test the function with 'amplify mock function'
#pragma warning disable CS1998
        public async Task<dynamic> LambdaHandler(LambdaEvent input, ILambdaContext context)
        {
            var searchByTitleRequest = MyClient.Request("paper", "search")
                .SetQueryParam("query", input.PaperTitle);

            var titleSearchResponse = await searchByTitleRequest.SendAsync(HttpMethod.Get).ReceiveJson<SearchByTitle>();

            if (titleSearchResponse.Total != 1)
                throw new FlurlHttpException(new FlurlCall());

            var getPaperInfoRequest = MyClient.Request("paper")
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
    }
}