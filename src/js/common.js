var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

var navUserLogin = document.querySelector('.main-nav__user-login');
var popupContent = document.querySelector('.popup-content');
var popupContentClose = popupContent.querySelector('.popup-content__close');
var popupContentLogin = popupContent.querySelector('[name=login]');
var popupContentPassword = popupContent.querySelector('[name=password]');
var popupContentStorageLogin = localStorage.getItem('popupContentLogin');
var popupContentLoginForm = popupContent.querySelector('.login-form');
var popupOverlay = document.querySelector('.popup-overlay');


// Открытие-закрытие меню
navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
	if (navMain.classList.contains('main-nav--closed')) {
		navMain.classList.remove('main-nav--closed');
		navMain.classList.add('main-nav--opened');
	} else {
		navMain.classList.add('main-nav--closed');
		navMain.classList.remove('main-nav--opened');
	}
});


// Открытие формы входа
navUserLogin.addEventListener('click', function(event) {
	event.preventDefault();
	popupContent.classList.add('popup-content--show');
	popupOverlay.classList.add('popup-overlay--show');
	if (popupContentStorageLogin) {
		popupContentLogin.value = popupContentStorageLogin;
		popupContentPassword.focus();
	} else {
		popupContentLogin.focus();
	}
});


// Logic Form
popupContentLogin.addEventListener("change", function(event) {
	localStorage.setItem("popupContentLogin", popupContentLogin.value);
});


// Валидация формы 
popupContentLoginForm.addEventListener("submit", function(event) {
	if (!popupContentLogin.value || !popupContentPassword.value) {
		event.preventDefault();
		popupContent.classList.add("popup-content--error");
		if (!popupContentLogin.value) {
			popupContentLogin.focus();
		} else {
			popupContentPassword.focus();
		}
	}
});


// Закрытие формы входа
popupContentClose.addEventListener('click', function(event) {
	event.preventDefault();
	popupContent.classList.remove('popup-content--show');
	popupOverlay.classList.remove('popup-overlay--show');

	navMain.classList.add('main-nav--closed');
	navMain.classList.remove('main-nav--opened');
});

popupOverlay.addEventListener('click', function(event) {
	event.preventDefault();
	popupContent.classList.remove('popup-content--show');
	popupOverlay.classList.remove('popup-overlay--show');

	navMain.classList.add('main-nav--closed');
	navMain.classList.remove('main-nav--opened');
});

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (popupContent.classList.contains ('popup-content--show')) {
			popupContent.classList.remove('popup-content--show');
			popupOverlay.classList.remove('popup-overlay--show');

			navMain.classList.add('main-nav--closed');
			navMain.classList.remove('main-nav--opened');
		}
	}
});


// Слайдер галерея
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
	showSlides(slideIndex += n);
};

function currentSlide(n){
	showSlides(slideIndex = n);
};

function showSlides(n){
	var i;
	var slides = document.getElementsByClassName("reviews__item");
	var dots = document.getElementsByClassName("reviews__toggle");

	if(n > slides.length){
		slideIndex = 1;
	}
	if(n < 1){
		slideIndex = slides.length;
	}
	for(i=0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	for(i=0; i < dots.length; i++){
		dots[i].className = dots[i].className.replace("reviews__toggle--active","");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className+= " reviews__toggle--active";
};