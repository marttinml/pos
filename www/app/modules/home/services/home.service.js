(function(){
	angular.module('home').factory('Home',function($resource, $singleton){
		var path = $singleton.path;
		
		return $resource(path+'test/:id');
	});
})();