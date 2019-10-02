const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
socket.emit('new-user', name);
appendMessage('You joined!');

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', data => {
    appendMessage(`${data} has joined!`);
})

socket.on('user-disconnected', data => {
    appendMessage(`${data} has left!`);
})


messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-message', message);
    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
}