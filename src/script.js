// import './index.html';
// import './cart.html';
// import './style.scss';

// const mult = (a, b) => a * b;
// console.log(mult(2, 4))
// console.log(mult(5, 4))


const cardsId = document.querySelectorAll('[data-id]');
const priceButtons = document.querySelectorAll('.btn__buy');
const cartItem = document.querySelectorAll('.card__item');
const cart = document.querySelector("body > div.wrapper > div");


// class LocalStorageUtil {
//    constructor() {
//       this.keyName = 'products';
//    }

//    getProducts() {
//       const productsLocalStorage = localStorage.getItem(this.keyName);
//       if (productsLocalStorage !== null) {
//          return JSON.parse(productsLocalStorage);
//       }
//       return [];
//    }
//    putProducts(id) {
//       let products = this.getProducts();
//       let pushProduct = false;
//       const index = products.indexOf(id);


//       if (index === -1) {
//          products.push(id);
//          pushProduct = true
//       } else {
//          products.splice(index, 1)
//       }
//       localStorage.setItem(this.keyName, JSON.stringify(products))

//       return {
//          pushProduct: pushProduct,
//          products: products
//       }
//    }
// }

// const localStorageUtil = new LocalStorageUtil();

// localStorageUtil.getProducts('el1')



// let a = localStorage.getItem('cart')
let btnCountTest = 0;
let b = JSON.parse(localStorage.getItem('cart'));
console.log(b)

priceButtons.forEach((el, i) => {

   el.addEventListener('click', (e) => {
      const cartTitle = el.parentElement.parentElement.childNodes[3].innerText
      const cartPrice = el.parentElement.parentElement.childNodes[5].childNodes[1].innerText
      const cartImg = el.parentElement.parentElement.querySelector('img').getAttribute('src')

      const cartStorage = localStorage.getItem('cart') || '[]'
      const cart = JSON.parse(cartStorage)

      console.log(b)
      let cartCount = 1;
      let currentId = el.parentNode.parentNode.dataset.id
      const card = { currentId, cartTitle, cartPrice, cartCount, cartImg }


      if (!el.classList.contains('added')) {
         console.log('bbbb', b)
         b.forEach((item, i) => {
            if (item[i] !== el) {
               localStorage.setItem('cart', JSON.stringify([...cart, card]))
            }
         })

         console.log(JSON.parse(localStorage.getItem('cart')))
         el.classList.add('added')
         console.log(el)
         el.innerHTML = 'Добавлено в корзину'





         localStorage.setItem('cart', JSON.stringify([...cart, card]))
         b = JSON.parse(localStorage.getItem('cart'))

      }
      else if (el.classList.contains('added')) {
         el.classList.remove('added')
         el.innerHTML = 'Купить'
         cartCount = 0;
         b.splice(i, 1)
         localStorage.setItem('cart', JSON.stringify([...b]))
      }
   })
})





