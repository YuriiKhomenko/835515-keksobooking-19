'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getPinAddress = function (pinWidth, pinHeight, xLocation, yLocation) {
    var pinPosition = {};
    pinPosition.x = Math.round(xLocation + pinWidth / 2);
    pinPosition.y = Math.round(yLocation + pinHeight);
    return pinPosition;
  };

  var createPin = function (housingAdvertisement) {
    var pin = pinTemplate.cloneNode(true);
    var pinWidth = window.util.PIN_WIDTH;
    var pinHeight = window.util.PIN_HEIGHT;
    var pinPosition = getPinAddress(pinWidth, pinHeight, housingAdvertisement.offer.location.x, housingAdvertisement.offer.location.y);
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
    getPinAddress: getPinAddress,
    createPin: createPin
  };
})();
