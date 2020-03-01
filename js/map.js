'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var pinList = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var housingAdvertisementForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');

  var disableFormElements = function (form) {
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = true;
    }
  };

  var enableFormElements = function (form) {
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = false;
    }
  };

  var getMainPinAddress = function () {
    var mainPinPosition = {};
    mainPinPosition.x = Math.round(parseInt(mainPin.style.left, 10) + (MAIN_PIN_WIDTH / 2));
    mainPinPosition.y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT);
    return mainPinPosition;
  };

  var showPinsOnTheMap = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      var pin = window.pin.createPin(pins[i]);
      pinList.appendChild(pin);
    }
  };

  var activetaApplication = function () {
    enableFormElements(housingAdvertisementForm);
    housingAdvertisementForm.classList.remove('ad-form--disabled');
    enableFormElements(mapFiltersForm);
    map.classList.remove('map--faded');
    window.backend.download(showPinsOnTheMap, function (errorMessage) {
      window.backend.errorHandler(pinList, errorMessage);
    });
    var mainPinPosition = getMainPinAddress();
    window.form.setAddress(mainPinPosition.x, mainPinPosition.y);
  };

  var deactivateApplication = function () {
    disableFormElements(housingAdvertisementForm);
    disableFormElements(mapFiltersForm);
  };

  deactivateApplication();

  var mousedownActivateHandler = function (evt) {
    window.util.isLeftMouseEvent(evt, function () {
      activetaApplication();
      mainPin.removeEventListener('mousedown', mousedownActivateHandler);
      mainPin.removeEventListener('keydown', keydownActivateHandler);
    });
  };

  var keydownActivateHandler = function (evt) {
    window.util.isEnterEvent(evt, function () {
      activetaApplication();
      mainPin.removeEventListener('mousedown', mousedownActivateHandler);
      mainPin.removeEventListener('keydown', keydownActivateHandler);
    });
  };

  mainPin.addEventListener('mousedown', mousedownActivateHandler);
  mainPin.addEventListener('mousedown', window.dnd.mouseDownDnDHandler);
  mainPin.addEventListener('keydown', keydownActivateHandler);

  window.map = {
    getMainPinAddress: getMainPinAddress
  };
})();
