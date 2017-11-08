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
		.when('/forecast/:days', {
			templateUrl: './pages/forecast.html',
			controller: 'forecastController'
		})
});

//SERVICES
weatherApp.service('cityService', function () {
	this.city = 'Kiev, UA';
})

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService',  function ($scope, $location, cityService) {

	$scope.city = cityService.city;

	$scope.$watch('city', function () {
		cityService.city = $scope.city;
	});

	$scope.submit = function () {
		$location.path('/forecast');
	}

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {

	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '2';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/"); //, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }}

	$scope.weatherResult = $scope.weatherAPI.get({
		appid: '4637eefc4e62e4cf4ec04e9359528d42',
		q: $scope.city,
		cnt: $scope.days
	});

	$scope.convertToCelsius = function (degK) {
		return Math.round(degK - 273);
	}

	$scope.convertToDate = function (date) {
		return new Date(date * 1000);
	}

	console.log($scope.weatherResult);
}]);