(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['user', 'MenuService'];
  function MyInfoController(user,MenuService) {
    var $ctrl = this;
    $ctrl.signedUp = false;
    $ctrl.favoriteMenuItem;

    if(user) {
      $ctrl.signedUp = true;
      $ctrl.firstName = user.firstName;
      $ctrl.lastName = user.lastName;
      $ctrl.email = user.email;
      $ctrl.phone = user.phone;
      $ctrl.favoriteDish = user.favoriteDish;
      $ctrl.favoriteMenuItem = user.favoriteMenuItem;
      $ctrl.favoriteMenuItemImg = MenuService.getMenuItemImageLink($ctrl.favoriteDish);
      user.favoriteMenuItem = $ctrl.favoriteMenuItemImg;
      //console.log(user);
      
      //console.log("test:", MenuService.getMenuItemImageLink($ctrl.favoriteDish));

    }
    else {
      $ctrl.signedUp = false;
    }
  }

})();
