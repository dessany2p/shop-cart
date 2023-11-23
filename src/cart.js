/// пупа и лупа
import './style.scss';

const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const newCard = document.querySelector('.add__cards')
let b = JSON.parse(localStorage.getItem('cart'));

function totalCount() {
   let sum = 0;
   const totalAll = document.querySelector(".sum");
   const valueCartsCount = getCartsContents()

   for (let item of valueCartsCount) {
      sum += (Number(item.cartPrice.slice(0, length - 5)) * item.cartCount)
   }
   totalAll.textContent = `${sum} RUB`
}


function countClicks() {
   let counters = document.querySelectorAll('[data-counter]');
   counters.forEach(counter => {
      counter.addEventListener('click', e => {
         const target = e.target;
         let value = parseInt(target.closest('.counter').querySelector('input').value);
         let c;
         if (target.closest('.counter__button')) {
            for (let item of b) {
               let trueItemId = (item.currentId === target.parentNode.parentNode.parentNode.dataset.id);
               let currId = target.parentNode.parentNode.parentNode.dataset.id;
               let costPrice = target.parentNode.parentNode.parentNode.children[3].children[0];
               if (target.classList.contains('button__plus')) {

                  if (trueItemId) {
                     if (item.cartCount <= 0 || item.cartCount > 1) {
                        target.closest('.counter').querySelector('.button__minus').classList.remove('disabled');
                        value += 1;
                        item.cartCount += 1;

                        target.closest('.counter').querySelector('input').value = value;
                        c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;

                        costPrice.innerHTML = `${c} руб.`;

                        changedItemLocalStorage(currId, item.cartCount)
                        totalCount(c)
                     }
                     else {
                        value++;
                        item.cartCount++
                        target.closest('.counter').querySelector('input').value = value;
                        c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;

                        costPrice.innerHTML = `${c} руб.`;

                        changedItemLocalStorage(currId, item.cartCount)
                        totalCount(c)
                     }
                  }
               }
               if (target.classList.contains('button__minus')) {
                  if (trueItemId) {
                     if (item.cartCount <= 0) {
                        target.closest('.counter').querySelector('.button__minus').classList.add('disabled');
                        value = 0;
                        item.cartCount = 0;
                        c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;
                        changedItemLocalStorage(currId, item.cartCount)
                        totalCount(c)
                     } else {
                        value--;
                        item.cartCount--
                        target.closest('.counter').querySelector('input').value = value;
                        c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;

                        costPrice.innerHTML = `${c} руб.`;

                        changedItemLocalStorage(currId, item.cartCount)
                        totalCount(c)
                     }
                  }
               }
            }
         }
      })
   })
}

// 1__. Изменение item'а в localStorage по id'шнику. Ф-ция должна принимать id-шник item'а и его значение, ничего не возвращает
const changedItemLocalStorage = (id, value = 1) => {
   let getIdItem = JSON.parse(localStorage.getItem('cart') || []);
   let necessaryItems = [];

   // логика
   for (let item of getIdItem) {
      if (item['currentId'] === id && !necessaryItems.includes(item)) {
         item.cartCount = value;
         necessaryItems.push(item);
      } else if (item['currentId'] !== id) {
         necessaryItems.push(item)
      }
      localStorage.setItem('cart', JSON.stringify([...necessaryItems]))
   }
}
// changedItemLocalStorage('product2')


// 2__. Получение значения item'а из localStorage. Ф-ция должна принимать его id'шник и возвращать весь item
function getItemLocalStorage(id) {
   // Получаем содержимое хранилища в переменную или пустой массив, если хранилище пустое (чтобы не получить андефн)
   let getIdItem = getCartsContents();
   let necessaryItems = [];
   // логика:
   // Проходимся по элементам массива в цикле и находим заданный ID.
   for (let item of getIdItem) {
      if (item['currentId'] === id) {
         // возвращаем нужным ID из хранилища в массив.
         // return item
         necessaryItems.push(item)
      }
      // проверка что приходит в neccesaryItems;
      // return necessaryItems;
   }
}
// __2. tests getItemLocalStorage(id)
// getItemLocalStorage('product2')
// addItemInLocalStorage(getItemLocalStorage('product2'))

// 3__. Получение всей корзины из localStorage(распаршенной с помощью JSON.parse), ф - ция ничего не принимает, возвращает массив item'ов
function getCartsContents() {
   return JSON.parse(localStorage.getItem('cart') || '[]');
}
// __3. tests getCartsContents()

// 4. Добавление item'а в localStorage. Функция принимает весь item, возвращает его id'шник
function addItemInLocalStorage(item) {
   // логика
   // просто добавляем элемент в хранилище.
   let neccesaryItems = getCartsContents();
   if (neccesaryItems.includes(item)) {
      item.cartCount++;
      neccesaryItems.push(item)
   } else {
      neccesaryItemsItems.push(item)
   }
   localStorage.setItem('cart', JSON.stringify([...neccesaryItems]))
   // Возвращаем ID.
   return console.log(item['currentId'])
}


// 5. Удаление item'а из localStorage. Ф-ция принимает его id'шник, ничего не возвращает.

function deleteItemInLocalStorage(id) {
   let basket = getCartsContents();
   let necessaryItems = [];
   for (let item of basket) {
      if (item['currentId'] !== id) {
         necessaryItems.push(item);
      }
      localStorage.setItem('cart', JSON.stringify([...necessaryItems]))
      showBtnBuy()
   }
}
// __5 tests 
// deleteItemInLocalStorage('product1')
window.deleteItemInLocalStorage = deleteItemInLocalStorage

// 6. Рендер item'а в корзине. Ф-ция принимает весь item и рендерит его в корзине. Если item уже "нарисован" в корзине, сначала удаляет его и потом заново его "рисует".
function getLocaleStorageAndCreateItem(localStorageArr, containerCard, collectionCarts) {
   localStorageArr.forEach((element, index) => {
      let { currentId, cartTitle, cartPrice, cartCount, cartImg } = element

      function createDivItem(item) {
         const div = document.createElement('categories__item')
         div.innerHTML = `
               <div class="categories__item" data-id='${currentId}'>
                  <img src=${cartImg} alt="" class="categories__image">
                  <span class="categories__name-item">${cartTitle}</span>
                  <div class="counter" data-counter>
                     <div class="counter__input">
                        <input type="text" disabled value="${cartCount}">
                     </div>
                     <div class="counter__buttons-container">
                        <button class="counter__button button__minus">⮟</button>
                        <button class="counter__button button__plus">⮝</button>
                     </div>
                  </div>
                  <div class="categories__price">
                     <span class="price__item">${cartPrice}</span>
                  </div>
                  <span class="categories__close">X</span>
               `
         containerCard.appendChild(div);
      }

      if (collectionCarts.length === 0) {
         createDivItem(element)
         for (let item of collectionCarts) {
            if (item.currentId !== currentId) {
               createDivItem(element);
            } else {
               item.parentElement.remove()
               createDivItem(element)
            }
         }
      }
   })
}

function createItemInBasket(item) {
   const localStorageArr = getCartsContents();
   const containerCard = document.querySelector('.add__cards');
   const collectionCarts = document.querySelectorAll('.categories__item');
   getLocaleStorageAndCreateItem(localStorageArr, containerCard, collectionCarts)
   showBtnBuy()
}
createItemInBasket()
// Запускаем счетчики после рендера корзинки

countClicks()
totalCount()
showBtnBuy()


function deleteNodeAndItem(item, elem) {
   deleteItemInLocalStorage(item.currentId)
   elem.parentElement.remove()
}

function checkClose() {
   let elems = document.querySelectorAll('.categories__close');
   elems.forEach((elem, index) => {
      elem.addEventListener('click', (e) => {
         let currentBtn = elem.parentElement.dataset.id;
         let currentElem = elems[index].parentElement.dataset.id;
         if (currentBtn === currentElem) {
            for (let item of b) {
               if (item.currentId === currentBtn) {
                  deleteNodeAndItem(item, elem)
               }
            }
         }
         totalCount()
      })
   })
}
checkClose();

const requestURL = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url, body = null) {
   const headers = {
      'Content-Type': 'application/json'
   }
   return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
   })
      .then(response => {
         if (response.ok) {
            return response.json();
         }
         throw new Error('Что-то пошло не так... Повторите попытку позднее.');
      })
}

let body = {}

const btnSend = document.getElementById('addBtn');

btnSend.addEventListener('click', (e) => {
   if (e) {
      body = b;
      return sendRequest('POST', requestURL, body)

         .then(date => {
            showPhrase('Ваш заказ успешно оформлен!'),
               clearKeyCartInLocalStorage(),
               hideModal(),
               removeBtnBuy()
         })

         .catch(err => {
            showPhrase('Что-то пошло не так... Повторите попытку позднее.'),
               removeBtnBuy()
         })
   }
})

function showPhrase(phrase) {
   document.body.querySelector('.successful__order').innerHTML = phrase;
}

function hideModal() {
   modal.style.display = 'none';
}

function removeBtnBuy() {
   document.getElementById('myBtn').remove()
}

function clearKeyCartInLocalStorage() {
   localStorage.setItem('cart', '[]')
}

function checkBasket() {
   return JSON.parse(localStorage.getItem('cart' || '[]'));
}

function showBtnBuy() {
   console.log('showBtn test....')
   let a = checkBasket()
   console.log('showBtn a.length: test....', a.length)
   if (a.length !== 0) {

      document.querySelector('.btn-buy').innerHTML = 'Купить'
   } else {
      document.querySelector('.btn-buy').innerHTML = 'Корзина пуста, выбери товары на странице Shop'
   }
}


// логистик модалки
let modal = document.getElementById('myModal');
let btn = document.getElementById('myBtn');
let span = document.getElementsByClassName('close')[0];
let deleteBtn = document.getElementById('deleteBtn');

function openModal() {
   let a = checkBasket()
   if (a.length !== 0) {
      modal.style.display = 'block'
   }
}

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