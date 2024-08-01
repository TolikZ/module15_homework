const button = document.querySelector('.btn')

const screenWidth = document.documentElement.clientWidth;
const screenHeight = document.documentElement.clientHeight;

button.addEventListener('click', () => {
  alert(`'Размер экрана: ${screenWidth}x${screenHeight}'`);
});