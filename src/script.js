// import './index.html';
// import './cart.html';
// import './style.scss';

// const mult = (a, b) => a * b;
// console.log(mult(2, 4))
// console.log(mult(5, 4))

const counters = document.querySelectorAll('[data-counter]');
const priceButtons = document.querySelectorAll('.btn__buy');
const cartItem = document.querySelectorAll('.card__item');
const cart = document.querySelector("body > div.wrapper > div")

priceButtons.forEach((el, i) => {
   console.log(el);

   // const btn = document.querySelectorAll('.btn__buy');

   el.addEventListener('click', (e) => {

      const cartTitle = el.parentElement.parentElement.childNodes[3].innerText
      const cartPrice = el.parentElement.parentElement.childNodes[5].childNodes[1].innerText
      const cartImg = el.parentElement.parentElement.querySelector('img').getAttribute('src')

      const cartStorage = localStorage.getItem('cart') || '[]'
      const cart = JSON.parse(cartStorage)
      const card = { cartImg, cartTitle, cartPrice }

      localStorage.setItem('cart', JSON.stringify([...cart, card]))

   })
})

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