(function () {
  'use strict';

  angular
    .module('web', [
      'web.routes',
      'web.authentication'
    ]);

  angular
    .module('web.routes', ['ngRoute']);

  angular
    .module('web')
    .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();