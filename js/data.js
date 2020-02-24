'use strict';

(function () {
  var MIN_X = 130;
  var MAX_X = 630;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var TYPE_OF_APPARTMENT = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES_TYPE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var createHousingAdvertisement = function () {
    var x = window.util.getRandomNumber(MIN_X, MAX_X);
    var y = window.util.getRandomNumber(MIN_Y, MAX_Y);
    var housingAdvertisement = {
      'author': {
        'avatar': 'img/avatars/user0' + window.util.getRandomNumber(1, 8) + '.png',
      },
      'offer': {
        'title': 'Заголовок предложения о размещении в Токио',
        'address': x + ' ' + y,
        'price': window.util.getRandomNumber(100, 1200),
        'type': window.util.getRandomElementFromArray(TYPE_OF_APPARTMENT),
        'rooms': window.util.getRandomNumber(1, 5),
        'guests': window.util.getRandomNumber(1, 5),
        'checkin': window.util.getRandomElementFromArray(CHECKIN_TIME),
        'checkout': window.util.getRandomElementFromArray(CHECKOUT_TIME),
        'features': window.util.getRandomArrayFromArray(FEATURES_TYPE),
        'description': 'Уютный уголок в Токио',
        'photos': window.util.getRandomArrayFromArray(PHOTOS),
        'location': {
          'x': x,
          'y': y
        }
      }
    };
    return housingAdvertisement;
  };

  var generateSimilarHousingAdvertisements = function () {
    var similarHousingAdvertisements = [];
    for (var i = 0; i < 8; i++) {
      similarHousingAdvertisements.push(createHousingAdvertisement());
    }
    return similarHousingAdvertisements;
  };

  window.data = {
    generateSimilarHousingAdvertisements: generateSimilarHousingAdvertisements,
    createHousingAdvertisement: createHousingAdvertisement
  };
})();
