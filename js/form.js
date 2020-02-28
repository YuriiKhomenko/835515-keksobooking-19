'use strict';
(function () {
  var roomsForGuests = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var minAppartmentPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var housingAdvertisementForm = document.querySelector('.ad-form');
  var addressInput = housingAdvertisementForm.querySelector('#address');
  var roomNumberSelect = housingAdvertisementForm.querySelector('#room_number');
  var guestsNumberSelect = housingAdvertisementForm.querySelector('#capacity');
  var housingAddTitle = housingAdvertisementForm.querySelector('#title');
  var appartmentType = housingAdvertisementForm.querySelector('#type');
  var appartmentPrice = housingAdvertisementForm.querySelector('#price');
  var timeIn = housingAdvertisementForm.querySelector('#timein');
  var timeOut = housingAdvertisementForm.querySelector('#timeout');

  var checkLengthOfTitle = function () {
    var length = housingAddTitle.value.length;
    return length;
  };

  var checkSymbolLength = function (length) {
    switch (length) {
      case 1:
        length += ' символ.';
        break;
      case length <= 4:
        length += ' символа.';
        break;
      case 21:
        length += ' символ.';
        break;
      case 22:
      case 23:
      case 24:
        length += ' символа.';
        break;
      default:
        length += ' символов.';
    }
    return length;
  };

  var validateGuestsNumber = function () {
    var guestsOptionsAvailalble = roomsForGuests[roomNumberSelect.value];
    var guestsOptions = guestsNumberSelect.querySelectorAll('option');
    guestsOptions.forEach(function (currentOption) {
      currentOption.disabled = true;
      currentOption.selected = false;
      var index = guestsOptionsAvailalble.indexOf(currentOption.value);
      if (index >= 0) {
        currentOption.disabled = false;
        if (index === 0) {
          currentOption.selected = true;
        }
      }
    });
  };

  var setAddress = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  var checkMinPrice = function () {
    var minPrice = minAppartmentPrice[appartmentType.value];
    appartmentPrice.min = minPrice;
    appartmentPrice.placeholder = minPrice;
  };

  var synchroniseTime = function (timeOne, timeTwo) {
    var value = timeOne.value;
    timeTwo.value = value;
  };

  timeIn.addEventListener('change', function () {
    synchroniseTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    synchroniseTime(timeOut, timeIn);
  });

  appartmentType.addEventListener('change', function () {
    checkMinPrice();
  });

  roomNumberSelect.addEventListener('change', function () {
    validateGuestsNumber();
  });

  housingAddTitle.addEventListener('invalid', function () {
    if (housingAddTitle.validity.tooShort || housingAddTitle.validity.valueMissing) {
      var length = checkSymbolLength(checkLengthOfTitle());
      housingAddTitle.setCustomValidity('Минимальная длина заголовка составляет 30 символов. Сейчас использовано ' + length);
    } else {
      housingAddTitle.setCustomValidity('');
    }
  });

  window.form = {
    setAddress: setAddress
  };
})();
