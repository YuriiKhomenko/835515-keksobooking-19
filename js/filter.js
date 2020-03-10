'use strict';
(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  var getHousingType = function (item) {
    var selectedHousingType = housingTypeFilter.value;
    return (selectedHousingType === 'any') ? item.offer.type : item.offer.type === selectedHousingType;
  };

  window.filter = {
    getHousingType: getHousingType
  };
})();
