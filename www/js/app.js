// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ionic.cloud', 'starter.filters', 'starter.services'], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

  // $httpProvider.defaults.withCredentials = true;

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(false);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $ionicCloudProvider, $urlRouterProvider) {

  $ionicCloudProvider.init({
    "core": {
      "app_id": "b889c882"
    },
    "push": {
      "sender_id": "108358700292",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.following', {
    url: '/following',
    views: {
      'tab-following': {
        templateUrl: 'templates/tab-following.html',
        controller: 'followingCtrl'
      }
    }
  })
  .state('list', {
    url: '/list',
    templateUrl: 'templates/admin-list.html',
    controller: 'listCtrl'


  })
  .state('tab.show', {
    url: '/show',
    views: {
      'tab-show': {
        templateUrl: 'templates/tab-show.html',
        controller: 'showCtrl'
      }
    }
  })
  .state('tab.event-show', {
    url: '/eventShow',
    views: {
      'tab-show': {
        templateUrl: 'templates/event.html',
        controller: 'EventDisplay'
      }
    }
  })
  .state('tab.performer-show', {
    url: '/performerShow',
    views: {
      'tab-show': {
        templateUrl: 'templates/performer.html',
        controller: 'PerformerDisplay'
      }
    }
  })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        },

      }
    })
    .state('new-event', {
      url: '/new-event',
      templateUrl: 'templates/new-event.html',
      controller: 'NewEventCtrl'
    })
    .state('new-performer', {
      url: '/new-performer',
      templateUrl: 'templates/new-performer.html',
      controller: 'NewPerformerCtrl'
    })
    .state('login', {
      url: '/account/login',
      templateUrl: 'templates/account-login.html',
      controller: 'loginCtrl'
    })

    .state('register', {
      url: '/account/register',
      templateUrl: 'templates/account-register.html',
      controller: 'registerCtrl'

    }).state('main', {
      url: '/',
      templateUrl: 'templates/splash.html',
      controller: 'SplashCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
