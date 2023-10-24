import './index.html';
import './cart.html';
import './style.scss';

const mult = (a, b) => a * b;
console.log(mult(2, 4))
console.log(mult(5, 4))

const counters = document.querySelectorAll('[data-counter]');

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