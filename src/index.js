// index.html = Главная страница

// Импорт стилей и вспомогательных функций.
import './style.scss'
import { deleteItemInLocalStorage, addItemInLocalStorage, addTextOnBtn, delTextOnBtn } from './helpersJS/helperIndex'

const priceButtons = document.querySelectorAll('.btn__buy');

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