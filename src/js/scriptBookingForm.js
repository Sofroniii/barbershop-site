var bookingForm = document.querySelector('.booking-form');
var bookingFormName = bookingForm.querySelector('[name=name]');
var bookingFormTel = bookingForm.querySelector('[name=tel]');
var bookingFormEmail = bookingForm.querySelector('[name=email]');
var bookingUserData = [bookingFormName, bookingFormTel, bookingFormEmail];

var bookingFormStorageName = localStorage.getItem('bookingFormName');

var popupFailure = document.querySelector('.popup-failure');
var popupFailureClose = document.querySelector('.popup-failure__ok');
var popupSuccess = document.querySelector('.popup-success');
var popupSuccessClose = document.querySelector('.popup-success__close');


// Валидация формы
//Logic bookingForm
if (bookingFormStorageName) {
  bookingFormName.value = bookingFormStorageName;
}

bookingFormName.addEventListener("change", function(event) {
  localStorage.setItem("bookingFormName", bookingFormName.value);
});

bookingForm.addEventListener('submit', function(event) {
	event.preventDefault();
	if (!bookingFormName.value || (!bookingFormTel.value && !bookingFormEmail.value)) {
		popupFailure.classList.add('popup-failure--show');
		popupOverlay.classList.add('popup-overlay--show');
	} else {
		popupSuccess.classList.add('popup-success--show');
		popupOverlay.classList.add('popup-overlay--show');
	}
});

popupFailureClose.addEventListener('click', function(event) {
	event.preventDefault();
	popupFailure.classList.remove('popup-failure--show');
	popupOverlay.classList.remove('popup-overlay--show');

	for (i = 0; i < bookingUserData.length; i++) {
		if (!bookingUserData[i].value) {
			bookingUserData[i].focus();
			break;
		}
	}
});

popupSuccessClose.addEventListener('click', function(event) {
	event.preventDefault();
	popupSuccess.classList.remove('popup-success--show');
	popupOverlay.classList.remove('popup-overlay--show');
});

popupOverlay.addEventListener('click', function(event) {
	event.preventDefault();
	popupFailure.classList.remove('popup-failure--show');
	popupSuccess.classList.remove('popup-success--show');
});

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (popupFailure.classList.contains ('popup-failure--show') || 
				popupSuccess.classList.contains ('popup-success--show')) {
			popupFailure.classList.remove('popup-failure--show');
			popupOverlay.classList.remove('popup-overlay--show');

			popupSuccess.classList.remove('popup-success--show');
			popupOverlay.classList.remove('popup-overlay--show');
		}
	}
});

// Скрипт отправки формы на сервер