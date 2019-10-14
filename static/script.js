// For all client side JS



const socket = io.connect(`http://localhost:3000`);

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

/**
 * A function to add a message to the user's screen (append to div tag)
 * @param {string} message Any text to be written to the div tag
 */

const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.setAttribute('class', position);
    messageContainer.append(messageElement);
};

// To get username from the user
// const name = prompt('What is your name?');
const name = document.querySelector("data").getAttribute("val");
// To display on your screen that you joined the chat room
appendMessage('You joined', 'center');
// To send this information to the server
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, 'center');
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`, 'center');
});

messageForm.addEventListener('submit', e => {
    // To stop the form from submitting, which in-turn stops the page from refreshing (so, we don't lose the messages)
    e.preventDefault();

    // Getting the message from the input field
    const message = messageInput.value;

    // Sending the message to server
    socket.emit('send-chat-message', message);

    // Send what the user said to their own screen for display
    appendMessage(`You: ${message}`, 'right');

    // Clearing the input field after a message is sent
    messageInput.value = '';
});
