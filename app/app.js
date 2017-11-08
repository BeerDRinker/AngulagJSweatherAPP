// MODULE
const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: './pages/home.html',
			controller: 'homeController'
		})
		.when('/forecast', {
			templateUrl: './pages/forecast.html',
			controller: 'forecastController'
		})
});

//SERVICES
weatherApp.service('cityService', function () {
	this.city = 'NewYork,NY';
})

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch('city', function () {
		cityService.city = $scope.city;
	})
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {

	$scope.city = cityService.city;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/"); //, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }}

	$scope.weatherResult = $scope.weatherAPI.get({
		appid: '4637eefc4e62e4cf4ec04e9359528d42',
		q: $scope.city,
		cnt: 2
	});


	console.log($scope.weatherResult);

}]);