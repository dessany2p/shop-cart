export function addItemInLocalStorage(item) {
   // логика
   // просто добавляем элемент в хранилище.
   let neccesaryItems = JSON.parse(localStorage.getItem('cart') || '[]');
   if (!neccesaryItems.includes(item)) {
      neccesaryItems.push(item)
   }

   localStorage.setItem('cart', JSON.stringify([...neccesaryItems]))
   // Возвращаем ID. :? Для чего возвращается id.
   return item['currentId']
}

export function deleteItemInLocalStorage(id) {
   let basket = JSON.parse(localStorage.getItem('cart') || '[]');
   let necessaryItems = [];
   for (let item of basket) {
      if (item['currentId'] !== id) {
         necessaryItems.push(item);
      }
      localStorage.setItem('cart', JSON.stringify([...necessaryItems]))
   }
}

export function addTextOnBtn(el) {
   el.classList.add('added')
   el.innerHTML = 'Добавлено в корзину'
}

export function delTextOnBtn(el) {
   el.classList.remove('added')
   el.innerHTML = 'Купить'
}