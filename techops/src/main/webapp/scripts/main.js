// Configure RequireJS
require.config({

  // Base url for script files
  baseUrl: 'scripts',
  // Alias libraries paths
  // http://stackoverflow.com/questions/19307198/angular-js-with-require-js-getting-uncaught-error-injectormodulerr
  // https://github.com/angular-ui/bootstrap/issues/1512
  paths: {
    'angular': 'lib/angular/angular.min',
    'angular.ui.bootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls.min',
    'ngResource': 'lib/angular-resource/angular-resource.min',
    'ngLocalStorage': 'lib/angular-local-storage/dist/angular-local-storage.min',
    'ngRoute': 'lib/angular-route/angular-route.min',
    'ngCookies': 'lib/angular-cookies/angular-cookies.min'
    //'ngTranslate': 'lib/angular-translate/angular-translate.min',
    //'ngTranslateLoad': 'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    //'angularFileUpload': 'lib/angular-file-upload/dist/angular-file-upload.min',
    //'jQuery': 'lib/jquery/jquery-2.1.4.min',
    //'datepicker': 'lib/bootstrap-datepicker/bootstrap-datepicker.min'
  },

  // Angular does not support AMD out of the box, put it in a shim
  shim: {
    ngResource: {
      deps: ['angular']
    },
    ngLocalStorage: {
      deps: ['angular']
    },
    'angular.ui.bootstrap': {
      deps: ['angular']
    },
    ngCookies: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    angular: {
      exports: 'angular'
    }
    //angularFileUpload: {
    //  deps: ['angular']
    //},
    //datepicker: {
    //  deps: ['jQuery']
    //}
  },
  waitSeconds: 0
});

require(['app','services/common/logoutSvc'], function(app) {
      var components = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, len = components.length; i < len; i++) {
        if (components[i].svc) {
          // Register Factory
          app.factory(components[i].name, components[i].svc);
        } else if (components[i].fn) {
          // Register Controllder
          app.controller(components[i].name, components[i].fn);
        } else if (components[i].directiveFn) {
          app.directive(components[i].name, components[i].directiveFn);
        } else if (components[i].filterFn) {
          app.filter(components[i].name, components[i].filterFn);
        }
      }
      app.bootstrap();
  }
);