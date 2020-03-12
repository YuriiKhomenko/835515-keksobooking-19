'use strict';
(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
  var housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
  var housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFiltersForm.querySelector('#housing-guests');
  var priceDictionary = {
    'low': 10000,
    'high': 50000
  };

  var getHousingType = function (item) {
    var selectedHousingType = housingTypeFilter.value;
    return (selectedHousingType === 'any') ? item.offer.type : item.offer.type === selectedHousingType;
  };

  var getRoomsNumber = function (item) {
    var selectedRoomsNumer = housingRoomsFilter.value;
    return (selectedRoomsNumer === 'any') ? item.offer.rooms.toString() : item.offer.rooms.toString() === selectedRoomsNumer;
  };

  var getGuestsNumber = function (item) {
    var selectedGuestsNumer = housingGuestsFilter.value;
    return (selectedGuestsNumer === 'any') ? item.offer.guests.toString() : item.offer.guests.toString() === selectedGuestsNumer;
  };

  var connvertPriceToWords = function (price) {
    var result = '';
    if (price < priceDictionary.low) {
      result = 'low';
    } else if (price > priceDictionary.low && price < priceDictionary.high) {
      result = 'middle';
    } else {
      result = 'high';
    }
    return result;
  };

  var getPrice = function (item) {
    var selectedPrice = housingPriceFilter.value;
    return (selectedPrice === 'any') ? item.offer.price : connvertPriceToWords(item.offer.price) === selectedPrice;
  };

  var checkFeature = function (item) {
    var checkedFeatures = Array.from(mapFiltersForm.querySelectorAll('.map__checkbox:checked'));
    return checkedFeatures.every(function (el) {
      return item.offer.features.includes(el.value);
    });
  };

  mapFiltersForm.addEventListener('change', window.debounce(function () {
    var newPins = window.map.advertisements
      .filter(getHousingType)
      .filter(getPrice)
      .filter(getRoomsNumber)
      .filter(getGuestsNumber)
      .filter(checkFeature);
    window.card.deleteHousingAdvertisementCard();
    window.pin.deletePins();
    window.pin.renderPins(newPins);
  }));
})();
