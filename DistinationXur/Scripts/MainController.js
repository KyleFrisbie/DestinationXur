(function () {

    var app = angular.module("bungieViewer", []);

    var MainController = function ($scope, $http) {

        //$http.get("/api/Destiny?query=Advisors/Xur/")
        //    .then(function (response) {
        //        //$scope.item = response.data;
        //        if (response.data.request.ErrorCode == 1) {
        //            $scope.item = "Xur isn't in the tower"
        //        } else {
        //            $scope.item = response.data;
        //        }
        //    });

        // Test local Xur file

        var getItemDetail = function (item) {

            $http.get("/api/Destiny?query=Manifest/InventoryItem/" + item.itemHash + "/")
            .then(function (response) {
                console.log(response.data);
                return response.data;
            });
        }

        $http.get("/api/DestinationXur")
            .then(function (response) {
                $scope.vendor = response.data;
                //$scope.saleItems = respose.request.Response.data.saleItemCategories[0].saleItems;

                var xurItems = [];
                angular.forEach(response.data.request.Response.data.saleItemCategories, function (saleItemCat) {
                    angular.forEach(saleItemCat.saleItems, function (saleItem) {

                        $http.get("/api/Destiny?query=Manifest/InventoryItem/" + saleItem.item.itemHash + "/")
                            .then(function (resp) {
                                console.log(resp.data);
                                xurItems.push(resp.data);
                            });

                    })
                });

                $scope.xurItems = xurItems;

            });

        $scope.message = "DestinationXur!";

    };

    app.controller("MainController", MainController);

}());