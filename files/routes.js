
// Configure the routes

weatherApp.config(function ($sceProvider) {
    $sceProvider.enabled(false);
  });
  
  weatherApp.config(function ($routeProvider) {
    $routeProvider
  
      .when("/", {
        templateUrl: "pages/home.html",
        controller: "HomeController",
      })
  
      .when("/forecast", {
        templateUrl: "pages/forecast.html",
        controller: "ForecastController",
      })
      .when("/forecast/:days", {
        templateUrl: "pages/forecast.html",
        controller: "ForecastController",
      })
  
      .otherwise({
        redirectTo: "/",
      });
  });