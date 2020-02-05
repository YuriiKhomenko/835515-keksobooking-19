'use strict';

var TYPE_OF_APPARTMENT = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_TYPE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 130;
var MAX_X = 630;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;

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

var createHousingAdvertisement = function () {
  var x = getRandomNumber(MIN_X, MAX_X);
  var y = getRandomNumber(MIN_Y, MAX_Y);
  var housingAdvertisement = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    'offer': {
      'title': 'Header',
      'address': x + ' ' + y,
      'price': getRandomNumber(100, 1200),
      'type': getRandomElementFromArray(TYPE_OF_APPARTMENT),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': getRandomElementFromArray(CHECKIN_TIME),
      'checkout': getRandomElementFromArray(CHECKOUT_TIME),
      'features': getRandomArrayFromArray(FEATURES_TYPE),
      'photos': getRandomArrayFromArray(PHOTOS),
      'location': {
        'x': x,
        'y': y
      }
    }
  };
  return housingAdvertisement;
};

var generateSimilarHousingAdvertisements = function () {
  var similarHousingAds = [];
  for (var i = 0; i < 8; i++) {
    similarHousingAds.push(createHousingAdvertisement());
  }
  return similarHousingAdvertisements;
};

var createPin = function (housingAd) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = housingAd.offer.location.x + PIN_WIDTH / 2 + 'px';
  pin.style.top = housingAd.offer.location.y + PIN_HEIGHT + 'px';
  pin.querySelector('img').src = housingAd.author.avatar;
  pin.querySelector('img').alt = housingAd.offer.title;
  return pin;
};

var showPinsOnTheMap = function (parent, pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var pin = createPin(pins[i]);
    fragment.appendChild(pin);
  }
  parent.appendChild(fragment);
};

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarHousingAdvertisements = generateSimilarHousingAdvertisements();

showPinsOnTheMap(pinList, similarHousingAdvertisements);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
