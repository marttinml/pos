/*global angular*/
(function () {

    var controller = function ($scope, $stateParams) {
        $scope.menuList = [
        { title: 'Punto de venta', ico: 'ion-ios-plus-empty', href:'#/home/ps',id: 1 },
        { title: 'Ventas', ico:'ion-ios-cart', href:'#/home/sales', id: 2 }
      ];


    };
    controller.$inject = ['$scope','$stateParams'];
    angular.module('home').controller('HomeCtrl', controller);

})();