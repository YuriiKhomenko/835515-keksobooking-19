'use strict';
(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action();
    }
  };

  var isLeftMouseEvent = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  var getRandomElementFromArray = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  var getRandomNumber = function (min, max) {
    var number = min + Math.random() * (max + 1 - min);
    number = Math.floor(number);
    return number;
  };

  var getRandomArrayFromArray = function (array) {
    var newArray = [];
    var number = getRandomNumber(1, array.length);
    for (var i = 0; i < number; i++) {
      var element = getRandomElementFromArray(array);
      if (!newArray.includes(element)) {
        newArray.push(element);
      }
    }
    return newArray;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    isLeftMouseEvent: isLeftMouseEvent,
    getRandomElementFromArray: getRandomElementFromArray,
    getRandomNumber: getRandomNumber,
    getRandomArrayFromArray: getRandomArrayFromArray
  };
})();
