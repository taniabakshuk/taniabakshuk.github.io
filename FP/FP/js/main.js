/*  Бургер меню */

const button = document.querySelector('.hamburger__button');
const menu = document.querySelector('.hamburger__menu');
const body = document.querySelector('.body');
const cross = document.querySelector('.hamburger__icon');


button.onclick = function () {
    menu.classList.toggle('hamburger__menu_visible');
    body.classList.toggle('body_hidden');
    cross.classList.toggle('hamburger__icon_cross');
};

$('.hamburger__link').click(function(){
    menu.classList.remove('hamburger__menu_visible');
    body.classList.remove('body_hidden');
});











