'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapEnds = {
    'minX': -25,
    'maxX': 1160,
    'minY': 45,
    'maxY': 545
  };

  var checkPosition = function (currentPosition, minPosition, maxPosition) {
    if (parseInt(currentPosition, 10) < minPosition) {
      currentPosition = minPosition + 'px';
    } else if (parseInt(currentPosition, 10) > maxPosition) {
      currentPosition = maxPosition + 'px';
    }
    return currentPosition;
  };

  var mouseDownDnDHandler = function (evt) {
    evt.preventDefault();
    var target = evt.currentTarget;
    window.util.isLeftMouseEvent(evt, function () {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveDnDHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';

        mainPin.style.left = checkPosition(target.style.left, mapEnds.minX, mapEnds.maxX);
        mainPin.style.top = checkPosition(target.style.top, mapEnds.minY, mapEnds.maxY);

        var address = window.map.getMainPinAddress();
        window.form.setAddress(address.x, address.y);
      };

      var mouseUpDnDHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveDnDHandler);
        document.removeEventListener('mouseup', mouseUpDnDHandler);
      };

      document.addEventListener('mousemove', mouseMoveDnDHandler);
      document.addEventListener('mouseup', mouseUpDnDHandler);
    });
  };

  window.dnd = {
    mouseDownDnDHandler: mouseDownDnDHandler
  };
})();
