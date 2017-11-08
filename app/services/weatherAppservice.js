weatherApp.service('cityService', function () {
    this.city = "Kiev, UA";
});

weatherApp.service('weatherService', ['$resource', function ($resource) {

    this.GetWeather = function (city, days) {

        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/"); //, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }}

        return weatherAPI.get({
            appid: '4637eefc4e62e4cf4ec04e9359528d42',
            q: city,
            cnt: days
        });
    }
}]);