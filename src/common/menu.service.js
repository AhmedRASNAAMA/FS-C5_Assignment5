(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };


  // service.getMenuItem = function (shortName) {
  //   return $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json')
  //     .then(function (response) {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.error("Error fetching menu item:", error);
  //       throw error;
  //     });
  // };
  
  service.getMenuItem = function (shortName) {
    shortName = shortName.toUpperCase();

    function extractNumbers(str) {
      let numbers = "";
      for (let i = 0; i < str.length; i++) {
          if (!isNaN(str[i])) {
              numbers += str[i];
          }
      }
      return numbers;
    }
    
    function extractChars(str) {
      let chars = "";
      for (let i = 0; i < str.length; i++) {
          if (isNaN(str[i])) {
            chars += str[i];
          }
      }
      return chars;
    }

    
    let urlLink = ApiPath + '/menu_items/' + extractChars(shortName) + '/menu_items/' + (extractNumbers(shortName)-1) + '.json';

    //console.log('UrlLink: ', urlLink);

    return $http.get(urlLink)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error("Error fetching menu item:", error);
        throw error;
      });

  };

  service.getMenuItemImageLink = function (shortName) {
    
    function extractChars(str) {
      let chars = "";
      for (let i = 0; i < str.length; i++) {
          if (isNaN(str[i])) {
            chars += str[i];
          }
      }
      return chars;
    }

    let ImgLink = 'images/menu/' + extractChars(shortName) + '/' + shortName + '.jpg';
    //console.log('ImgLink: ', ImgLink);
    return ImgLink;
  };
}
})();
