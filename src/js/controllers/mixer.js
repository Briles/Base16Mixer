module.exports = function ($scope) {
  'use strict';

  var b16m = require('b16m');

  $scope.schemes = require('b16m/schemes.js');
  $scope.selected = {};

  function getSelected() {
    var selected = [];

    for (var scheme in $scope.selected) {
      if ($scope.selected[scheme]) {
        selected.push(scheme);
      }
    }

    return selected;
  }

  function isSelected(key) {
    return !!$scope.selected[key];
  }

  $scope.mix = function () {
    var selected = getSelected();
    selected.push(true);
    $scope.mixed = b16m.apply(null, selected);
  };

  $scope.isSelectable = function () {
    var numSelected = getSelected().length;
    return numSelected !== 0 && numSelected >= 2 && !isSelected(this.name);
  };

  $scope.isMixable = function () {
    return getSelected().length !== 2;
  };
};
