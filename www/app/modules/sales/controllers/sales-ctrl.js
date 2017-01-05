/*global angular*/
(function () {

    var controller = function ($scope, $stateParams, $cordovaSQLite, $pos) {

	    $scope.salesList = $pos.sales;

        var db = $cordovaSQLite.openDB({ name: "my.db", iosDatabaseLocation:'default'});
    	var query = 'SELECT * FROM sales';
	    $cordovaSQLite.execute(db, query, []).then(function(res) {
	      $scope.salesList = [];
	      for(var i = 0; i < res.rows.length; i++){
	      	$scope.salesList.unshift(JSON.parse(res.rows.item(i).obj));
	      }
	      $pos.sales = $scope.salesList;
	    }, function (err) {
	      console.error(err);
	    });
    };
    controller.$inject = ['$scope','$stateParams','$cordovaSQLite', '$pos'];
    angular.module('sales').controller('SalesCtrl', controller);

})();