angular.module('bungieViewer').controller('ExoticViewController', function ($scope) {
    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
    };
});