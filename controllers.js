// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){

    $scope.city = cityService.city; 

    // have angular watch if the $scope changes and update the service's city value if it does
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });



}]);