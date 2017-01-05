/* global angular */

(function () {

    var service = function () {
        var self = this;
        return self;
    };


    angular
        .module('shared',[])
        .service('$db', service);
})();