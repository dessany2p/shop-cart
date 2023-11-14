const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const newCard = document.querySelector('.add__cards')
let b = JSON.parse(localStorage.getItem('cart'));

function createCart() {
   if (cartStorage.length) {
      cartStorage.forEach((element) => {
         const { currentId, cartTitle, cartPrice, cartCount, cartImg } = element

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
         newCard.appendChild(div)
      });
   }
}
createCart();

let result;
function totalCount(price) {
   let sum = 0;
   const div = document.querySelector(".sum");
   [...document.querySelectorAll('.categories__item')].forEach((basketItem) => {
      sum += Number(basketItem.children[3].outerText.slice(0, length - 5));
   })
   result = sum;
   div.textContent = `${sum} RUB`
}
// totalCount()


// countClicks()
let counters = document.querySelectorAll('[data-counter]');
function countClicks() {
   if (counters) {
      counters.forEach(counter => {
         counter.addEventListener('click', e => {
            const target = e.target;
            let value = parseInt(target.closest('.counter').querySelector('input').value);
            let c;
            if (target.closest('.counter__button')) {
               for (let item of b) {
                  let trueItemId = (item.currentId === target.parentNode.parentNode.parentNode.dataset.id);
                  let costPrice = target.parentNode.parentNode.parentNode.children[3].children[0];
                  let inputValue = target.closest('.counter').querySelector('input').value;
                  if (target.classList.contains('button__plus')) {

                     if (trueItemId) {
                        if (item.cartCount <= 0) {
                           target.closest('.counter').querySelector('.button__minus').classList.remove('disabled');
                           item.cartCount += 1;
                           localStorage.setItem('cart', JSON.stringify([...b]))
                           c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;
                           costPrice.innerHTML = `${c} руб.`;
                           value++;
                           target.closest('.counter').querySelector('input').value = value;
                           totalCount(c)
                        } else {
                           item.cartCount += 1;
                           localStorage.setItem('cart', JSON.stringify([...b]))
                           c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;
                           costPrice.innerHTML = `${c} руб.`;
                           value++;
                           target.closest('.counter').querySelector('input').value = value;
                           totalCount(c)
                        }
                     }
                  }
                  if (target.classList.contains('button__minus')) {
                     if (trueItemId) {
                        if (item.cartCount <= 0) {
                           target.closest('.counter').querySelector('.button__minus').classList.add('disabled');
                           value = 0;
                           cartCount = 0;
                           c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;
                           localStorage.setItem('cart', JSON.stringify([...b]))
                        } else {
                           item.cartCount -= 1;
                           localStorage.setItem('cart', JSON.stringify([...b]))
                           c = Number(item.cartPrice.slice(0, length - 5)) * item.cartCount;
                           costPrice.innerHTML = `${c} руб.`;
                           value--;
                           target.closest('.counter').querySelector('input').value = value;
                           totalCount(c)
                        }
                     }
                  }
               }
            }
         })
      })
   }
}

countClicks()

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
                  b = JSON.parse(localStorage.getItem('cart') || '[]');
                  b.splice(index, 1)
                  localStorage.setItem('cart', JSON.stringify([...b]));
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

sendRequest('POST', requestURL, body)
   .then(data => console.log(data))
   .catch(err => console.log(err));

const btnSend = document.querySelector('.btn-buy');

btnSend.addEventListener('click', (e) => {
   console.log(e)
   if (e) {
      body = b;
      return sendRequest('POST', requestURL, body)
   }
})