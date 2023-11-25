// Переменные для работы модального окна

export let modal = document.getElementById('myModal');
export let btn = document.getElementById('myBtn');
export let span = document.getElementsByClassName('close')[0];
export let deleteBtn = document.getElementById('deleteBtn');

// Скрыть модалку
export function hideModal() {
   modal.style.display = 'none';
}

// Удалить кнопку с модалкой
export function removeBtnBuy() {
   document.getElementById('myBtn').remove()
}

// Вспомогательная ф-я для обнуления хранилище после оформления заказа.
export function clearKeyCartInLocalStorage() {
   localStorage.setItem('cart', '[]')
}

// Вспомогательная ф-я для проверки корзины
export function checkBasket() {
   return JSON.parse(localStorage.getItem('cart' || '[]'));
}

// Динамический генератор текста кнопки.
export function showBtnBuy() {
   let a = checkBasket()
   if (a.length !== 0) {
      document.querySelector('.btn-buy').innerHTML = 'Купить'
   } else {
      document.querySelector('.btn-buy').innerHTML = 'Корзина пуста, выбери товары на странице Shop'
   }
}

// Открыть модалку
export function openModal() {
   let a = checkBasket()
   if (a.length !== 0) {
      modal.style.display = 'block'
   }
}

// Обработчики на кнопки и оверлей

btn.addEventListener('click', (e) => {
   if (e) {
      openModal()
   }
})

deleteBtn.onclick = function () {
   modal.style.display = 'none'
}

span.onclick = function () {
   modal.style.display = 'none'
}

window.onclick = function (e) {
   if (e.target === modal) {
      modal.style.display = 'none'
   }
}