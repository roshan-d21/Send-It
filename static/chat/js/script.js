// For all client side JS



const socket = io.connect(`http://localhost:3000`);
// const socket = io.connect(`http://192.168.43.141:3000`);

// const messageContainer = document.getElementById('message-container');
const messageList = document.getElementById('message-list');

const messageDiv = document.querySelector("body > div.container > div > div.col-md-8.border-left.no-gutter-1 > div.chat-box");

// const messageForm = document.getElementById('send-container');
const sendButton = document.querySelector("body > div.container > div > div.col-md-8.border-left.no-gutter-1 > div.col-md-12.message-sender.flex > i:nth-child(3)");

const messageInput = document.querySelector("#message");

const sideBar = document.querySelector("#user-list");

const topLeftUserImage = document.querySelector('body > div.container > div > div.col-md-4.no-gutter > div.top-left-panel.left-panel-01 > img');

const emojiButton = document.querySelector("body > div.container > div > div.col-md-8.border-left.no-gutter-1 > div.col-md-12.message-sender.flex > i.material-icons.picker");

/**
 * A function to add a message to the user's screen (append to div tag)
 * @param {string} message Any text to be written to the div tag
 */
const appendMessage = (name, message, position) => {
    const newListItem = document.createElement('li');
    newListItem.innerText = message;
    newListItem.setAttribute('class', position);
    // Add name of the sender in the list element inside a h5 tag
    if (position == 'left') {
        const newListItemTitle = document.createElement('h5');
        newListItemTitle.innerText = name;
        newListItem.insertAdjacentElement('afterbegin', newListItemTitle);
    }
    messageList.append(newListItem);
    // if (messageDiv)
    //     messageDiv.scrollTop = messageDiv.scrollHeight;
}

const generateAvatar = name => {
    const queryString = "https://ui-avatars.com/api/?color=fff&background=09afe6";
    const nameSplit = name.split(" ");
    if (nameSplit.length == 1) {
        return queryString + `&name=${name}` + "&length=1";
    } else {
        return queryString + `&name=${name.replace(' ', '+')}`;
    }
}

const appendUser = (name) => {
    const newUserListItem = document.createElement('div');
    newUserListItem.setAttribute("class", "contacts-drawer");

    const newUserImage = document.createElement('img');
    // newUserImage.src = "../static/chat/images/k2k.jpg";
    newUserImage.src = generateAvatar(name);
    newUserImage.alt = name[0].toUpperCase();
    newUserImage.setAttribute('class', 'profile-pic');

    const newUserData = document.createElement("div");
    newUserData.setAttribute('class', 'text');
    newUserData.innerHTML = `<h5>${name}</h5><p class="muted">...</p>`;

    newUserListItem.append(newUserImage);
    newUserListItem.append(newUserData);

    // console.log(newUserListItem);
    sideBar.append(newUserListItem);
}

// To get username from the user's login
const name = document.querySelector("data").getAttribute("val");

// To display on your screen that you joined the chat room
appendMessage('You', 'You joined', 'center');
topLeftUserImage.src = generateAvatar(name);

// To send this information to the server
socket.emit('new-user', name);

socket.on('chat-message', data => {
    // appendMessage(`${data.name}: ${data.message}`, 'left');
    appendMessage(data.name, data.message, 'left');
});

socket.on('user-connected', name => {
    // appendMessage(`${name} connected`, 'center');
    appendMessage(name, `${name} connected`, 'center');
    appendUser(name);
});

socket.on('user-disconnected', name => {
    // appendMessage(`${name} disconnected`, 'center');
    appendMessage(name, `${name} disconnected`, 'center');
});

socket.on('get-user-list', users => {
    sideBar.innerHTML = "";
    for (const key in users) {
        appendUser(users[key]);
    }
})

const sendMessage = e => {

    // Get the message from the input field
    const message = messageInput.value;

    if (message) {
        // Send the message to the server
        socket.emit('send-chat-message', message);

        // Send what the user said to their own screen for display
        appendMessage('You', message, 'right');

        // Clear the input field after a message is sent
        messageInput.value = '';
    }
};

sendButton.addEventListener('click', sendMessage);
$(messageInput).on("keypress", function(e) {
    var key = e.keyCode;

    // If the user has pressed enter
    if (key == 13 && !e.shiftKey) {
        sendMessage();
        return false;
    } else {
        return true;
    }
});

$(emojiButton).click(function(e) {
    e.preventDefault();
    $(messageInput).emojiPicker({
        width: '300px',
        height: '200px',
        button: false
    });
    $(messageInput).emojiPicker('toggle');
});