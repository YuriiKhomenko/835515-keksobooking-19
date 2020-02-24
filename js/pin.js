'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getPinPosition = function (pinWidth, pinHeight, xLocation, yLocation) {
    var pinPosition = {};
    pinPosition.x = xLocation + pinWidth / 2;
    pinPosition.y = yLocation + pinHeight;
    return pinPosition;
  };

  var createPin = function (housingAdvertisement) {
    var pin = pinTemplate.cloneNode(true);
    var pinPosition = getPinPosition(PIN_WIDTH, PIN_HEIGHT, housingAdvertisement.offer.location.x, housingAdvertisement.offer.location.y);
    pin.style.left = pinPosition.x + 'px';
    pin.style.top = pinPosition.y + 'px';
    pin.querySelector('img').src = housingAdvertisement.author.avatar;
    pin.querySelector('img').alt = housingAdvertisement.offer.title;
    pin.addEventListener('click', function () {
      window.card.checkCardStatus(housingAdvertisement);
    });
    pin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        window.card.checkCardStatus(housingAdvertisement);
      });
    });
    return pin;
  };

  window.pin = {
    getPinPosition: getPinPosition,
    createPin: createPin
  };
})();
