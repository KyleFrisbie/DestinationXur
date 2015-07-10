using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DistinationXur.Models
{
    class Vendor
    {
        public class AckState
        {
            public bool needsAck { get; set; }
            public string ackId { get; set; }
        }

        public class PrimaryStat
        {
            public object statHash { get; set; }
            public int value { get; set; }
            public int maximumValue { get; set; }
        }

        public class Progression
        {
            public int dailyProgress { get; set; }
            public int weeklyProgress { get; set; }
            public int currentProgress { get; set; }
            public int level { get; set; }
            public int step { get; set; }
            public int progressToNextLevel { get; set; }
            public int nextLevelAt { get; set; }
            public int progressionHash { get; set; }
        }

        public class ArtRegions
        {
        }

        public class Item
        {
            public long itemHash { get; set; }
            public int bindStatus { get; set; }
            public bool isEquipped { get; set; }
            public string itemInstanceId { get; set; }
            public int itemLevel { get; set; }
            public int stackSize { get; set; }
            public int qualityLevel { get; set; }
            public List<object> stats { get; set; }
            public PrimaryStat primaryStat { get; set; }
            public bool canEquip { get; set; }
            public int equipRequiredLevel { get; set; }
            public object unlockFlagHashRequiredToEquip { get; set; }
            public int cannotEquipReason { get; set; }
            public int damageType { get; set; }
            public int damageTypeNodeIndex { get; set; }
            public int damageTypeStepIndex { get; set; }
            public Progression progression { get; set; }
            public object talentGridHash { get; set; }
            public List<object> nodes { get; set; }
            public bool useCustomDyes { get; set; }
            public ArtRegions artRegions { get; set; }
            public bool isEquipment { get; set; }
            public bool isGridComplete { get; set; }
            public List<object> perks { get; set; }
            public int location { get; set; }
            public int transferStatus { get; set; }
            public bool locked { get; set; }
            public bool lockable { get; set; }
        }

        public class Cost
        {
            public int itemHash { get; set; }
            public int value { get; set; }
        }

        public class SaleItem
        {
            public Item item { get; set; }
            public int vendorItemIndex { get; set; }
            public int itemStatus { get; set; }
            public List<Cost> costs { get; set; }
            public List<object> unlockStatuses { get; set; }
        }

        public class SaleItemCategory
        {
            public string categoryTitle { get; set; }
            public List<SaleItem> saleItems { get; set; }
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

        public class Request
        {
            public Response Response { get; set; }
            public int ErrorCode { get; set; }
            public int ThrottleSeconds { get; set; }
            public string ErrorStatus { get; set; }
            public string Message { get; set; }
            public MessageData MessageData { get; set; }
        }

        public class RootObject
        {
            public Request request { get; set; }
        }
    }
}
