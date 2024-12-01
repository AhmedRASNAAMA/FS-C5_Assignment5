(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UsersService', 'MenuService'];
  function SignUpController(UsersService, MenuService) {
    var $ctrl = this;
    $ctrl.registrationSuccess = false;
    $ctrl.favoriteDishFound = false;
    //$ctrl.testValue = 42; //Displayed as a debug tool to show that controller working

    $ctrl.signUp = function(event) {
      console.log("Sign up started... ");
      event.preventDefault();
      var user = {
            firstName: $ctrl.firstName,
            lastName: $ctrl.lastName,
            email: $ctrl.email,
            phone: $ctrl.phone,
            favoriteDish: $ctrl.favoriteDish
      };

      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function(data) {
          if (data != null) {
            console.log("Dish found:", data);
            user.favoriteMenuItem = data;

            //Set user (using service) - this should be "adding" instead of setting in "real world App"
            UsersService.setUser(user);
            $ctrl.favoriteDishFound = true;
            $ctrl.registrationSuccess = true;
          } else {
            console.log("Dish not found, please check your favorite dish's short name");
          }
        }, function(err) {
          console.log("Dish not found...",err(err));
          //UsersService.setUser(user);
          $ctrl.favoriteDishFound = false;
          $ctrl.registrationSuccess = true;
        });
    };
  }
})();
