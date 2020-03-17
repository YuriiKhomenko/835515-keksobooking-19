'use strict';
(function () {
  var map = document.querySelector('.map');
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
  var housingAdvertismentTitle = housingAdvertisementForm.querySelector('#title');
  var appartmentType = housingAdvertisementForm.querySelector('#type');
  var appartmentPrice = housingAdvertisementForm.querySelector('#price');
  var timeIn = housingAdvertisementForm.querySelector('#timein');
  var timeOut = housingAdvertisementForm.querySelector('#timeout');
  var successDiv = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorDiv = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var resetButton = housingAdvertisementForm.querySelector('.ad-form__reset');

  var checkLengthOfTitle = function () {
    var length = housingAdvertismentTitle.value.length;
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

  var disableFormElements = function (form) {
    var elements = Array.prototype.slice.call(form.elements, 0);
    elements.forEach(function (element) {
      element.disabled = true;
    });
  };

  var enableFormElements = function (form) {
    var elements = Array.prototype.slice.call(form.elements, 0);
    elements.forEach(function (element) {
      element.disabled = false;
    });
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

  var setMinPrice = function () {
    var minPrice = minAppartmentPrice[appartmentType.value];
    appartmentPrice.min = minPrice;
    appartmentPrice.placeholder = minPrice;
  };

  var checkPrice = function () {
    var chosenType = appartmentType.value;
    var givenPrice = appartmentPrice.value;
    var minPrice = minAppartmentPrice[chosenType];
    if (!givenPrice) {
      appartmentPrice.setCustomValidity('Пожалуйста, введите цену размещения');
    } else if (givenPrice < minPrice) {
      appartmentPrice.setCustomValidity('Цена размежения не может быть ниже чем ' + minPrice + ' руб');
    } else {
      appartmentPrice.setCustomValidity('');
    }
  };

  var checkHousingAdvertismentTitle = function () {
    var title = housingAdvertismentTitle.value;
    if (!title) {
      housingAdvertismentTitle.setCustomValidity('Заголовок объявления не может быть пустой');
    } else if (housingAdvertismentTitle.validity.tooShort) {
      var length = checkSymbolLength(checkLengthOfTitle());
      housingAdvertismentTitle.setCustomValidity('Минимальная длина заголовка составляет 30 символов. Сейчас использовано ' + length);
    } else {
      housingAdvertismentTitle.setCustomValidity('');
    }
  };

  var startUpChecksHandler = function () {
    checkHousingAdvertismentTitle();
    checkPrice();
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
    setMinPrice();
  });

  roomNumberSelect.addEventListener('change', function () {
    validateGuestsNumber();
  });

  housingAdvertismentTitle.addEventListener('input', checkHousingAdvertismentTitle);
  appartmentPrice.addEventListener('input', checkPrice);

  resetButton.addEventListener('click', function () {
    housingAdvertisementForm.reset();
    setMinPrice();
    resetApplication();
  });

  var keydownCloseSuccessHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      successDiv.remove();
      document.removeEventListener('keydown', keydownCloseSuccessHandler);
      document.removeEventListener('mousedown', mousedownCloseSuccessHandler);
    });
  };

  var mousedownCloseSuccessHandler = function (evt) {
    window.util.isLeftMouseEvent(evt, function () {
      successDiv.remove();
      document.removeEventListener('mousedown', mousedownCloseSuccessHandler);
      document.removeEventListener('keydown', keydownCloseSuccessHandler);
    });
  };

  var keydownCloseErrorHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      errorDiv.remove();
      document.removeEventListener('keydown', keydownCloseErrorHandler);
      document.removeEventListener('mousedown', mousedownCloseErrorHandler);
    });
  };

  var mousedownCloseErrorHandler = function (evt) {
    window.util.isLeftMouseEvent(evt, function () {
      errorDiv.remove();
      document.removeEventListener('mousedown', mousedownCloseErrorHandler);
      document.removeEventListener('keydown', keydownCloseErrorHandler);
    });
  };

  var resetApplication = function () {
    housingAdvertisementForm.reset();
    window.card.deleteHousingAdvertisement();
    window.map.deactivateApplication();
    window.pin.deletePins();
    window.map.setMainPinStartPosition();
    housingAdvertisementForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    var mainPin = map.querySelector('.map__pin--main');
    window.avatar.setDefaultAvatar();
    window.avatar.setDefaultPhoto();
    mainPin.addEventListener('mousedown', window.map.mousedownActivateHandler);
    mainPin.addEventListener('mousedown', window.dnd.mouseDownHandler);
    mainPin.addEventListener('keydown', window.map.keydownActivateHandler);
  };

  var successHandler = function () {
    resetApplication();
    successDiv.style.display = 'block';
    document.addEventListener('keydown', keydownCloseSuccessHandler);
    document.addEventListener('mousedown', mousedownCloseSuccessHandler);
    document.querySelector('main').appendChild(successDiv);
  };

  var errorHandler = function () {
    errorDiv.style.display = 'block';
    document.addEventListener('keydown', keydownCloseErrorHandler);
    document.addEventListener('mousedown', mousedownCloseErrorHandler);
    var errorButton = errorDiv.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      errorDiv.remove();
    });
    document.querySelector('main').appendChild(errorDiv);
  };

  housingAdvertisementForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(housingAdvertisementForm);
    window.backend.upload(formData, successHandler, errorHandler);
  });

  window.form = {
    disableElements: disableFormElements,
    enableElements: enableFormElements,
    setAddress: setAddress,
    checkPrice: checkPrice,
    startUpChecksHandler: startUpChecksHandler
  };
})();
