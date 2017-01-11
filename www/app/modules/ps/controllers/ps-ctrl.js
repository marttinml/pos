/*global angular*/
(function () {

    var controller = function ($scope, $stateParams, $ionicPopup, $cordovaBarcodeScanner, $cordovaSQLite, $pos) {
    	$scope.data = { price:'', description:''};
    	$scope.sale = $pos.sale;
    	$scope.almacen = [
    		{
    			code:'7501000153800',
    			product:'Pingüinos Marinaela',
    			description:'',
    			price:13.50
    		},
    		{
    			code:'7501000626502',
    			product:'gallegatas Emperador',
    			description:'',
    			price:14
    		},
    		{
    			code:'648292000423',
    			product:'Galletanuez',
    			description:'',
    			price:12.50
    		},
    		{
    			code:'7501000153107',
    			product:'Gansito Marinela',
    			description:'',
    			price:10
    		}
    	];

    	$scope.add = function(data){

    		if(data.price){
    		var item = {
	    			price:Number(data.price),
	    			product: data.product || ''
	    		};
	    		$scope.sale.detail.unshift(item);
	    		$scope.sale.total = $pos.getTotal($scope.sale.detail);
	    		$scope.data = { price:'', product:''};
	    	}
    	};
    	$scope.delete = function(index){
    		$scope.sale.detail.splice(index,1);
    	};

    	$scope.sell = function(){
    		if($scope.sale.detail.length){
    			$scope.showAlert();	
    		}
    	};

    	$scope.save = function(){

    		$scope.sale.date = new Date();

            var db = $cordovaSQLite.openDB({ name: "my.db", iosDatabaseLocation:'default'}); 

			$cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS sales (obj)');
		    var query = "INSERT INTO sales (obj) VALUES (?)";
		    $cordovaSQLite.execute(db, query, [JSON.stringify($scope.sale)]).then(function(res) {
		      console.log("insertId: " + res.insertId);
		      $pos.cleanSale();
		    }, function (err) {
		      console.error(err);
		    });
    	};

    	$scope.showAlert = function() {
		   	var alertPopup = $ionicPopup.alert({
		    	title: 'Ticket',
		     	template: 'Total: $'+ $scope.sale.total,
		     	buttons: [
			      { text: 'Cancelar' },
			      {
			        text: '<b>Guardar</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			        	$scope.save();
			          	$scope.$ionicGoBack();
			        }
			      }
			    ]	
		   	});
	   };

	   $scope.getProduct = function(code){
	   		var result = { price:'', description:''};
	   		for(var i in $scope.almacen){
	   			if($scope.almacen[i].code === code){
	   				return $scope.almacen[i];
	   			}
	   			
	   		};
	   		return result;
	   };


	   $scope.barcode = function(){
	   		$cordovaBarcodeScanner
		      .scan()
		      .then(function(barcodeData) {
		      var product = $scope.getProduct(barcodeData.text);
		      $scope.add(product);

		        // Success! Barcode data is here
		      }, function(error) {
		      	alert(error);
		        // An error occurred
		      });
	   };

	 //   document.addEventListener("deviceready", function () {
		//   $cordovaPlugin.someFunction().then(success, error);
		// }, false);


    };
    controller.$inject = ['$scope','$stateParams','$ionicPopup', '$cordovaBarcodeScanner', '$cordovaSQLite', '$pos'];
    angular.module('ps').controller('PSCtrl', controller);

})();