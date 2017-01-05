/*global angular*/
(function () {

    var controller = function ($scope, $stateParams, $pos) {
	    $scope.sale = $pos.sales[$stateParams.saleId];
    };
    controller.$inject = ['$scope','$stateParams', '$pos'];
    angular.module('sales').controller('DetailCtrl', controller);

})();