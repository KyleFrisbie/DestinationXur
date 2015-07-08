using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DistinationXur.Models
{
    public class Vendor
    {
        public class AckState
        {
            public bool needsAck { get; set; }
            public string ackId { get; set; }
        }

        public class SaleItemCategory
        {
            public string categoryTitle { get; set; }
            public List<object> saleItems { get; set; }
        }

        public class Data
        {
            public long vendorHash { get; set; }
            public AckState ackState { get; set; }
            public string nextRefreshDate { get; set; }
            public bool enabled { get; set; }
            public List<SaleItemCategory> saleItemCategories { get; set; }
            public List<object> inventoryBuckets { get; set; }
        }

        public class Response
        {
            public Data data { get; set; }
        }

        public class MessageData
        {
        }

        public class RootObject
        {
            public Response Response { get; set; }
            public int ErrorCode { get; set; }
            public int ThrottleSeconds { get; set; }
            public string ErrorStatus { get; set; }
            public string Message { get; set; }
            public MessageData MessageData { get; set; }
        }
    }
}