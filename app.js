// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function($scope, cityService, $resource, $routeParams){

    $scope.city = cityService.city; 

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=680ebba65700dc221535345af27939f8', {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days  });

    $scope.convertToFahrenheight = function(degK){

        return Math.round((1.8 * (degK - 273)) + 32);

    }

    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }
}]);


weatherApp.directive("weatherReport", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertToStandard: '&',
            convertToDate: '&',
            dateFormate: '@'
        }
    }
});

