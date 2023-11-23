// zalypuch
import './style.scss'

const cardsId = document.querySelectorAll('[data-id]');
const priceButtons = document.querySelectorAll('.btn__buy');
const cartItem = document.querySelectorAll('.card__item');
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

      let cartStorage = JSON.parse(localStorage.getItem('cart') || '[]')

      let cartCount = 1;
      let currentId = el.parentNode.parentNode.dataset.id
      const card = { currentId, cartTitle, cartPrice, cartCount, cartImg }
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