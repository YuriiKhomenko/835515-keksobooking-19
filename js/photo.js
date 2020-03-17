'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_DIMENSIONS = {
    width: 70,
    height: 70
  };
  var DEFAULT_AVATAR_PATH = 'img/muffin-grey.svg';

  var avatarPicker = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var photoPicker = document.querySelector('.ad-form__upload input[type=file]');
  var photoGallery = document.querySelector('.ad-form__photo-container');

  var setDefaultAvatar = function () {
    avatarPreview.src = DEFAULT_AVATAR_PATH;
  };

  var changeAvatar = function (photoPath) {
    avatarPreview.src = photoPath;
  };

  var removePhotos = function (empty) {
    var photos = photoGallery.querySelectorAll('.ad-form__photo');
    if (empty) {
      photos.forEach(function (photo) {
        if (photo.children.length === 0) {
          photo.remove();
        }
      });
    } else {
      photos.forEach(function (photo) {
        photo.remove();
      });
    }
  };

  var changePhoto = function (photoPath) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    var img = document.createElement('img');
    img.width = IMAGE_DIMENSIONS.width;
    img.height = IMAGE_DIMENSIONS.height;
    img.src = photoPath;
    div.appendChild(img);
    photoGallery.appendChild(div);
    removePhotos(true);
  };

  var setDefaultPhoto = function () {
    removePhotos(false);
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    photoGallery.appendChild(div);
  };

  var loadPhoto = function (picker, render) {
    var file = picker.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        render(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  avatarPicker.addEventListener('change', function () {
    loadPhoto(avatarPicker, changeAvatar);
  });

  photoPicker.addEventListener('change', function () {
    loadPhoto(photoPicker, changePhoto);
  });

  window.avatar = {
    setDefaultAvatar: setDefaultAvatar,
    setDefaultPhoto: setDefaultPhoto
  };
})();
