using DistinationXur.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace DistinationXur.Controllers
{
    public class ItemController : ApiController
    {
        public HttpResponseMessage Get(string query)
        {

            using (HttpClientHandler handler = new HttpClientHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                client.DefaultRequestHeaders.Add("X-API-Key", "e9f9a9f89d3b4fbd9c12a3b64866de22");
                Task<HttpResponseMessage> msg;
                Task<string> resp;

                msg = client.GetAsync("https://www.bungie.net/platform/Destiny/" + query);
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
