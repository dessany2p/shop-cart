// window.localStorage.clear()
// import countClicks from './script.js';

const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const newCard = document.querySelector('.add__cards')



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

// function sumCarts() {
//    let sum = 0;
//    const div = document.querySelector(".sum");
//    const totalPrice = document.querySelectorAll('.price__item')
//    let value = Number(document.querySelector('input').value);
//    console.log(value);
//    console.log(sum)
//    // console.log(totalPrice)

//    for (let item of totalPrice) {
//       // console.log(item)
//       let a = item.outerText.slice(0, length - 5)

//       // console.log(a)
//       sum += parseFloat(a) * value
//    }
//    return div.innerHTML = `Итого: ${parseFloat(sum)} руб.`
// }
// sumCarts()

function totalCount() {
   let sum = 0;
   const div = document.querySelector(".sum");
   const totalPrice = document.querySelectorAll('.price__item')

   for (let item of totalPrice) {
      let value = Number(document.querySelector('input').value);
      let a = Number(item.outerText.slice(0, length - 5));
      // console.log(item, a)
      sum += a * value
   }
   return div.innerHTML = `Итого: ${parseFloat(sum)} руб.`
}
totalCount()


// countClicks()
let counters = document.querySelectorAll('[data-counter]');
function countClicks() {
   if (counters) {
      counters.forEach(counter => {
         counter.addEventListener('click', e => {

            const target = e.target;

            if (target.closest('.counter__button')) {

               let value = parseInt(target.closest('.counter').querySelector('input').value);
               if (target.classList.contains('button__plus')) {
                  for (let item of b) {
                     if (item.currentId === target.parentNode.parentNode.parentNode.dataset.id) {
                        item.cartCount += 1;
                        localStorage.setItem('cart', JSON.stringify([...b]))
                     }
                  }
                  value++;
               } else {
                  for (let item of b) {
                     if (item.currentId === target.parentNode.parentNode.parentNode.dataset.id) {
                        item.cartCount -= 1;
                        localStorage.setItem('cart', JSON.stringify([...b]))
                     }
                  }
                  value--;
               }

               if (value <= 0) {
                  for (let item of b) {
                     if (item.currentId === target.parentNode.parentNode.parentNode.dataset.id) {
                        item.cartCount = 0;
                        localStorage.setItem('cart', JSON.stringify([...b]))
                     }

                  }
                  value = 0;
                  target.closest('.counter').querySelector('.button__minus').classList.add('disabled')
               } else {
                  target.closest('.counter').querySelector('.button__minus').classList.remove('disabled')
               }
               target.closest('.counter').querySelector('input').value = value;
            }
         })
      })
   } totalCount()
}

countClicks()

// checkClose()
const elems = document.querySelectorAll('.categories__close');
function checkClose() {
   elems.forEach((elem, index) => {
      elem.addEventListener('click', (e) => {
         let currentElem = elems[index].parentNode.dataset.id
         for (let item of b) {
            if (item.currentId === currentElem) {
               // console.log(item.currentId)
               // console.log(currentElem)
               b.splice(index, 1)
               // console.log(elem.parentNode)
               elem.parentNode.remove()
            }
         }
         sumCarts()
         localStorage.setItem('cart', JSON.stringify([...b]));
      })
   })
}
checkClose();