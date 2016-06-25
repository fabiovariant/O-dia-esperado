angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
})

.controller('CheckListsCtrl', function ($scope) {
})

.controller('LoginCtrl', function ($scope, $http, $rootScope, $location, $ionicPopup, ApiEndpoint) {
    $scope.data = {};

    $scope.register = function () {
        $location.url('app/register');
    }

    $scope.login = function () {
        $http.get(ApiEndpoint.url + '/login/' + $scope.data.username + '/' + $scope.data.password)
         .success(function (result) {
             if (result.idGrooms != null) {
                 $rootScope.idGrooms = result.idGrooms;
                 $rootScope.nmGroom = result.nmGroom;
                 $rootScope.nmBridge = result.nmBridge;
                 $rootScope.groomsEmail = result.groomsEmail;
                 $rootScope.grPassword = result.grPassword;
                 $location.url('app/checklists');
                 //$state.go('tab.dash');
             } else {
                 var alertPopup = $ionicPopup.alert({
                     title: 'Credenciais erradas',
                     template: 'Por favor, tente novamente.'
                 });
                 $scope.data.username = null;
                 $scope.data.password = null;
             }
         })
    }
})

.controller('RegisterCtrl', function ($scope, $http, $rootScope, $location, $ionicPopup, ApiEndpoint) {
    $scope.groomsData = {};
    $scope.registerSubmit = function () {
        var data = JSON.stringify({
                nmGroom: $scope.groomsData.nmGroom,
                nmBridge: $scope.groomsData.nmBridge,
                groomsEmail: $scope.groomsData.groomsEmail,
                grPassword: $scope.groomsData.grPassword
            });
        $http.post(ApiEndpoint.url + "/grooms", data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Cadastro efetuado com sucesso',
                template: 'Aproveite nosso aplicativo.'
            });
            $rootScope.idGrooms = data.idGrooms;
            $rootScope.nmGroom = data.nmGroom;
            $rootScope.nmBridge = data.nmBridge;
            $rootScope.groomsEmail = data.groomsEmail;
            $rootScope.grPassword = data.grPassword;
            $location.url('app/checklists');

        });
    };
})

.controller('CeremonyCtrl', function ($rootScope, $scope, $http, $ionicPopup, ApiGetData, ApiEndpoint) {
    $scope.ceremonyData = null;

    ApiGetData.getApiData('ceremony').then(function (result) {
        $scope.ceremonyData = result.data;
        if ($scope.ceremonyData.civilDate != null)
            $scope.ceremonyData.civilDate = new Date($scope.ceremonyData.civilDate);
        if ($scope.ceremonyData.religiousDate != null)
            $scope.ceremonyData.religiousDate = new Date($scope.ceremonyData.religiousDate);

        /*Nesse bloco, fazemos uma verificação do status dos retornos da Api.
          Se o retorno do Campo X for diferente de nulo, então, a checkbox referente ao campo, será ticada como true.
          */
        if ($scope.ceremonyData.religiousDate != null)
            $scope.religiousDateCheck = true;
        if ($scope.ceremonyData.civilDate != null)
            $scope.civilDateCheck = true;
        if ($scope.ceremonyData.alliance != null)
            $scope.allianceCheck = true;
        if ($scope.ceremonyData.registry != null)
            $scope.registryCheck = true;
        if ($scope.ceremonyData.bridesmaid != null)
            $scope.bridesmaidCheck = true;
        if ($scope.ceremonyData.documentation != null)
            $scope.documentationCheck = true;
        if ($scope.ceremonyData.fatherAndChurch != null)
            $scope.fatherAndChurchCheck = true;
        if ($scope.ceremonyData.godparents != null)
            $scope.godparentsCheck = true;
        if ($scope.ceremonyData.bridgeClothing != null)
            $scope.bridgeClothingCheck = true;
        if ($scope.ceremonyData.groomClothing != null)
            $scope.groomClothingCheck = true;
        if ($scope.ceremonyData.witnesses != null)
            $scope.witnessesCheck = true;
    });

    $scope.ceremonySubmit = function () {
        var data = JSON.stringify({
            idGrooms: $rootScope.idGrooms,
            religiousDate: angular.copy($scope.ceremonyData.religiousDate),
            civilDate: angular.copy($scope.ceremonyData.civilDate),
            alliance: $scope.ceremonyData.alliance,
            registry: $scope.ceremonyData.registry,
            bridesmaid: $scope.ceremonyData.bridesmaid,
            documentation: $scope.ceremonyData.documentation,
            fatherAndChurch: $scope.ceremonyData.fatherAndChurch,
            godparents: $scope.ceremonyData.godparents,
            bridgeClothing: $scope.ceremonyData.bridgeClothing,
            groomClothing: $scope.ceremonyData.groomClothing,
            witnesses: $scope.ceremonyData.witnesses
        });
        $http.put(ApiEndpoint.url + '/ceremony', data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'Dados salvos na nuvem.'
            });
        });
    };
})

.controller('InvitationCtrl', function ($rootScope, $scope, $http, $ionicPopup, ApiGetData, ApiEndpoint) {
    $scope.invitation = null;

    ApiGetData.getApiData('invitation').then(function (result) {
        $scope.invitation = result.data;
        if ($scope.invitation.invitation != null)
            $scope.invitationCheck = true;
        if ($scope.invitation.menu != null)
            $scope.menuCheck = true;
        if ($scope.invitation.decotarionDetails != null)
            $scope.decotarionDetailsCheck = true;
        if ($scope.invitation.souvenirs != null)
            $scope.souvenirsCheck = true;
        if ($scope.invitation.godParentsGift != null)
            $scope.godParentsGiftCheck = true;
        if ($scope.invitation.reservation != null)
            $scope.reservationCheck = true;
    });

    $scope.invitationSubmit = function () {
        var data = JSON.stringify({
            idGrooms: $rootScope.idGrooms,
            invitation: $scope.invitation.invitation,
            menu: $scope.invitation.menu,
            decotarionDetails: $scope.invitation.decotarionDetails,
            souvenirs: $scope.invitation.souvenirs,
            godParentsGift: $scope.invitation.godParentsGift,
            reservation: $scope.invitation.reservatio
        });
        $http.put(ApiEndpoint.url + '/invitation', data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'Dados salvos na nuvem.'
            });
        });
    };
})

.controller('DressCtrl', function ($rootScope, $scope, $http, $ionicPopup, ApiGetData, ApiEndpoint) {
    $scope.dressData = null;

    ApiGetData.getApiData('dress').then(function (result) {
        $scope.dressData = result.data;
        if ($scope.dressData.takeDate != null) 
            $scope.dressData.takeDate = new Date($scope.dressData.takeDate);
        
        if ($scope.dressData.devolutionDate != null)
            $scope.dressData.devolutionDate = new Date($scope.dressData.devolutionDate);

        if ($scope.dressData.dressCheck != null)
            $scope.dressCheckCheck = true;

        if ($scope.dressData.perfectDate != false)
            $scope.isPerfectCheck = true;

        if ($scope.dressData.takeDate != null)
            $scope.takeDateCheck = true;

        if ($scope.dressData.devolutionDate != null)
            $scope.devolutionDateCheck = true;

    });

    $scope.dressSubmit = function () {
        var data = JSON.stringify({
            idGrooms: $rootScope.idGrooms,
            dressCheck: $scope.dressData.dressCheck,
            perfectDate: $scope.dressCheck.perfectDate,
            takeDate: angular.copy($scope.dressData.takeDate),
            devolutionDate: angular.copy($scope.dressData.devolutionDate)
        });
        $http.put(ApiEndpoint.url + '/dress', data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'Dados salvos na nuvem.'
            });
        });
    };
})

.controller('PartyCtrl', function ($rootScope, $scope, $http, $ionicPopup, ApiGetData, ApiEndpoint) {
    $scope.partyData = null;

    ApiGetData.getApiData('party').then(function (result) {
        $scope.partyData = result.data;
        if ($scope.partyData.drinks != null)
            $scope.partyData.drinksCheck = true;
        if ($scope.partyData.cakeCandy != null)
            $scope.partyData.cakeCandyCheck = true;
        if ($scope.partyData.buffet != null)
            $scope.partyData.buffetCheck = true;
        if ($scope.partyData.car != null)
            $scope.partyData.carCheck = true;
        if ($scope.partyData.decoration != null)
            $scope.partyData.decorationCheck = true;
        if ($scope.partyData.photoAndVideo != null)
            $scope.partyData.photoAndVideoCheck = true;
        if ($scope.partyData.locale != null)
            $scope.partyData.localeCheck = true;
        if ($scope.partyData.safety != null)
            $scope.partyData.safetyCheck = true;
        if ($scope.partyData.sound != null)
            $scope.partyData.soundCheck = true;
        if ($scope.partyData.valet != null)
            $scope.partyData.valetCheck = true;
        if ($scope.partyData.partyDate != null) {
            $scope.partyData.partyDate = new Date($scope.partyData.partyDate);
            $scope.partyData.perfectDateCheck = true;
        }
    });

    $scope.partySubmit = function () {
        var data = JSON.stringify({
            idGrooms: $rootScope.idGrooms,
            drinks: $scope.partyData.drinks,
            cakeCandy: $scope.partyData.cakeCandy,
            buffet: $scope.partyData.buffet,
            car: $scope.partyData.car,
            decoration: $scope.partyData.decoration,
            photoAndVideo: $scope.partyData.photoAndVideo,
            locale: $scope.partyData.locale,
            safety: $scope.partyData.safety,
            sound: $scope.partyData.sound,
            valet: $scope.partyData.valet,
            partyDate: angular.copy($scope.partyData.partyDate)
        });
        $http.put(ApiEndpoint.url + '/party', data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'Dados salvos na nuvem.'
            });
        });
    };
})

.controller('TimeLineCtrl', function ($scope, $http, ApiGetData) {
    $scope.images = {};
    $scope.civilDate;
    $scope.religiousDate;
    $scope.perfectDressDate;

    ApiGetData.getApiData('timeline').then(function (result) {
        $scope.civilDate = new Date(result.data.civilDate);
        $scope.religiousDate = result.data.religiousDate;
        $scope.perfectDressDate = result.data.perfectDressDate;
        
        $scope.images = result.data.photosModel;
    });
})

.controller('InvitListCtrl', function ($scope, ApiEndpoint, ApiGetData) {
    $scope.guests = [{}];
    $scope.confirmedGuest = [{}];
    $scope.notConfirmedGuest = [{}];
    ApiGetData.getApiData('guest').then(function (result) {
        $scope.guests = result.data;
        
        for (var i = 0; i < $scope.guests.length; i++) {
            if ($scope.guests[i].isConfirmed == true) {
                $scope.confirmedGuest.push($scope.guests[i]);
            } else {
                $scope.notConfirmedGuest.push($scope.guests[i]);
            }   
        }
    });
})

.controller('GuestsListCtrl', function ($scope, $http, $rootScope, $ionicPopup, ApiEndpoint) {
    $scope.inviteGuest = function (guest) {
        var data = JSON.stringify({
            idGrooms: $rootScope.idGrooms,
            invitedName: angular.copy(guest.name),
            emailInvited: angular.copy(guest.email),
            emailText: angular.copy(guest.email_text)
        });
        $http.post(ApiEndpoint.url + '/guest', data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'E-mail enviado ao convidado. Peça para que o convidado confirme presença no e-mail que foi enviado!'
            });
        }).error(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Erro',
                template: 'Não conseguimos enviar o e-mail :( Verifique sua conexão com a internet.'
            })
        });
    };
})

.controller('UserCheckListCtrl', function ($scope, $http, $rootScope, $ionicPopup, ApiEndpoint) {
    $scope.table = { fields: [] };

    $scope.addFormField = function () {
        var fields = new Object();
        fields.idGrooms = $rootScope.idGrooms;
        fields.annotation = '';
        $scope.table.fields.push(fields);
    };

    $scope.submitTable = function () {
        console.log($scope.table);
        var data = JSON.stringify({
            NotepadModel: $scope.table.fields
        });
        console.log(data);
        $http.post(ApiEndpoint.url + '/notepad', data).success(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucesso',
                template: 'E-mail enviado ao convidado. Peça para que o convidado confirme presença no e-mail que foi enviado!'
            });
        }).error(function (data, status) {
            var alertPopup = $ionicPopup.alert({
                title: 'Erro',
                template: 'Não conseguimos enviar o e-mail :( Verifique sua conexão com a internet.'
            })
        });
    }
})

.controller('CamCtrl', function ($scope, $location, $ionicPopup, GetUU) {

	    // init variables
	    $scope.data = {};
	    $scope.obj;
	    var pictureSource;   // picture source
	    var destinationType; // sets the format of returned value
	    var url;

	    // on DeviceReady check if already logged in (in our case CODE saved)
	    ionic.Platform.ready(function () {
	        //console.log("ready get camera types");
	        if (!navigator.camera) {
	            // error handling
	            return;
	        }
	        //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
	        pictureSource = navigator.camera.PictureSourceType.CAMERA;
	        destinationType = navigator.camera.DestinationType.FILE_URI;
	    });

	    // get upload URL for FORM
	    GetUU.query(function (response) {
	        $scope.data = response;
	        //console.log("got upload url ", $scope.data.uploadurl);
	    });

	    // take picture
	    $scope.takePicture = function () {
	        //console.log("got camera button click");
	        var options = {
	            quality: 50,
	            destinationType: destinationType,
	            sourceType: pictureSource,
	            encodingType: 0
	        };
	        if (!navigator.camera) {
	            // error handling
	            return;
	        }
	        navigator.camera.getPicture(
                function (imageURI) {
                    
                    $scope.mypicture = imageURI;
                },
                function (err) {
                    console.log("got camera error ", err);
                    // error handling camera plugin
                },
                options);
	    };

	    // do POST on upload url form by http / html form    
	    $scope.update = function (obj) {
	        if (!$scope.data.uploadurl) {
	            // error handling no upload url
	            return;
	        }
	        if (!$scope.mypicture) {
	            // error handling no picture given
	            return;
	        }
	        var options = new FileUploadOptions();
	        options.fileKey = "ffile";
	        options.fileName = $scope.mypicture.substr($scope.mypicture.lastIndexOf('/') + 1);
	        options.mimeType = "image/jpeg";
	        var params = {};
	        params.other = obj.text; // some other POST fields
	        options.params = params;

	        //console.log("new imp: prepare upload now");
	        var ft = new FileTransfer();
	        ft.upload($scope.mypicture, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
	        function uploadSuccess(r) {
	            // handle success like a message to the user
	            var alertPopup = $ionicPopup.alert({
	                title: 'Sucesso',
	                template: 'Foto salva com sucesso.'
	            });
	        }
	        function uploadError(error) {
	            console.log("upload error source " + error.source);
	            console.log("upload error target " + error.target);
	        }
	    };
	});