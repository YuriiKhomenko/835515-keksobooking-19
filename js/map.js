'use strict';
(function () {
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 63 + 7;

  var pinList = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var housingAdvertisementForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var addressInput = housingAdvertisementForm.querySelector('#address');

  var disableFormElements = function (form, value) {
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = value;
    }
  };

  var getMainPinPostion = function () {
    var mainPinPositionX = Math.round(parseInt(mainMapPin.style.left.match(/(\d+)/)[0], 10));
    var mainPinPositionY = Math.round(parseInt(mainMapPin.style.top.match(/(\d+)/)[0], 10));
    var mainPinPosition = window.pin.getPinPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, mainPinPositionX, mainPinPositionY);
    return mainPinPosition;
  };

  var getActiveState = function () {
    disableFormElements(housingAdvertisementForm, false);
    housingAdvertisementForm.classList.remove('ad-form--disabled');
    disableFormElements(mapFiltersForm, false);
    map.classList.remove('map--faded');
    showPinsOnTheMap(pinList, similarHousingAdvertisements);
    var mainPinPosition = getMainPinPostion();
    addressInput.value = mainPinPosition.x + ', ' + mainPinPosition.y;
  };

  var getNotActiveState = function () {
    disableFormElements(housingAdvertisementForm, true);
    disableFormElements(mapFiltersForm, true);
  };

  var showPinsOnTheMap = function (parent, pins) {
    for (var i = 0; i < pins.length; i++) {
      var pin = window.pin.createPin(pins[i]);
      parent.appendChild(pin);
    }
  };

  var similarHousingAdvertisements = window.data.generateSimilarHousingAdvertisements();
  getNotActiveState();

  var removeMainMapPinHandlers = function () {
    mainMapPin.removeEventListener('mousedown', mainMapPinActivateHandler);
    mainMapPin.removeEventListener('keydown', mainMapPinActivateHandler);
  };

  var mainMapPinActivateHandler = function (evt) {
    window.util.isEnterEvent(evt, function () {
      getActiveState();
      removeMainMapPinHandlers();
    });
    window.util.isLeftMouseEvent(evt, function () {
      getActiveState();
      removeMainMapPinHandlers();
      window.dnd.dragMainPin(addressInput);
    });
  };

  mainMapPin.addEventListener('mousedown', mainMapPinActivateHandler);
  mainMapPin.addEventListener('keydown', mainMapPinActivateHandler);

  window.map = {
    getMainPinPostion: getMainPinPostion
  };
})();
