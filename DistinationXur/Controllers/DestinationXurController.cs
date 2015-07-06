using Newtonsoft.Json.Linq;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApiContrib.ModelBinders;

namespace DistinationXur.Controllers
{
    public class DestinationXurController : ApiController
    {
        public HttpResponseMessage Get()
        {

            // MAKE BUNGIE REQUEST
            using (HttpClientHandler handler = new HttpClientHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                Task<HttpResponseMessage> msg;
                Task<string> resp;

                msg = client.GetAsync("http://localhost:55878/SampleResponse/sampleResponse.txt");
                msg.Wait();

                resp = msg.Result.Content.ReadAsStringAsync();
                resp.Wait();

                JObject json = JObject.Parse(resp.Result);
                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    request = json
                });
            }
        }
    }
}
