// For all client side JS



const socket = io.connect(`http://localhost:3000`);

// const messageContainer = document.getElementById('message-container');
const messageList = document.getElementById('message-list');
// const messageForm = document.getElementById('send-container');
const sendButton = document.querySelector("body > div.container > div > div.col-md-8.border-left.no-gutter-1 > div.col-md-12.message-sender.flex > i:nth-child(3)");

const messageInput = document.querySelector("body > div.container > div > div.col-md-8.border-left.no-gutter-1 > div.col-md-12.message-sender.flex > div > div");

/**
 * A function to add a message to the user's screen (append to div tag)
 * @param {string} message Any text to be written to the div tag
 */
const appendMessage = (message, position) => {
    const newListItem = document.createElement('li');
    newListItem.innerText = message;
    newListItem.setAttribute('class', position);
    messageList.append(newListItem);
}


// To get username from the user's login
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

sendButton.addEventListener('click', e => {

    // Get the message from the input field
    const message = messageInput.innerHTML;

    if (message) {
        // Send the message to the server
        socket.emit('send-chat-message', message);

        // Send what the user said to their own screen for display
        appendMessage(message, 'right');

        // Clear the input field after a message is sent
        messageInput.innerHTML = '';
    }
});