'use strict';

var TYPE_OF_APPARTMENT = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_OF_APPARTMENT_DICTIONARY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
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
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');


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

var checkRoomsNumber = function (housingAdvertisement) {
  var roomsNumber = housingAdvertisement.offer.rooms;
  var rooomName = ' комната';
  if (roomsNumber === 1) {
    rooomName = ' комната';
  } else if (roomsNumber > 1 && roomsNumber < 5) {
    rooomName = ' комнаты';
  } else if (roomsNumber > 4 && roomsNumber < 21) {
    rooomName = ' комнат';
  }
  return rooomName;
};

var checkGuestsNumber = function (housingAdvertisement) {
  var guestsNumber = housingAdvertisement.offer.guests;
  var guestsName = ' гостя';
  if (guestsNumber === 1) {
    guestsName = ' гостя.';
  } else {
    guestsName = ' гостей.';
  }
  return guestsName;
};

var fillInFeaturesList = function (featureList, housingAdvertisement) {
  featureList.innerHTML = '';
  var features = housingAdvertisement.offer.features;
  for (var i = 0; i < features.length; i++) {
    var featureListItem = document.createElement('li');
    featureListItem.classList.add('popup__feature');
    featureListItem.classList.add('popup__feature--' + features[i]);
    featureList.appendChild(featureListItem);
  }
};

var displayPhotos = function (cardPhotoTemplate, housingAdvertisement, photosList) {
  photosList.innerHTML = '';
  var housingAdvertisementPhotos = housingAdvertisement.offer.photos;
  for (var i = 0; i < housingAdvertisementPhotos.length; i++) {
    var cardImage = cardPhotoTemplate.cloneNode(false);
    cardImage.src = housingAdvertisementPhotos[i];
    photosList.appendChild(cardImage);
  }
};

var createHousingAdvertisement = function () {
  var x = getRandomNumber(MIN_X, MAX_X);
  var y = getRandomNumber(MIN_Y, MAX_Y);
  var housingAdvertisement = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    'offer': {
      'title': 'Заголовок предложения о размещении в Токио',
      'address': x + ' ' + y,
      'price': getRandomNumber(100, 1200),
      'type': getRandomElementFromArray(TYPE_OF_APPARTMENT),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': getRandomElementFromArray(CHECKIN_TIME),
      'checkout': getRandomElementFromArray(CHECKOUT_TIME),
      'features': getRandomArrayFromArray(FEATURES_TYPE),
      'description': 'Уютный уголок в Токио',
      'photos': getRandomArrayFromArray(PHOTOS),
      'location': {
        'x': x,
        'y': y
      }
    }
  };
  return housingAdvertisement;
};

var createHousingAdvertisementCard = function (template, housingAdvertisement) {
  var card = template.cloneNode(true);

  card.querySelector('.popup__title').textContent = housingAdvertisement.offer.title;

  card.querySelector('.popup__text--address').textContent = housingAdvertisement.offer.address;

  card.querySelector('.popup__text--price').textContent = housingAdvertisement.offer.price + '₽/ночь';

  card.querySelector('.popup__type').textContent = TYPE_OF_APPARTMENT_DICTIONARY[housingAdvertisement.offer.type];

  var rooomName = checkRoomsNumber(housingAdvertisement);
  var guestsName = checkGuestsNumber(housingAdvertisement);
  card.querySelector('.popup__text--capacity').textContent = housingAdvertisement.offer.rooms + rooomName + ' для ' + housingAdvertisement.offer.guests + guestsName;

  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + housingAdvertisement.offer.checkin + ', выезд до ' + housingAdvertisement.offer.checkout;

  var featuresList = card.querySelector('.popup__features');
  fillInFeaturesList(featuresList, housingAdvertisement);
  card.querySelector('.popup__description').textContent = housingAdvertisement.offer.description;

  var cardPhotoTemplate = card.querySelector('.popup__photos img').cloneNode(false);
  var photosList = card.querySelector('.popup__photos');
  displayPhotos(cardPhotoTemplate, housingAdvertisement, photosList);

  card.querySelector('.popup__avatar').src = housingAdvertisement.author.avatar;

  return card;
};

var generateSimilarHousingAdvertisements = function () {
  var similarHousingAdvertisements = [];
  for (var i = 0; i < 8; i++) {
    similarHousingAdvertisements.push(createHousingAdvertisement());
  }
  return similarHousingAdvertisements;
};

var createPin = function (housingAdvertisement) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = housingAdvertisement.offer.location.x + PIN_WIDTH / 2 + 'px';
  pin.style.top = housingAdvertisement.offer.location.y + PIN_HEIGHT + 'px';
  pin.querySelector('img').src = housingAdvertisement.author.avatar;
  pin.querySelector('img').alt = housingAdvertisement.offer.title;
  return pin;
};

var showPinsOnTheMap = function (parent, pins) {
  for (var i = 0; i < pins.length; i++) {
    var pin = createPin(pins[i]);
    parent.appendChild(pin);
  }
};

var similarHousingAdvertisements = generateSimilarHousingAdvertisements();
var housingAdvertisementCard = createHousingAdvertisementCard(cardTemplate, similarHousingAdvertisements[0]);

showPinsOnTheMap(pinList, similarHousingAdvertisements);
pinList.appendChild(housingAdvertisementCard);
map.classList.remove('map--faded');
