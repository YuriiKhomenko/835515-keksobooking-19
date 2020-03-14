'use strict';
(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
  var housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
  var housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFiltersForm.querySelector('#housing-guests');
  var PriceDictionary = {
    LOW: 10000,
    HIGH: 50000
  };

  var getHousingType = function (item) {
    return (housingTypeFilter.value === 'any') ? item.offer.type : item.offer.type === housingTypeFilter.value;
  };

  var getRoomsNumber = function (item) {
    return (housingRoomsFilter.value === 'any') ? item.offer.rooms.toString() : item.offer.rooms.toString() === housingRoomsFilter.value;
  };

  var getGuestsNumber = function (item) {
    return (housingGuestsFilter.value === 'any') ? item.offer.guests.toString() : item.offer.guests.toString() === housingGuestsFilter.value;
  };

  var connvertPriceToWords = function (price) {
    var result = '';
    switch (true) {
      case price < PriceDictionary.LOW:
        result = 'low';
        break;
      case price > PriceDictionary.LOW && price < PriceDictionary.HIGH:
        result = 'middle';
        break;
      case price > PriceDictionary.HIGH:
        result = 'high';
        break;
    }
    return result;
  };

  var getPrice = function (item) {
    return (housingPriceFilter.value === 'any') ? item.offer.price : connvertPriceToWords(item.offer.price) === housingPriceFilter.value;
  };

  var checkFeature = function (item) {
    var checkedFeatures = Array.from(mapFiltersForm.querySelectorAll('.map__checkbox:checked'));
    return checkedFeatures.every(function (el) {
      return item.offer.features.includes(el.value);
    });
  };

  var applyMapFilters = function (data) {
    return data.filter(function (item) {
      return (
        getHousingType(item) &&
        getPrice(item) &&
        getRoomsNumber(item) &&
        getGuestsNumber(item) &&
        checkFeature(item)
      );
    });
  };

  mapFiltersForm.addEventListener('change', window.debounce(function () {
    var newPins = applyMapFilters(window.map.advertisements);
    window.card.deleteHousingAdvertisementCard();
    window.pin.deletePins();
    window.pin.renderPins(newPins);
  }));
})();
