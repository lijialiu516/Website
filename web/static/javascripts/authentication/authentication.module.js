(function () {
  'use strict';

  angular
    .module('web.authentication', [
      'web.authentication.controllers',
      'web.authentication.services'
    ]);

  angular
    .module('web.authentication.controllers', []);

  angular
    .module('web.authentication.services', ['ngCookies']);
})();