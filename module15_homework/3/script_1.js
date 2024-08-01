const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const inputMessage = document.querySelector('.inputMessage');
const btnSubmit = document.querySelector('.btn-submit');
const btnLoc = document.querySelector('.btn-loc');
const chat = document.querySelector('.chat__box');
const locMessage = document.querySelector('.loc-message');
const mapLink = document.querySelector('#map-link');

let websocket;

function clientToChat(message) {
  let clientMessage = document.createElement('div');
  clientMessage.classList.add('chat__message', 'client-message');
  chat.appendChild(clientMessage);
  let pre = document.createElement('p');
  pre.innerHTML = message;
  clientMessage.appendChild(pre);
}

function serverToChat(message) {
  let serverMessage = document.createElement('div');
  serverMessage.classList.add('chat__message', 'server-message');
  chat.appendChild(serverMessage);
  let pre = document.createElement('p');
  pre.innerHTML = message;
  serverMessage.appendChild(pre);
}

btnSubmit.addEventListener('click', () => {
  websocket = new WebSocket(wsUrl);
  websocket.onopen = function (evt) {
    console.log('Connected');
  };
  websocket.onclose = function (evt) {
    console.log('Disconnected');
  };
  websocket.onmessage = function (evt) {
    serverToChat(evt.data);
  };
  websocket.onerror = function (evt) {
    console.log('Error');
  };

  sendMessage();
});

function sendMessage() {
  const message = inputMessage.value;
  clientToChat(message);
  websocket.onopen = () => websocket.send(message);
}

const errorLoc = () => {
  locMessage.style.display = 'block';
  locMessage.textContent = 'Невозможно получить ваше местоположение';
};

const successLoc = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  locMessage.style.display = 'block';
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Геолокация';
}

btnLoc.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    locMessage.style.display = 'block';
    locMessage.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    locMessage.style.display = 'block';
    locMessage.textContent = 'Определение местоположения...';
    navigator.geolocation.getCurrentPosition(successLoc, errorLoc);
  }
});