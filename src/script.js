// import './index.html';
// import './cart.html';
// import './style.scss';

// const mult = (a, b) => a * b;
// console.log(mult(2, 4))
// console.log(mult(5, 4))

const counters = document.querySelectorAll('[data-counter]');
const cardsId = document.querySelectorAll('[data-id]');
const priceButtons = document.querySelectorAll('.btn__buy');
const cartItem = document.querySelectorAll('.card__item');
const cart = document.querySelector("body > div.wrapper > div")


let a = localStorage.getItem('cart')
let btnCountTest = 0;

priceButtons.forEach((el, i) => {

   el.addEventListener('click', (e) => {
      const cartTitle = el.parentElement.parentElement.childNodes[3].innerText
      const cartPrice = el.parentElement.parentElement.childNodes[5].childNodes[1].innerText
      const cartImg = el.parentElement.parentElement.querySelector('img').getAttribute('src')
      let currentId = null

      if (e && !el.classList.contains('added')) {
         el.classList.add('added')
         el.innerHTML = 'Добавлено в корзину'
         btnCountTest++
         // let kd = el.parentElement.document.querySelectorAll('[data-id]').dataset
         currentId = el.parentNode.parentNode.dataset.id
      }
      else {
         el.classList.remove('added')
         el.innerHTML = 'Купить'
         btnCountTest--
         currentId = null
      }
      const cartCount = btnCountTest;

      const cartStorage = localStorage.getItem('cart') || '[]'
      const cart = JSON.parse(cartStorage)
      const card = { cartImg, cartTitle, cartPrice, cartCount, currentId }

      localStorage.setItem('cart', JSON.stringify([...cart, card]))
   })



})


function countClicks() {
   if (counters) {
      counters.forEach(counter => {
         counter.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.counter__button')) {

               let value = parseInt(target.closest('.counter').querySelector('input').value);
               if (target.classList.contains('button__plus')) {
                  value++;
               } else {
                  value--;
               }

               if (value <= 0) {
                  value = 0;
                  target.closest('.counter').querySelector('.button__minus').classList.add('disabled')
               } else {
                  target.closest('.counter').querySelector('.button__minus').classList.remove('disabled')
               }
               target.closest('.counter').querySelector('input').value = value;
            }
         })
      })
   }
}

countClicks()

