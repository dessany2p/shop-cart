import { b } from "../cart";
import { modal, btn, span, deleteBtn, openModal, hideModal, removeBtnBuy, clearKeyCartInLocalStorage, checkBasket, showBtnBuy } from './Модальное окошко';

export function deleteNodeAndItem(item, elem) {
   deleteItemInLocalStorage(item.currentId)
   elem.parentElement.remove()
}

export const requestURL = 'https://jsonplaceholder.typicode.com/users';

export function sendRequest(method, url, body = null) {
   const headers = {
      'Content-Type': 'application/json'
   }
   return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
   })
      .then(response => {
         if (response.ok) {
            return response.json();
         }
         throw new Error('Что-то пошло не так... Повторите попытку позднее.');
      })
}



export const btnSend = document.getElementById('addBtn');

btnSend.addEventListener('click', (e) => {
   let body = {}
   if (e) {
      body = b;
      return sendRequest('POST', requestURL, body)

         .then(date => {
            showPhrase('Ваш заказ успешно оформлен!'),
               clearKeyCartInLocalStorage(),
               hideModal(),
               removeBtnBuy()
         })

         .catch(err => {
            showPhrase('Что-то пошло не так... Повторите попытку позднее.'),
               removeBtnBuy()
         })
   }
})

export function showPhrase(phrase) {
   document.body.querySelector('.successful__order').innerHTML = phrase;
}
