/**
 * Module representing a shirt.
 * @module controllers/login
 */
define(['utils/Constant'], function (Constant) {
  /**
   * A module representing a login controller.
   * @exports controllers/login
   */
  var Service = function ($q, $location) {
    var responseError = function (rejection) {
      if (rejection.status === 403) {
        $location.url('/403');
      }
      return $q.reject(rejection);
    };
    var response = function (response) {
      var data = null;
      if (response) {
        data = response.data;
        if (data && data.respCode && data.respCode == '_302') {
          if (data.result) {
            if (data.result.gotoUrl) {
              window.location = data.result.gotoUrl;
            } else {
              window.location = data.result;
            }
          }
        } else if (data && data.respCode && data.respCode == '_403') {
          $location.url('/403');
        }
      }
      return response;
    }
    return {
      responseError: responseError,
      response: response
    };
  };

  return {
    name: "httpInterceptorSvc",
    svc: ["$q", "$location", Service]
  }


});
