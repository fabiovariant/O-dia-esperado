angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
})

.controller('CheckListsCtrl', function ($scope) {
})

.controller('LoginCtrl', function ($scope, $http) {
    $scope.loginSubmit = function () {
        $http.get(url + "/login/" + $scope.email + "/" + $scope.password)
            .success(function (data, status) {
                if (data.result) {
                    userId = data.result.id;
                }
            });
    };
})

.controller('GuestCtrl', function ($scope, $http) {
})

.controller('RegisterCtrl', function ($scope, $http) {
    $scope.groomsName = "";
    $scope.bridgeName = "";
    $scope.groomsEmail = "";
    $scope.password = "";
    $scope.registerSubmit= function () {
        var data = {
            ceremony: JSON.stringify({
                groomsName: $scope.groomsName,
                bridgeName: $scope.bridgeName,
                groomsEmail: $scope.groomsEmail,
                password: $scope.password
            })
        };
        $http.post(url + "/grooms", data).success(function (data, status) {
            $scope.religious = data;
        });
    };
})

.controller('CeremonyCtrl', function ($scope, $http, CeremonyApi, ApiEndpoint) {
    $scope.ceremonyData = null;

    CeremonyApi.getApiData().then(function (result) {
        $scope.ceremonyData = result.data;
        $scope.ceremonyData.civilDate = new Date($scope.ceremonyData.civilDate);
        $scope.ceremonyData.religiousDate = new Date($scope.ceremonyData.religiousDate);

        /*Nesse bloco, fazemos uma verificação do status dos retornos da Api.
          Se o retorno do Campo X for diferente de nulo, então, a checkbox referente ao campo, será ticada como true.
          */
        if ($scope.ceremonyData.religiousDate != null)
            $scope.religiousDateCheck = true;
        if ($scope.ceremonyData.civilDate != null)
            $scope.civilDateCheck = true;
        if ($scope.ceremonyData.alliance != null)
            $scope.weddingCheck = true;
        if ($scope.ceremonyData.registry != null)
            $scope.registryCheck = true;
        if ($scope.ceremonyData.flowerGirl != null)
            $scope.flowerGirlsCheck = true;
        if ($scope.ceremonyData.documentation != null)
            $scope.documentationCheck = true;
        if ($scope.ceremonyData.fatherAndChurch != null)
            $scope.fatherChurchCheck = true;
        if ($scope.ceremonyData.godParents != null)
            $scope.godParentsCheck = true;
        if ($scope.ceremonyData.brideClothes != null)
            $scope.brideClothesCheck = true;
        if ($scope.ceremonyData.groomClothes != null)
            $scope.groomClothesCheck = true;
        if ($scope.ceremonyData.witnesses != null)
            $scope.witnessesCheck = true;
    });

    $scope.ceremonySubmit = function () {
        var data = JSON.stringify({
                idGrooms: 9,
                religiousDate: angular.copy($scope.ceremonyData.religiousDate),
                witnesses: $scope.ceremonyData.witnesses
            });
        $http.put(ApiEndpoint.url + '/ceremony', data).success(function (data, status) {
            $scope.ceremonyData = data;
            $scope.ceremonyData.civilDate = new Date($scope.ceremonyData.civilDate);
            $scope.ceremonyData.religiousDate = new Date($scope.ceremonyData.religiousDate);
        });
    };
});