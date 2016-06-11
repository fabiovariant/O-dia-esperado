angular.module('starter.services', [])

.factory('ApiGetData', function ($http, $rootScope, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint);

    var getApiData = function (local) {
        return $http.get(ApiEndpoint.url + '/' + local + '/' + $rootScope.idGrooms);
    };

    return {
        getApiData: getApiData
    };
})

.factory('GetUU', function ($rootScope, ApiEndpoint) {
    var uploadurl = ApiEndpoint.url + "/timeline/" + $rootScope.idGrooms;
    return {
        query: function () {
            return uploadurl;
        }
    }
})