'use strict';
(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeFilter = mapFiltersForm.querySelector('#housing-type');

  var getHousingType = function (item) {
    var selectedHousingType = housingTypeFilter.value;
    return (selectedHousingType === 'any') ? item.offer.type : item.offer.type === selectedHousingType;
  };

  mapFiltersForm.addEventListener('change', function () {
    var newPins = window.map.advertisements
      .filter(getHousingType);
    window.card.deleteHousingAdvertisementCard();
    window.pin.deletePins();
    window.pin.renderPins(newPins);
  });
})();
