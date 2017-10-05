(function() {

  var app = angular.module('angularDash',
      [
          'ngRoute',
          'chart.js',
          'angularModalService',
          'angular-table',
          'cgNotify',
          'alexjoffroy.angular-loaders'
      ])

    .config(function($routeProvider, $locationProvider) {

      $locationProvider.hashPrefix('');

      $routeProvider.when("/", {
          templateUrl: "./views/dashboard.html",
          controller: "DashboardCtrl as dashCtrl"
        })

        .when("/login", {
          templateUrl: "./views/login.html"
        })

        .when("/forms", {
          templateUrl: "./views/forms.html",
          controller: "FormsCtrl as formsCtrl"
        })

        .when("/buttons", {
          templateUrl: "./views/buttons.html"
        })

        .when("/modals", {
          templateUrl: "./views/modals.html",
          controller: "ModalsCtrl as modalsCtrl"
        })

        .when("/tables", {
          templateUrl: "./views/tables.html",
          controller: "TablesCtrl as tablesCtrl"
        })

        .when("/notifications", {
          templateUrl: "./views/notifications.html",
          controller: "NotificationsCtrl as notificationsCtrl"
        })

        .when("/blank", {
          templateUrl: "./views/blank.html",
          controller: "BlankCtrl as blankCtrl"
        })

        .when("/account", {
          templateUrl: "./views/account.html",
          controller: "AccountCtrl as accountCtrl"
        })

        .when("/register", {
          templateUrl: "./views/register.html",
          controller: "RegisterCtrl as registerCtrl"
        })

        .when("/forgot", {
          templateUrl: "./views/forgot.html",
          controller: "ForgotCtrl as forgotCtrl"
        })

        .otherwise({
          redirectTo: "/"
        });
    })

    .run(function($rootScope, $location) {

      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        console.log("Route Start");
      });

      $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        console.log("Route Change Error: " + rejection);
        $location.path("/");
      });

      $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (typeof previous != 'undefined') {
          console.log("Previous Url: " + previous.originalPath);
        }
        console.log("Current Url: " + current.originalPath);

        // função background
        if(current.originalPath === '/register'){
            //angular.element('body').css({ 'background': '#4051b5'});
        } else {
            //angular.element('body').css({'background': '#fff'});
        }

      });
    });
})();
;(function() {
  angular.module('angularDash').controller('AccountCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.account = [];
    vm.account.token = 'asadASHyshd371389';

    vm.tab = 1;

    vm.setTab = function(newTab) {
      vm.tab = newTab;
    };

    vm.isSet = function(tabNum) {
      return vm.tab === tabNum;
    };

  }]);
}());
;(function() {
  angular.module('angularDash').controller('AlertModalCtrl', ['$scope', 'title', 'question', 'ModalService', 'close',
    function($scope, title, question, ModalService, close) {
      var vm = this;
      vm.title = title;
      vm.question = question;

      vm.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
      };
    }
  ]);
}());
;(function() {
  angular.module('angularDash')
    .controller('BlankCtrl', function() {

      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
}());
;(function() {
  angular.module('angularDash').controller('DashboardCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    var vm = this;

    vm.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    vm.onClick = function(points, evt) {
      console.log(points, evt);
    };

    // Simulate async data update
    $timeout(function() {
      vm.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [65, 59, 80, 81, 56, 55, 40]
      ];
    }, 3000);

    vm.donutLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    vm.donutData = [300, 500, 100];

  }]);
}());
;(function() {
  angular.module('angularDash')
    .controller('ForgotCtrl', function() {

    });
}());
;(function() {
  angular.module('angularDash').controller('FormsCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.inputs = [];
    vm.alertMessage = {};

    vm.submit = function() {
      if ($scope.sampleForm.$valid) {
        vm.alertMessage.type = 'success';
        vm.alertMessage.message = 'Form is valid !';
      } else {
        vm.alertMessage.type = 'danger';
        vm.alertMessage.message = 'Form is invalid !';
      }
      vm.alertMessage.show = true;
    };

    vm.closeAlert = function() {
      vm.alertMessage.show = false;
    };

  }]);
}());
;(function() {
  angular.module('angularDash').controller('FormModalCtrl', ['$scope', 'ModalService', 'close',
    function($scope, ModalService, close) {

      var vm = this;

      vm.inputs = [];

      vm.title = 'My Title';
      vm.question = 'My Question';

      vm.close = function(result) {
        close(vm.inputs, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };
    }
  ]);
}());
;(function() {
  angular.module('angularDash').controller('ModalsCtrl', ['$scope', 'ModalService', function($scope, ModalService) {

    var vm = this;
    vm.alertTitle = 'I wanna know the answer';
    vm.alertQuestion = 'Do you like beer ?';

    vm.showAlertModal = function() {

      ModalService.showModal({
        templateUrl: './modals/alert.html',
        controller: 'AlertModalCtrl as alertModalCtrl',
        inputs: {
          title: vm.alertTitle,
          question: vm.alertQuestion
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          vm.alertResult = result ? 'You said Yes' : 'You said No';
        });
      });
    };

    vm.showFormModal = function() {
      ModalService.showModal({
        templateUrl: './modals/form-modal.html',
        controller: 'FormModalCtrl as formModalCtrl'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          vm.formResult = result;
        });
      });
    };
  }]);
}());
;(function() {
    angular.module('angularDash').controller('NotificationsCtrl', ['$scope', 'notify', function($scope, notify) {

        var vm = this;


        vm.msg = 'Hello! This is a sample message!';
        vm.template = '';

        vm.positions = ['center', 'left', 'right'];
        vm.position = vm.positions[0];

        vm.duration = 10000;

        vm.demo = function() {
            notify({
                message: vm.msg,
                classes: vm.classes,
                templateUrl: vm.template,
                position: vm.position,
                duration: vm.duration
            });
        };

        vm.closeAll = function() {
            notify.closeAll();
        };

        vm.demoMessageTemplate = function() {

            var messageTemplate = '<span>This is an example using a dynamically rendered Angular template for the message text. ' +
                'I can have <a href="" ng-click="clickedLink()">hyperlinks</a> with ng-click or any valid Angular enhanced html.</span>';

            notify({
                messageTemplate: messageTemplate,
                classes: vm.classes,
                scope: $scope,
                templateUrl: vm.template,
                position: vm.position,
            });

        };

        vm.clickedLink = function() {
            notify('You clicked a link!');
        };

    }]);
}());
;(function() {
  angular.module('angularDash')
    .controller('RegisterCtrl', function() {

    });
}());
;(function() {
  angular.module('angularDash')
    .controller('SidebarCtrl', function() {

        var vm = this;

        var openMenu = function() {

        };

        var init = function(){
            openMenu();
        };

        //init();

    });
}());
;(function() {
  angular.module('angularDash').controller('TablesCtrl', ['filterFilter', '$scope', '$http', '$filter', function(filterFilter, $scope, $http, $filter) {

    var vm = this;
    vm.config = {
      itemsPerPage: 5
    };

    vm.personList = [{
      index: 1,
      name: "Kristin Hill",
      email: "kristin@hill.com"
    }, {
      index: 2,
      name: "Valerie Francis",
      email: "valerie@francis.com"
    }, {
      index: 3,
      name: "Bob Abbott",
      email: "bob@abbott.com"
    }, {
      index: 4,
      name: "Greg Boyd",
      email: "greg@boyd.com"
    }, {
      index: 5,
      name: "Peggy Massey",
      email: "peggy@massey.com"
    }, {
      index: 6,
      name: "Janet Bolton",
      email: "janet@bolton.com"
    }, {
      index: 7,
      name: "Maria Liu",
      email: "maria@liu.com"
    }, {
      index: 8,
      name: "Anne Warren",
      email: "anne@warren.com"
    }, {
      index: 9,
      name: "Keith Steele",
      email: "keith@steele.com"
    }, {
      index: 10,
      name: "Jerome Lyons",
      email: "jerome@lyons.com"
    }, {
      index: 11,
      name: "Jacob Stone",
      email: "jacob@stone.com"
    }, {
      index: 12,
      name: "Marion Dunlap",
      email: "marion@dunlap.com"
    }, {
      index: 13,
      name: "Stacy Robinson",
      email: "stacy@robinson.com"
    }, {
      index: 14,
      name: "Luis Chappell",
      email: "luis@chappell.com"
    }, {
      index: 15,
      name: "Kimberly Horne",
      email: "kimberly@horne.com"
    }, {
      index: 16,
      name: "Andy Smith",
      email: "andy@smith.com"
    }];

    vm.filteredList = vm.personList;

    vm.updateList = function() {
      vm.filteredList = filterFilter(vm.personList, vm.key);
    };

  }]);
}());
;angular.module("templates-dist", ["../views/account.html", "../views/blank.html", "../views/buttons.html", "../views/dashboard.html", "../views/forgot.html", "../views/forms.html", "../views/login.html", "../views/modals.html", "../views/notifications.html", "../views/register.html", "../views/tables.html"]);

angular.module("../views/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/account.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-block\">\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                  <ul class=\"nav nav-tabs nav-justified\">\n" +
    "                    <li ng-class=\"{ active: accountCtrl.isSet(1) }\" class=\"nav-item\">\n" +
    "                      <a ng-click=\"accountCtrl.setTab(1)\" class=\"nav-link\" href>Profile</a>\n" +
    "                    </li>\n" +
    "                    <li ng-class=\"{ active: accountCtrl.isSet(2) }\" class=\"nav-item\">\n" +
    "                      <a ng-click=\"accountCtrl.setTab(2)\" class=\"nav-link\" href>Account</a>\n" +
    "                    </li>\n" +
    "                    <li ng-class=\"{ active: accountCtrl.isSet(3) }\" class=\"nav-item\">\n" +
    "                      <a ng-click=\"accountCtrl.setTab(3)\" class=\"nav-link\" href>Password</a>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div ng-show=\"accountCtrl.isSet(1)\">\n" +
    "                <div class=\"row account-col\">\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <p class=\"font-weight-bold\">Public avatar</p>\n" +
    "                      <p class=\"font-weight-normal\">You can change your avatar here or remove the current avatar to revert to gravatar.com</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-3 img-perfil\">\n" +
    "                    <img src=\"//placehold.it/160\" class=\"rounded-circle\" />\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <form>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"subject\">Upload new avatar</label>\n" +
    "                      </div>\n" +
    "                      <button type=\"submit\" class=\"btn btn-primary\">Remove avatar</button>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"row account-col\">\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <p class=\"font-weight-bold\">Main settings</p>\n" +
    "                      <p class=\"font-weight-normal\">This information will appear on your profile.</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-8\">\n" +
    "                    <form>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"subject\">Your Name</label>\n" +
    "                        <input ng-model=\"formsCtrl.inputs.firstName\" class=\"form-control\" type=\"text\" name=\"firstName\" placeholder=\"Your Name\" required>\n" +
    "                        <small ng-if=\"formModal.$submitted\" ng-show=\"formModal.firstName.$error.required\" class=\"form-text text-muted text-danger\">Your name is required</small>\n" +
    "                      </div>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">Email address</label>\n" +
    "                        <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\n" +
    "                        <small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small>\n" +
    "                      </div>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleTextarea\">Your bio</label>\n" +
    "                        <textarea class=\"form-control\" id=\"exampleTextarea\" rows=\"3\"></textarea>\n" +
    "                      </div>\n" +
    "                      <button type=\"submit\" class=\"btn btn-success\">Update profile settings</button>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div ng-show=\"accountCtrl.isSet(2)\">\n" +
    "                <div class=\"row account-col\">\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <p class=\"font-weight-bold\">Private Token</p>\n" +
    "                      <p class=\"font-weight-normal\">Keep this token secret, anyone with access to them can interact with the app as if they were you.</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-8\">\n" +
    "                    <form>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">Private Token</label>\n" +
    "                        <input ng-model=\"accountCtrl.account.token\" ng-disabled=\"true\" type=\"text\" class=\"form-control\" aria-describedby=\"tokenHelp\">\n" +
    "                        <small id=\"tokenHelp\" class=\"form-text text-muted\">Your private token is used to access the API without username/password authentication.</small>\n" +
    "                      </div>\n" +
    "                      <button type=\"submit\" class=\"btn btn-primary\">Reset private token</button>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <p class=\"font-weight-bold\">Two-Factor Authentication</p>\n" +
    "                      <p class=\"font-weight-normal\">Increase your account's security by enabling Two-Factor Authentication (2FA).</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-8\">\n" +
    "                    <form>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">Status: Disabled</label>\n" +
    "                      </div>\n" +
    "                      <button type=\"submit\" class=\"btn btn-success\">Enable Two-Factor Authentication</button>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <p class=\"font-weight-bold text-danger\">Remove account</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-8\">\n" +
    "                    <form>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">Deleting an account has the following effects:</label>\n" +
    "                        <ul class=\"list-group\">\n" +
    "                          <li class=\"list-group-item\">All user content like authored issues, snippets, comments will be removed</li>\n" +
    "                          <li class=\"list-group-item\">Personal projects will be removed and cannot be restored</li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "                      <button type=\"submit\" class=\"btn btn-danger\">Delete account</button>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div ng-show=\"accountCtrl.isSet(3)\">\n" +
    "                <div class=\"row account-col\">\n" +
    "                  <div class=\"col-md-3\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <p class=\"font-weight-bold\">Password</p>\n" +
    "                      <p class=\"font-weight-normal\">After a successful password update, you will be redirected to the login page where you can log in with your new password.</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-8\">\n" +
    "                    <form>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">Current password</label>\n" +
    "                        <input ng-model=\"accountCtrl.account.currentPassword\" type=\"text\" class=\"form-control\" aria-describedby=\"passwordHelp\">\n" +
    "                        <small id=\"passwordHelp\" class=\"form-text text-muted\">You must provide your current password in order to change it.</small>\n" +
    "                      </div>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">New password</label>\n" +
    "                        <input ng-model=\"accountCtrl.account.newPassword\" type=\"text\" class=\"form-control\">\n" +
    "                      </div>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"exampleInputEmail1\">Current password</label>\n" +
    "                        <input ng-model=\"accountCtrl.account.newPasswordConf\" type=\"text\" class=\"form-control\" aria-describedby=\"newPasswordHelp\">\n" +
    "                        <small id=\"newPasswordHelp\" class=\"form-text text-muted\">You must provide your current password in order to change it.</small>\n" +
    "                      </div>\n" +
    "                      <button type=\"submit\" class=\"btn btn-success\">Save password</button>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../views/blank.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/blank.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "    <!-- sidebar -->\n" +
    "    <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "    <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "        <!-- navbar -->\n" +
    "        <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "        <div class=\"container-fluid\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"card\">\n" +
    "                        <div class=\"card-header\">\n" +
    "                            Blank\n" +
    "                        </div>\n" +
    "                        <div class=\"card-block\">\n" +
    "                            <h1>Blank Page</h1>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("../views/buttons.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/buttons.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              Bootstrap Buttons\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <h4 class=\"card-title\">Buttons</h4>\n" +
    "              <button type=\"button\" class=\"btn btn-primary\">Primary</button>\n" +
    "              <button type=\"button\" class=\"btn btn-secondary\">Secondary</button>\n" +
    "              <button type=\"button\" class=\"btn btn-success\">Success</button>\n" +
    "              <button type=\"button\" class=\"btn btn-info\">Info</button>\n" +
    "              <button type=\"button\" class=\"btn btn-warning\">Warning</button>\n" +
    "              <button type=\"button\" class=\"btn btn-danger\">Danger</button>\n" +
    "              <button type=\"button\" class=\"btn btn-link\">Link</button>\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <h4 class=\"card-title\">Outline Buttons</h4>\n" +
    "              <button type=\"button\" class=\"btn btn-outline-primary\">Primary</button>\n" +
    "              <button type=\"button\" class=\"btn btn-outline-secondary\">Secondary</button>\n" +
    "              <button type=\"button\" class=\"btn btn-outline-success\">Success</button>\n" +
    "              <button type=\"button\" class=\"btn btn-outline-info\">Info</button>\n" +
    "              <button type=\"button\" class=\"btn btn-outline-warning\">Warning</button>\n" +
    "              <button type=\"button\" class=\"btn btn-outline-danger\">Danger</button>\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <h4 class=\"card-title\">Large Buttons</h4>\n" +
    "              <button type=\"button\" class=\"btn btn-primary btn-lg\">Large button</button>\n" +
    "              <button type=\"button\" class=\"btn btn-secondary btn-lg\">Large button</button>\n" +
    "              <button type=\"button\" class=\"btn btn-primary btn-sm\">Small button</button>\n" +
    "              <button type=\"button\" class=\"btn btn-secondary btn-sm\">Small button</button>\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <h4 class=\"card-title\">Small Buttons</h4>\n" +
    "              <button type=\"button\" class=\"btn btn-primary btn-sm\">Small button</button>\n" +
    "              <button type=\"button\" class=\"btn btn-secondary btn-sm\">Small button</button>\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <h4 class=\"card-title\">Block Level Buttons</h4>\n" +
    "              <button type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Block level button</button>\n" +
    "              <button type=\"button\" class=\"btn btn-secondary btn-lg btn-block\">Block level button</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../views/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/dashboard.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "          <div class=\"cards-dash\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <a href=\"#\">\n" +
    "                  <div class=\"card\">\n" +
    "                    <div class=\"card-heading\">\n" +
    "                      <div class=\"card-box bg-picton\">\n" +
    "                        <span><i class=\"material-icons icon-card\" >account_circle</i></span>\n" +
    "                      </div>\n" +
    "                      <div class=\"card-block\">\n" +
    "                        <h4 class=\"card-title\">74</h4>\n" +
    "                        <p class=\"card-text\">New Users</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <a href=\"#\">\n" +
    "                  <div class=\"card\">\n" +
    "                    <div class=\"card-heading\">\n" +
    "                      <div class=\"card-box bg-shamrock\">\n" +
    "                        <span><i class=\"material-icons icon-card\">shopping_cart</i></span>\n" +
    "                      </div>\n" +
    "                      <div class=\"card-block\">\n" +
    "                        <h4 class=\"card-title\">12</h4>\n" +
    "                        <p class=\"card-text\">New Orders</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <a href=\"#\">\n" +
    "                  <div class=\"card\">\n" +
    "                    <div class=\"card-heading\">\n" +
    "                      <div class=\"card-box bg-sandstorm\">\n" +
    "                        <span><i class=\"material-icons icon-card\">refresh</i></span>\n" +
    "                      </div>\n" +
    "                      <div class=\"card-block\">\n" +
    "                        <h4 class=\"card-title\">5</h4>\n" +
    "                        <p class=\"card-text\">Issues</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <a href=\"#\">\n" +
    "                  <div class=\"card\">\n" +
    "                    <div class=\"card-heading\">\n" +
    "                      <div class=\"card-box bg-thunderbird\">\n" +
    "                        <span><i class=\"material-icons icon-card\">report_problem</i></span>\n" +
    "                      </div>\n" +
    "                      <div class=\"card-block\">\n" +
    "                        <h4 class=\"card-title\">5</h4>\n" +
    "                        <p class=\"card-text\">Issues</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-lg-12\">\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col-md-8\">\n" +
    "                  <div class=\"card\">\n" +
    "                    <div class=\"card-header\">\n" +
    "                      Graph\n" +
    "                    </div>\n" +
    "                    <div class=\"card-block\">\n" +
    "                      <canvas class=\"chart chart-line\" height=\"100\" chart-data=\"dashCtrl.data\" chart-labels=\"dashCtrl.labels\" chart-series=\"series\" chart-click=\"dashCtrl.onClick\"></canvas>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                  <div class=\"card\">\n" +
    "                    <div class=\"card-header contet-gaph\">\n" +
    "                      Sales Types\n" +
    "                    </div>\n" +
    "                    <div class=\"card-block\">\n" +
    "                      <canvas id=\"doughnut\" class=\"chart chart-doughnut\" height=\"192\" chart-data=\"dashCtrl.donutData\" chart-labels=\"dashCtrl.donutLabels\"></canvas>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../views/forgot.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/forgot.html",
    "<div class=\"login-gct\">\n" +
    "  <div class=\"nav-login\">\n" +
    "    <img class=\"img-login\" src=\"assets/img/nucleus.min.png\">\n" +
    "  </div>\n" +
    "  <div class=\"row justify-content-center position-lgn\">\n" +
    "    <div class=\"col-md-4 lgn-gct\">\n" +
    "      <div class=\"card card-forgot\">\n" +
    "        <h3 class=\"text-center title-lgn\">Reset password</h3>\n" +
    "        <div class=\"col-md-10 offset-md-1\">\n" +
    "          <form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Email</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Send</button>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../views/forms.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/forms.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              Form Validation\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <form role=\"form\" name=\"sampleForm\" ng-submit=\"formsCtrl.submit()\" novalidate>\n" +
    "                <div ng-show=\"formsCtrl.alertMessage.show\" ng-class=\"'alert-' + (formsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">\n" +
    "                  <button ng-click=\"formsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n" +
    "                    <span aria-hidden=\"true\">&times;</span>\n" +
    "                  </button>\n" +
    "                  <strong> {{formsCtrl.alertMessage.message}}\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"email-input\">Email address</label>\n" +
    "                  <input ng-model=\"formsCtrl.inputs.email\" ng-class=\"{'form-control-danger': submitted && sampleForm.email.$error.required}\" type=\"email\" name=\"email\" class=\"form-control\" id=\"email-input\" aria-describedby=\"email-help\" placeholder=\"Enter email\" required>\n" +
    "                  <small class=\"form-text text-muted text-danger\" ng-if=\"sampleForm.$submitted\" ng-show=\"sampleForm.email.$error.required\">Email address is required</small>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"subject\">First Name</label>\n" +
    "                  <input ng-model=\"formsCtrl.inputs.firstName\" ng-class=\"{'form-control-danger': submitted && sampleForm.firstName.$error.required}\" class=\"form-control\" type=\"text\" name=\"firstName\" placeholder=\"First Name\" required>\n" +
    "                  <small ng-if=\"sampleForm.$submitted\" ng-show=\"sampleForm.firstName.$error.required\" class=\"form-text text-muted text-danger\">First name is required</small>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"subject\">Last Name</label>\n" +
    "                  <input ng-model=\"formsCtrl.inputs.lastName\" ng-class=\"{'form-control-danger': submitted && sampleForm.lastName.$error.required}\" class=\"form-control\" type=\"text\" name=\"lastName\" placeholder=\"Last Name\" required>\n" +
    "                  <small ng-if=\"sampleForm.$submitted\" ng-show=\"sampleForm.lastName.$error.required\" class=\"form-text text-muted text-danger\">Last name is required</small>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"text-area\">Description</label>\n" +
    "                  <small ng-if=\"sampleForm.$submitted\" ng-show=\"sampleForm.description.$error.required\" class=\"form-text text-muted text-danger\">Description is required</small>\n" +
    "                  <textarea ng-model=\"formsCtrl.inputs.message\" ng-class=\"{'form-control-danger': submitted && sampleForm.description.$error.required}\" class=\"form-control\" name=\"description\" id=\"text-area\" rows=\"3\" required></textarea>\n" +
    "                </div>\n" +
    "                <div class=\"form-check\">\n" +
    "                  <label class=\"form-check-label has-danger\">\n" +
    "                    <input ng-model=\"formsCtrl.inputs.terms\" ng-class=\"{'form-control-danger': submitted && sampleForm.terms.$error.required}\" type=\"checkbox\" class=\"form-check-input\" name=\"terms\" required>\n" +
    "                    I have read and accept the terms\n" +
    "                  </label>\n" +
    "                  <small ng-if=\"sampleForm.$submitted\" ng-show=\"sampleForm.terms.$error.required\" class=\"form-text text-muted text-danger\">Your need to accept the terms</small>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <button ng-click=\"submitted= true;\" type=\"submit\" class=\"btn btn-primary\"> Enviar</button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("../views/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/login.html",
    "<div class=\"login-gct\">\n" +
    "  <div class=\"nav-login\">\n" +
    "    <img class=\"img-login\" src=\"assets/img/nucleus.min.png\">\n" +
    "  </div>\n" +
    "  <div class=\"row justify-content-center position-lgn\">\n" +
    "    <div class=\"col-md-4 lgn-gct\">\n" +
    "      <div class=\"card card-login\">\n" +
    "        <h3 class=\"text-center title-lgn\">Log in</h3>\n" +
    "        <div class=\"col-md-10 offset-md-1\">\n" +
    "          <form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Email</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Password</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-lg btn-block\">LOGIN</button>\n" +
    "            <br>\n" +
    "\n" +
    "           <div class=\"row\">\n" +
    "             <div class=\"col\">\n" +
    "               <a href=\"#\">Register</a>\n" +
    "             </div>\n" +
    "\n" +
    "             <div class=\"col text-right\">\n" +
    "               <a href=\"#\">Forgot your password?</a>\n" +
    "             </div>\n" +
    "           </div>\n" +
    "\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../views/modals.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/modals.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              A Simple Yes/No Modal\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <form>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"modalTitle\">Modal Title</label>\n" +
    "                  <input type=\"text\" class=\"form-control\" id=\"modalTitle\" aria-describedby=\"Enter a title for the modal\" placeholder=\"Enter a title for the modal\" ng-model=\"modalsCtrl.alertTitle\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"modalQuestion\">Modal Question</label>\n" +
    "                  <input type=\"text\" class=\"form-control\" id=\"modalQuestion\" aria-describedby=\"Enter a question for the modal\" placeholder=\"Enter a question for the modal\" ng-model=\"modalsCtrl.alertQuestion\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <pre>Your answer: {{modalsCtrl.alertResult}}</pre>\n" +
    "                </div>\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"modalsCtrl.showAlertModal()\">Yes or No</button>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-12 marg-t15\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              Modal with form\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <form>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <pre>Email: {{modalsCtrl.formResult.email}}</pre>\n" +
    "                  <pre>Subject: {{modalsCtrl.formResult.subject}}</pre>\n" +
    "                  <pre>Message: {{modalsCtrl.formResult.message}}</pre>\n" +
    "                  <pre>Checkbox: {{modalsCtrl.formResult.checkbox}}</pre>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "              <button type=\"button\" class=\"btn btn-primary\" ng-click=\"modalsCtrl.showFormModal()\">Modal with Form</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../views/notifications.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/notifications.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              Bootstrap Notifications\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "                  <span aria-hidden=\"true\">&times;</span>\n" +
    "                </button>\n" +
    "                <strong>Well done!</strong> You successfully read <a href=\"#\" class=\"alert-link\">this important alert message</a>.\n" +
    "              </div>\n" +
    "              <div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "                  <span aria-hidden=\"true\">&times;</span>\n" +
    "                </button>\n" +
    "                <strong>Heads up!</strong> This <a href=\"#\" class=\"alert-link\">alert needs your attention</a>, but it's not super important.\n" +
    "              </div>\n" +
    "              <div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "                  <span aria-hidden=\"true\">&times;</span>\n" +
    "                </button>\n" +
    "                <strong>Warning!</strong> Better check yourself, you're <a href=\"#\" class=\"alert-link\">not looking too good</a>.\n" +
    "              </div>\n" +
    "              <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "                  <span aria-hidden=\"true\">&times;</span>\n" +
    "                </button>\n" +
    "                <strong>Oh snap!</strong> <a href=\"#\" class=\"alert-link\">Change a few things up</a> and try submitting again.\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"row marg-t15\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              Angular Notify\n" +
    "            </div>\n" +
    "            <div class=\"card-block\">\n" +
    "              <form ng-submit=\"notificationsCtrl.demo()\" class=\"form-horizontal\" role=\"form\">\n" +
    "                <legend>Demo Options</legend>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"msg\" class=\"col-sm-4 control-label\">Message</label>\n" +
    "                  <div class=\"col-sm-8\">\n" +
    "                    <input ng-model=\"notificationsCtrl.msg\" type=\"text\" class=\"form-control\" id=\"msg\" placeholder=\"Message\">\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"position\" class=\"col-sm-4 control-label\">Position</label>\n" +
    "                  <div class=\"col-sm-8\">\n" +
    "                    <select ng-model=\"notificationsCtrl.position\" ng-options=\"p for p in notificationsCtrl.positions\" class=\"form-control\"></select>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"position\" class=\"col-sm-4 control-label\">Duration</label>\n" +
    "                  <div class=\"col-sm-8\">\n" +
    "                    <input ng-model=\"notificationsCtrl.duration\" type=\"text\" class=\"form-control\" id=\"duration\" placeholder=\"Duration\">\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"clz\" class=\"col-sm-4 control-label\">CSS Class</label>\n" +
    "                  <div class=\"col-sm-8\">\n" +
    "                    <input ng-model=\"notificationsCtrl.classes\" type=\"text\" class=\"form-control\" id=\"clz\" placeholder=\"CSS class names\">\n" +
    "                    <span class=\"help-block\">Try Bootstrap alert classes like \"alert-danger\" or \"alert-success\".</span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"template\" class=\"col-sm-4 control-label\">Template</label>\n" +
    "                  <div class=\"col-sm-8\">\n" +
    "                    <select ng-model=\"notificationsCtrl.template\" class=\"form-control\">\n" +
    "                      <option value=\"\">(standard template)</option>\n" +
    "                      <option value=\"gmail-template.html\">gmail-template.html</option>\n" +
    "                    </select>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <div class=\"col-sm-offset-4 col-sm-8\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-primary\">Demo</button>\n" +
    "                    <button ng-click=\"notificationsCtrl.closeAll()\" type=\"button\" class=\"btn btn-primary\">Close All</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../views/register.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/register.html",
    "<div class=\"login-gct\">\n" +
    "  <div class=\"nav-login\">\n" +
    "    <img class=\"img-login\" src=\"assets/img/nucleus.min.png\">\n" +
    "  </div>\n" +
    "  <div class=\"row justify-content-center position-lgn\">\n" +
    "    <div class=\"col-md-4 lgn-gct\">\n" +
    "      <div class=\"card card-register\">\n" +
    "        <h3 class=\"text-center title-lgn\">Sign Up</h3>\n" +
    "        <div class=\"col-md-10 offset-md-1\">\n" +
    "          <form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Last name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Email</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Password</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"formGroupExampleInput\">Repeat Password</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"\">\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-lg btn-block\">REGISTER</button>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../views/tables.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../views/tables.html",
    "<div class=\"layout-container layout-sidebar-l3-md-up\">\n" +
    "\n" +
    "  <!-- sidebar -->\n" +
    "  <div ng-include=\"'views/partials/sidebar.html'\" ng-controller=\"SidebarCtrl as sidebarCtrl\"></div>\n" +
    "\n" +
    "  <div class=\"layout-content\" data-scrollable>\n" +
    "\n" +
    "    <!-- navbar -->\n" +
    "    <div ng-include=\"'views/partials/navbar.html'\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-header\">\n" +
    "              Angular Data Tables\n" +
    "            </div>\n" +
    "            <div class=\"card-block \">\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                  <form class=\"form-inline\">\n" +
    "                    <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">\n" +
    "                      <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>\n" +
    "                      <input ng-model=\"tablesCtrl.key\" ng-change=\"tablesCtrl.updateList()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Search ...\">\n" +
    "                    </div>\n" +
    "                    <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"inlineFormCustomSelect\">\n" +
    "                      <option selected>Filter</option>\n" +
    "                      <option value=\"1\">One</option>\n" +
    "                      <option value=\"2\">Two</option>\n" +
    "                      <option value=\"3\">Three</option>\n" +
    "                    </select>\n" +
    "                    <button type=\"button\" class=\"btn btn-success\"> Add user</button>\n" +
    "                  </form>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <table class=\"table table-striped table-responsive \" at-table at-paginated at-list=\"tablesCtrl.filteredList\" at-config=\"tablesCtrl.config\">\n" +
    "                <thead></thead>\n" +
    "                <tbody class=\"col-md-12\">\n" +
    "                <tr>\n" +
    "                  <td class=\"align-middle\" at-implicit at-sortable at-attribute=\"index\" width=\"150\" at-initial-sorting=\"asc\"></td>\n" +
    "                  <td class=\"align-middle\" at-implicit at-sortable at-attribute=\"name\" width=\"250\"></td>\n" +
    "                  <td class=\"align-middle\" at-implicit at-sortable at-attribute=\"email\"></td>\n" +
    "                  <td class=\"align-middle\" at-title=\"Ação\">\n" +
    "                    <button class=\"btn btn-primary btn-smn\"><i class=\"material-icons\">search</i></button>\n" +
    "                    <button class=\"btn btn-danger btn-smn\"><i class=\"material-icons\">delete_forever</i></button>\n" +
    "                  </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "              </table>\n" +
    "              <div class=\"row controler-table\">\n" +
    "                <div class=\"col-md-6\">\n" +
    "                  <div class=\"form-group form-inline\">\n" +
    "                    <label>Show </label>\n" +
    "                    <select class=\"pagination-table custom-select\" ng-init=\"tablesCtrl.config.itemsPerPage = '5'\" ng-model=\"tablesCtrl.config.itemsPerPage\" class=\"form-control\">\n" +
    "                      <option value=\"3\">3</option>\n" +
    "                      <option value=\"5\">5</option>\n" +
    "                      <option value=\"9\">9</option>\n" +
    "                    </select>\n" +
    "                    <label>items</label>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-6\">\n" +
    "                  <at-pagination at-list=\"tablesCtrl.filteredList\" at-config=\"tablesCtrl.config\" class=\"pag-table\"></at-pagination>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);
