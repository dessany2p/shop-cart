// import './index.html';
// import './cart.html';
// import './style.scss';

const cardsId = document.querySelectorAll('[data-id]');
const priceButtons = document.querySelectorAll('.btn__buy');
const cartItem = document.querySelectorAll('.card__item');
const cart = document.querySelector("body > div.wrapper > div");
let btnCountTest = 0;

// let b = JSON.parse(localStorage.getItem('cart'));

priceButtons.forEach((el, i) => {

   el.addEventListener('click', (e) => {
      const cartTitle = el.parentElement.parentElement.childNodes[3].innerText
      const cartPrice = el.parentElement.parentElement.childNodes[5].childNodes[1].innerText
      const cartImg = el.parentElement.parentElement.querySelector('img').getAttribute('src')

      const cartStorage = localStorage.getItem('cart') || '[]'
      let cart = JSON.parse(cartStorage)

      // console.log(b)
      let cartCount = 1;
      let currentId = el.parentNode.parentNode.dataset.id
      const card = { currentId, cartTitle, cartPrice, cartCount, cartImg }


      if (!el.classList.contains('added')) {
         // console.log('bbbb', b)
         cart.forEach((item, i) => {
            if (item[i] !== el) {
               localStorage.setItem('cart', JSON.stringify([...cart, card]))
            }
         })

         console.log(JSON.parse(localStorage.getItem('cart')))
         el.classList.add('added')
         // console.log(el)
         el.innerHTML = 'Добавлено в корзину'

         localStorage.setItem('cart', JSON.stringify([...cart, card]))
         cart = JSON.parse(localStorage.getItem('cart'))
      }
      else if (el.classList.contains('added')) {
         el.classList.remove('added')
         el.innerHTML = 'Купить'
         cartCount = 0;
         cart.splice(i, 1)
         localStorage.setItem('cart', JSON.stringify([...cart]))
      }
   })
})





