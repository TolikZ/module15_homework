const btn = document.querySelector('.btn');
const icons = document.querySelectorAll('.bi');

btn.addEventListener('click', () => {
  icons.forEach((e) => {
    e.classList.toggle('active');
  })
});