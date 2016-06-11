// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.constant('ApiEndpoint', {
    url: 'http://localhost:8080'
})

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

      .state('app.checklists', {
          url: '/checklists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/checklists.html',
                  controller: 'CheckListsCtrl'
              }
          }
      })

    .state('app.ceremony', {
        url: '/ceremony',
        views: {
            'menuContent': {
                templateUrl: 'templates/ceremony.html',
                controller: 'CeremonyCtrl'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            }
        }
    })

      .state('app.timeline', {
          url: '/timeline',
          views: {
              'menuContent': {
                  templateUrl: 'templates/timeline.html',
                  controller: 'TimeLineCtrl'
              }
          }
      })
        .state('app.cam', {
            url: '/cam',
            views: {
                'menuContent': {
                    templateUrl: 'templates/cam.html',
                    controller: 'CamCtrl'
                }
            }
        })

        .state('app.convidar', {
            url: '/convidar',
            views: {
                'menuContent': {
                    templateUrl: 'templates/convidar.html',
                    controller: 'GuestsListCtrl'
                }
            }
        })

        .state('app.list_guest', {
            url: '/list_guest',
            views: {
                'menuContent': {
                    templateUrl: 'templates/list_guest.html',
                    controller: 'GuestsListCtrl'
                }
            }
        })

            .state('app.party', {
                url: '/party',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/party.html',
                        controller: 'PartyCtrl'
                    }
                }
            })

        .state('app.dress', {
            url: '/dress',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dress.html',
                    controller: 'DressCtrl'
                }
            }
        })

        .state('app.invitation', {
            url: '/invitation',
            views: {
                'menuContent': {
                    templateUrl: 'templates/invitation.html',
                    controller: 'InvitationCtrl'
                }
            }
        })

        .state('app.guests_list', {
            url: '/guests_list',
            views: {
                'menuContent': {
                    templateUrl: 'templates/guests_list.html',
                    controller: 'GuestsListCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
