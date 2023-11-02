// window.localStorage.clear()
const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const newCard = document.querySelector('.add__cards')

function createCart() {
   if (cartStorage.length) {
      cartStorage.forEach((element) => {
         const { cartImg, cartTitle, cartPrice } = element
         let item = newCard.cloneNode(true);

         newCard.innerHTML =
            `
         <div class="categories__item">
            <img src=${cartImg} alt="" class="categories__image">
            <span class="categories__name-item">${cartTitle}</span>
            <div class="counter" data-counter>
               <div class="counter__input">
                  <input type="text" disabled value="1">
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
         console.log(newCard)
         newCard.appendChild(item)
      });
   }
}

createCart()

const elems = document.querySelectorAll('.categories__close');

function checkClose() {
   elems.forEach((elem, index) => {
      elem.addEventListener('click', () => {
         const currentElem = elems[index]

         let a = JSON.stringify(currentElem.parentElement.childNodes[1]);
         console.log(a)
         if (localStorage.length) {

            for (let item in localStorage.cart) {
               let key = localStorage.key(item)
               if (key === a) {
                  localStorage.removeItem(key)
               }
            }
         }
         currentElem.parentElement.remove();

      })
   })
}

checkClose()

