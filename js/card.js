'use strict';

(function () {
  var TYPE_OF_APPARTMENT_DICTIONARY = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinList = document.querySelector('.map__pins');

  var cardDeleteHandler = function (evt) {
    window.util.isEscEvent(evt, deleteHousingAdvertisementCard);
  };

  var deleteHousingAdvertisementCard = function () {
    var card = pinList.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', cardDeleteHandler);
    }
  };

  var checkCardStatus = function (housingAdvertisement) {
    deleteHousingAdvertisementCard();
    createHousingAdvertisementCard(housingAdvertisement);
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

  var createHousingAdvertisementCard = function (housingAdvertisement) {
    var card = cardTemplate.cloneNode(true);

    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      deleteHousingAdvertisementCard();
    });
    document.addEventListener('keydown', cardDeleteHandler);

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

    pinList.appendChild(card);
  };

  window.card = {
    createHousingAdvertisementCard: createHousingAdvertisementCard,
    checkCardStatus: checkCardStatus
  };
})();
