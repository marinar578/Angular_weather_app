// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){

    $scope.city = cityService.city; 

    // have angular watch if the $scope changes and update the service's city value if it does
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

}]);

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