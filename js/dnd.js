'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapEnds = {
    'minX': -25,
    'maxX': 1160,
    'minY': 70,
    'maxY': 560
  };

  var checkBorders = function (shiftX, shiftY) {
    if (shiftX > mapEnds.maxX) {
      mainPin.style.left = mapEnds.maxX + 'px';
    } else if (shiftX < mapEnds.minX) {
      mainPin.style.left = mapEnds.minX + 'px';
    } else if (shiftY > mapEnds.maxY) {
      mainPin.style.top = mapEnds.maxY + 'px';
    } else if (shiftY < mapEnds.minY) {
      mainPin.style.top = mapEnds.minY + 'px';
    } else {
      mainPin.style.left = shiftX + 'px';
      mainPin.style.top = shiftY + 'px';
    }
  };

  var dragMainPin = function (address) {
    mainPin.addEventListener('mousedown', function (evt) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var shiftX = (mainPin.offsetLeft - shift.x);
        var shiftY = (mainPin.offsetTop - shift.y);
        checkBorders(shiftX, shiftY);
        var mainPinPosition = window.map.getMainPinPostion();
        address.value = mainPinPosition.x + ', ' + mainPinPosition.y;
      };
      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.dnd = {
    dragMainPin: dragMainPin
  };
})();
