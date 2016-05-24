angular.module('starter.services', [])

    .factory('CeremonyApi', function ($http, ApiEndpoint) {
        console.log('ApiEndpoint', ApiEndpoint);

        var getApiData = function () {
            return $http.get(ApiEndpoint.url + '/ceremony/9');
        };

        return {
            getApiData: getApiData
        };
    })