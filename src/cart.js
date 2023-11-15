const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const newCard = document.querySelector('.add__cards')
let b = JSON.parse(localStorage.getItem('cart'));

function totalCount(price) {
   let sum = 0;
   const totalAll = document.querySelector(".sum");

   const valueCartsCount = getCartsContents()
   for (let item of valueCartsCount) {
      sum += (item.cartCount * Number(item.cartPrice.slice(0, length - 5)))
   }
   totalAll.textContent = `${sum} RUB`
}
totalCount()


// Ф-ия для подсчёта общей стоимости каждого итема. Не уверен что нужна. Пока отключил.
// function totalOne(item) {
//    const totalOne = document.querySelectorAll('.price__item')
//    let sum = (item.cartCount * Number(item.cartPrice.slice(0, length - 5)))
//    totalOne.textContent = `${sum} rub`
// }
// countClicks()


function countClicks() {
   let counters = document.querySelectorAll('[data-counter]');
   console.log(counters)
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
                        // totalOne(item)
                     }
                     else {
                        value++;
                        item.cartCount++
                        target.closest('.counter').querySelector('input').value = value;
                        c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;

                        costPrice.innerHTML = `${c} руб.`;

                        changedItemLocalStorage(currId, item.cartCount)
                        totalCount(c)
                        // totalOne(item)
                     }
                  }
               }
               if (target.classList.contains('button__minus')) {
                  if (trueItemId) {
                     console.log(item.cartCount)
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
      console.log(!necessaryItems.includes(item))
      if (item['currentId'] === id && !necessaryItems.includes(item)) {
         console.log('item : ', item, 'value :', value)
         item.cartCount = value;
         necessaryItems.push(item);
      } else if (item['currentId'] !== id) {
         necessaryItems.push(item)
      }
      localStorage.setItem('cart', JSON.stringify([...necessaryItems]))
   }
}
// export { changedItemLocalStorage };
// changedItemLocalStorage('product2')


// 2__. Получение значения item'а из localStorage. Ф-ция должна принимать его id'шник и возвращать весь item
function getItemLocalStorage(id) {
   // Получаем содержимое хранилища в переменную или пустой массив, если хранилище пустое (чтобы не получить андефн)
   let getIdItem = JSON.parse(localStorage.getItem('cart') || [])
   let necessaryItems = [];
   // логика:
   // Проходимся по элементам массива в цикле и находим заданный ID.
   for (let item of getIdItem) {
      if (item['currentId'] === id) {
         // возвращаем нужным ID из хранилища в массив.
         necessaryItems.push(item)
      }
      // проверка что приходит в neccesaryItems;
      // console.log(necessaryItems)
      return necessaryItems;
   }
}
// __2. tests getItemLocalStorage(id)
// getItemLocalStorage('product2')

// 3__. Получение всей корзины из localStorage(распаршенной с помощью JSON.parse), ф - ция ничего не принимает, возвращает массив item'ов
function getCartsContents() {
   return JSON.parse(localStorage.getItem('cart') || [])
}
// __3. tests getCartsContents()
// console.log('getCartsContents() :', getCartsContents())

// 4. Добавление item'а в localStorage. Функция принимает весь item, возвращает его id'шник
function addItemInLocalStorage(item) {
   // логика
   // просто добавляем элемент в хранилище.
   localStorage.setItem('cart', JSON.stringify([item]))
   // Возвращаем ID.
   return item['currentId']
}


// 5. Удаление item'а из localStorage. Ф-ция принимает его id'шник, ничего не возвращает.

function deleteItemInLocalStorage(id) {
   let basket = JSON.parse(localStorage.getItem('cart') || []);
   let necessaryItems = [];
   for (let item of basket) {
      if (item['currentId'] !== id) {
         necessaryItems.push(item);
      }
      localStorage.setItem('cart', JSON.stringify([...necessaryItems]))
   }
}
// __5 tests 
// deleteItemInLocalStorage('product1')


// 6. Рендер item'а в корзине. Ф-ция принимает весь item и рендерит его в корзине. Если item уже "нарисован" в корзине, сначала удаляет его и потом заново его "рисует".

function createItemInBasket(item) {
   const localStorageArr = getCartsContents();
   const containerCard = document.querySelector('.add__cards');
   const collectionCarts = document.querySelectorAll('.categories__item');

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
createItemInBasket()
// Запускаем счетчики после рендера корзинки
// Не настроен фикс дублей.
countClicks()
totalCount()




// checkClose()
let elems = document.querySelectorAll('.categories__close');
function checkClose() {
   elems.forEach((elem, index) => {
      elem.addEventListener('click', (e) => {
         let currentBtn = elem.parentElement.dataset.id;
         let currentElem = elems[index].parentElement.dataset.id;
         if (currentBtn === currentElem) {
            for (let item of b) {
               if (item.currentId === currentBtn) {
                  deleteItemInLocalStorage(item.currentId)
                  elem.parentElement.remove()
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
   }).then(Response => {
      return Response.json()
   })
}

// sendRequest('GET', requestURL)
//    .then(data => console.log(data))
//    .catch(err => console.log(err))

let body = {}

// расскоментировать
// sendRequest('POST', requestURL, body)
//    .then(data => console.log(data))
//    .catch(err => console.log(err));

const btnSend = document.querySelector('.btn-buy');

btnSend.addEventListener('click', (e) => {
   console.log(e)
   if (e) {
      body = b;
      return sendRequest('POST', requestURL, body)
   }
})