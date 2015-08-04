(function () {
    angular.module("bungieViewer")
    .service('DestinyApi', DestinyApi);

    DestinyApi.$inject = ['$http', '$q'];
    function DestinyApi($http, $q) {
        var service = {};

        service.getXurItems = function () {
            var deferred = $q.defer();

            var hashTypes = {
                3897883278: "Defense",
                368428387: "Attack",
                1738186005: "Strange Coin",
                937555249: "Mote of Light"
            };


            // to get xur: /api/Destiny?query=Advisors/Xur/
            // to get local: /api/DestinationXur
            $http.get("/api/DestinationXur").then(
                function (response) {
                    var data = response.data.result;
                    var saleItemCategories = data.request.Response.data.saleItemCategories;
                    var exoticGear = [];
                    var curios = [];
                    var materialExchange = [];
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

                                    var costs = saleItem.costs;

                                    if (saleItemCat.categoryTitle == "Exotic Gear") {

                                        var statType;
                                        var statValue;
                                        var perks = [];

                                        if (angular.isDefined(saleItem.item.primaryStat)) {
                                            statType = hashTypes[saleItem.item.primaryStat.statHash];
                                            statValue = saleItem.item.primaryStat.value;
                                            perks = saleItem.item.perks;
                                        }

                                        exoticGear.push({
                                            name: resp.data.request.Response.data.inventoryItem.itemName,
                                            description: resp.data.request.Response.data.inventoryItem.itemDescription,
                                            icon: resp.data.request.Response.data.inventoryItem.icon,
                                            type: resp.data.request.Response.data.inventoryItem.itemTypeName,
                                            primaryStatType: statType,
                                            privaryStatValue: statValue,
                                            costCurrency: hashTypes[costs[0].itemHash],
                                            costValue: costs[0].value,
                                            itemPerks : perks

                                        });
                                    } else if (saleItemCat.categoryTitle == "Curios") {
                                        curios.push({
                                            name: resp.data.request.Response.data.inventoryItem.itemName,
                                            description: resp.data.request.Response.data.inventoryItem.itemDescription,
                                            icon: resp.data.request.Response.data.inventoryItem.icon,
                                            type: resp.data.request.Response.data.inventoryItem.itemTypeName,
                                            costCurrency: hashTypes[costs[0].itemHash],
                                            costValue: costs[0].value
                                        });
                                    } else {
                                        materialExchange.push({
                                            name: resp.data.request.Response.data.inventoryItem.itemName,
                                            description: resp.data.request.Response.data.inventoryItem.itemDescription,
                                            icon: resp.data.request.Response.data.inventoryItem.icon,
                                            type: resp.data.request.Response.data.inventoryItem.itemTypeName,
                                            costCurrency: hashTypes[costs[0].itemHash],
                                            costValue: costs[0].value
                                        });
                                    }



                                    if ((exoticGear.length + curios.length + materialExchange.length) == total) {
                                        deferred.resolve({
                                            exoticGear: exoticGear,
                                            curios: curios,
                                            materialExchange: materialExchange
                                        });
                                        console.log(exoticGear);
                                        console.log(curios);
                                        console.log(materialExchange);
                                        console.log(costs)
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

//(function () {
//    angular.module("bungieViewer")
//    .service('DestinyApi', DestinyApi);

//    DestinyApi.$inject = ['$http', '$q'];
//    function DestinyApi($http, $q) {
//        var service = {};

//        service.getXurItems = function () {
//            var deferred = $q.defer();

//            var hashTypes = {
//                3897883278: "Defense",
//                368428387: "Attack"
//            }

//            // to get xur: /api/Destiny?query=Advisors/Xur/
//            // to get local: /api/DestinationXur
//            $http.get("/api/DestinationXur").then(
//                function (response) {
//                    var fetchCount = 0;
//                    var data = response.data.result;
//                    var saleItemCategories = data.request.Response.data.saleItemCategories;
//                    var exoticGear = [];
//                    var curios = [];
//                    var materialExchange = [];
//                    var total = 0;
//                    angular.forEach(saleItemCategories, function (saleItemCat) {
//                        total += saleItemCat.saleItems.length;
//                        angular.forEach(saleItemCat.saleItems, function (saleItem) {
//                            fetchCount++;
//                            $http.get("/api/Destiny?query=Manifest/InventoryItem/" + saleItem.item.itemHash + "/")
//                                .then(function (resp) {
//                                    deferred.notify({
//                                        current: fetchCount,
//                                        total: total,
//                                        percentage: Math.round((fetchCount / total) * 100)
//                                    });

//                                    var statType;
//                                    var statValue

//                                    if (angular.isDefined(saleItem.item.primaryStat)) {
//                                        statType = hashTypes[saleItem.item.primaryStat.statHash];
//                                        statValue = saleItem.item.primaryStat.value;
//                                    }

//                                    if (saleItemCat.categoryTitle == "Exotic Gear") {
//                                        exoticGear.push({
//                                            name: resp.data.request.Response.data.inventoryItem.itemName,
//                                            description: resp.data.request.Response.data.inventoryItem.itemDescription,
//                                            icon: resp.data.request.Response.data.inventoryItem.icon,
//                                            type: resp.data.request.Response.data.inventoryItem.itemTypeName,
//                                            primaryStat: saleItem.item.primarystats,
//                                            primaryStatType: statType,
//                                            privaryStatValue: statValue
//                                        });
//                                    } else if (saleItemCat.categoryTitle == "Curios") {
//                                        curios.push({
//                                            name: resp.data.request.Response.data.inventoryItem.itemName,
//                                            description: resp.data.request.Response.data.inventoryItem.itemDescription,
//                                            icon: resp.data.request.Response.data.inventoryItem.icon,
//                                            type: resp.data.request.Response.data.inventoryItem.itemTypeName,
//                                            primaryStat: saleItem.item.primarystats,
//                                            primaryStatType: statType,
//                                            privaryStatValue: statValue
//                                        });
//                                    } else {
//                                        materialExchange.push({
//                                            name: resp.data.request.Response.data.inventoryItem.itemName,
//                                            description: resp.data.request.Response.data.inventoryItem.itemDescription,
//                                            icon: resp.data.request.Response.data.inventoryItem.icon,
//                                            type: resp.data.request.Response.data.inventoryItem.itemTypeName,
//                                            primaryStat: saleItem.item.primarystats,
//                                            primaryStatType: statType,
//                                            privaryStatValue: statValue
//                                        });
//                                    }



//                                    if ((exoticGear.length + curios.length + materialExchange.length) == total) {
//                                        deferred.resolve({
//                                            exoticGear: exoticGear,
//                                            curios: curios,
//                                            materialExchange: materialExchange
//                                        });
//                                        console.log(exoticGear);
//                                        console.log(curios);
//                                        console.log(materialExchange);
//                                    }
//                                });
//                        })
//                    });

//                });

//            return deferred.promise;
//        };

//        return service;
//    }
//})();