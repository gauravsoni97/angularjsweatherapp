// Controllers

weatherApp.controller("NavController", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  },
]);

weatherApp.controller("HomeController", [
  "$scope",
  "$location",
  "cityService",
  function ($scope, $location, cityService) {
    $scope.city = cityService.city;
    $scope.$watch("city", function () {
      cityService.city = $scope.city;
    });

    $scope.search = function () {
      if ($scope.city) {
        $location.path("/forecast");
      }
    };
  },
]);

weatherApp.controller("ForecastController", [
  "$scope",
  "$http",
  "$routeParams",
  "$location",
  "cityService",
  function ($scope, $http, $routeParams, $location, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || "1";
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $http
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: $scope.city,
          cnt: $scope.days,
          appid: "129c1c964554ef266954e2df1f56acbe",
        },
      })
      .then(function (response) {
        $scope.weatherResult = response.data;
        console.log($scope.weatherResult);
        console.log($scope.weatherResult.city.name);
      })
      .catch(function (error) {
        console.error("Error fetching weather data:", error);
      });

    $scope.convertToFahrenheit = function (degk) {
      return (degk - 273).toFixed(2);
    };

    $scope.dateConverter = function (dt) {
      return new Date(dt * 1000);
    };
  },
]);
