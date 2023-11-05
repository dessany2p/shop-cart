// window.localStorage.clear()
// import countClicks from './script.js';

const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const newCard = document.querySelector('.add__cards')



function createCart() {
   if (cartStorage.length) {
      cartStorage.forEach((element) => {
         const { cartImg, cartTitle, cartPrice, cartCount, currentId } = element



         newCard.innerHTML =
            `
            <div class="categories__item" id='${currentId}'>
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
            </div>
            `
         let clone = newCard.firstElementChild.cloneNode(true);
         console.log(newCard)
         console.log(clone)
         clone = newCard.cloneNode(true)

      });
   }
}

createCart()

const elems = document.querySelectorAll('.categories__close');

function checkClose() {
   elems.forEach((elem, index) => {
      elem.addEventListener('click', () => {
         let currentElem = elems[index]
         console.log(currentElem)
         let a = JSON.parse(currentElem);
         console.log(a)
         currentElem.parentElement.remove();

      })
   })
}

checkClose()

// countClicks()

