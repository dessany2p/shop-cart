// import './index.html';
// import './cart.html';
// import './style.scss';
// import { changedItemLocalStorage } from './cart'

const cardsId = document.querySelectorAll('[data-id]');
console.log('cardsId :', cardsId)
const priceButtons = document.querySelectorAll('.btn__buy');
console.log('pricebuttons :', priceButtons)
const cartItem = document.querySelectorAll('.card__item');
console.log('cartItem :', cartItem)
let btnCountTest = 0;

function checkPriceButtons() {
   priceButtons.forEach((el) => {
      const d = JSON.parse(localStorage.getItem('cart') || '[]')
      for (let item of d) {
         if (item.currentId === el.parentNode.parentNode.dataset.id) {
            addTextOnBtn(el)
         }
      }
   })
}
checkPriceButtons()

function addItemInLocalStorage(item) {
   // логика
   // просто добавляем элемент в хранилище.
   let neccesaryItems = JSON.parse(localStorage.getItem('cart') || '[]');
   if (!neccesaryItems.includes(item)) {
      neccesaryItems.push(item)
   }

   localStorage.setItem('cart', JSON.stringify([...neccesaryItems]))
   console.log('addItemInLocalStorage(item) working and return :', item['currentId'])
   // Возвращаем ID.
   return item['currentId']
}

function deleteItemInLocalStorage(id) {
   let basket = JSON.parse(localStorage.getItem('cart') || '[]');
   let necessaryItems = [];
   for (let item of basket) {
      if (item['currentId'] !== id) {
         necessaryItems.push(item);
      }
      localStorage.setItem('cart', JSON.stringify([...necessaryItems]))
   }
}

priceButtons.forEach((el, i) => {
   el.addEventListener('click', (e) => {
      const cartTitle = el.parentElement.parentElement.childNodes[3].innerText
      const cartPrice = el.parentElement.parentElement.childNodes[5].childNodes[1].innerText
      const cartImg = el.parentElement.parentElement.querySelector('img').getAttribute('src')

      console.log('cliuck')

      let cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

      let cartCount = 1;
      let currentId = el.parentNode.parentNode.dataset.id
      const card = { currentId, cartTitle, cartPrice, cartCount, cartImg }
      console.log(card)
      if (!el.classList.contains('added')) {
         addItemInLocalStorage(card)
         addTextOnBtn(el)
      } else {
         deleteItemInLocalStorage(currentId)
         delTextOnBtn(el)
      }
   })
})

function addTextOnBtn(el) {
   el.classList.add('added')
   el.innerHTML = 'Добавлено в корзину'
}

function delTextOnBtn(el) {
   el.classList.remove('added')
   el.innerHTML = 'Купить'
}