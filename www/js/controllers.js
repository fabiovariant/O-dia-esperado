angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('CheckListsCtrl', function ($scope) {
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

.controller('CeremonyCtrl', function ($scope, $http) {
    $scope.religiousDate = "";
    $scope.civilDate = "";
    $scope.wedding = "";
    $scope.registry = "";
    $scope.flowerGirl = "";
    $scope.documentation = "";
    $scope.fatherAndChurch = "";
    $scope.godParents = "";
    $scope.brideClothes = "";
    $scope.groomClothes = "";
    $scope.witnesses = "";
    $scope.ceremonySubmit = function () {
        var data = {
            ceremony: JSON.stringify({
                userId: $scope.userId,
                religiousDate: $scope.religiousDate,
                civilDate: $scope.civilDate,
                wedding: $scope.wedding,
                registry: $scope.registry,
                flowerGirl: $scope.flowerGirl,
                documentation: $scope.documentation,
                fatherAndChurch: $scope.fatherAndChurch,
                godParents: $scope.godParents,
                brideClothes: $scope.brideClothes,
                groomClothes: $scope.groomClothes,
                witnesses: $scope.witnesses
            })
        };
        $http.post("http://localhost:8080/religious", data).success(function (data, status) {
            $scope.religious = data;
        })
    }
});