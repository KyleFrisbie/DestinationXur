(function () {
    angular.module("bungieViewer")
    .service('DestinyApi', DestinyApi);

    DestinyApi.$inject = ['$http', '$q'];
    function DestinyApi($http, $q) {
        var service = {};

        service.getXurItems = function () {
            var deferred = $q.defer();

            $http.get("/api/DestinationXur").then(
                function (response) {
                    var data = response.data.result;
                    var saleItemCategories = data.request.Response.data.saleItemCategories;
                    var xurItems = [];
                    var total = 0;
                    angular.forEach(saleItemCategories, function (saleItemCat) {
                        total += saleItemCat.saleItems.length;
                    });

                    var fetchCount = 0;
                    angular.forEach(saleItemCategories, function (saleItemCat) {
                        angular.forEach(saleItemCat.saleItems, function (saleItem) {
                            fetchCount++;
                            $http.get("/api/Destiny?query=Manifest/InventoryItem/" + saleItem.item.itemHash + "/")
                                .then(function (resp) {
                                    deferred.notify({
                                        current: fetchCount,
                                        total: total,
                                        percentage: Math.round((fetchCount / total) * 100)
                                    });

                                    var statType;
                                    var statValue

                                    if (saleItem.item.primaryStat.statHash != null) {
                                        //try {
                                            statType = saleItem.item.primaryStats.statHash;
                                            statValue = saleItem.item.primaryStats.value;
                                        //} catch (Error) {
                                        //    statType = "type";
                                        //    statValue = "val";
                                        //}
                                        
                                    }

                                    xurItems.push({
                                        name: resp.data.request.Response.data.inventoryItem.itemName,
                                        description: resp.data.request.Response.data.inventoryItem.itemDescription,
                                        icon: resp.data.request.Response.data.inventoryItem.icon,
                                        type: resp.data.request.Response.data.inventoryItem.itemTypeName,
                                        primaryStatType: statType,
                                        privaryStatValue: statValue
                                    });

                                    //angular.forEach(saleItem.item.stats, function (stats) {
                                    //    if (stats.saleItem.item.stats.statHash != null) {
                                    //        xurItems.push({
                                    //        statHash: stats.saleItem.item.stats.statHash
                                    //    })
                                    //    }
                                    //});

                                    if (xurItems.length == total) {
                                        deferred.resolve(xurItems);
                                    }
                                });
                        })
                    });

                });

            return deferred.promise;
        };

        return service;
    }
})();