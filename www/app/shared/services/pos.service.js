/* global angular */

(function () {

    var service = function () {
        this.sale = {};
        this.sales = [];

        this.init = function(){
        	this.cleanSale();
        };

        this.getTotal = function(saleList){
    		var result = 0;
    		for(var i in saleList){
    			result += saleList[i].price || 0;
    		}
    		return result;
    	};

    	this.cleanSale = function(){
    		this.sale = {
	        	total : 0,
	        	date: null,
	        	detail : [],
	        	sync : false
	        };
    	};

        this.init();

        return this;
    };


    angular
        .module('shared')
        .service('$pos', service);
})();