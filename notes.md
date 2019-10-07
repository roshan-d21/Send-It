# Usage

Clone the [repository](https://github.com/naveenk2k/Send-It) locally.
Run the following code to install the required packages.
```
npm install
```
```cd``` into the directory and start the server with node.
```
node server.js
```
Optionally use [nodemon](https://www.npmjs.com/package/nodemon) to automatically reload the server whenever changes are made to it.
```
> nodemon run
[nodemon] 1.19.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node run server.js`
```

Head to [localhost:3000](http://localhost:3000/) to see it running.

>Tip: Open two tabs simultaneously to see how messages can be sent to everyone connected to that socket

# To Do

* ~~Create a basic functioning messaging service to test out and learn how [socket.io](https://socket.io/) works~~

* Implement routing so we have multiple pages
    * Login
    * Chat home-screen

* Incorporate authentication. (Perhaps using OAuth2?)
    * [socketio-auth](https://www.npmjs.com/package/socketio-auth)
    * Login through Gmail at first

* Save messages to [MongoDB](https://www.mongodb.com/) so they can be fetched and shown on future logins


# Keep In Mind

* If you need to change the port that the app runs on, you have to edit the .env file **as well as** ./static/script.js to
    ```javascript
    const socket = io.connect(`http://localhost:NEWPORTNUMBER`);
    ```

* We might **not** need to host the app on [netlify]() for everyone to access it.


    Read [this](https://stackoverflow.com/questions/9682262/how-do-i-connect-to-this-localhost-from-another-computer-on-the-same-network) StackOverflow answer for more information.

    Also see [this](https://howchoo.com/g/mte2zgrhmjf/how-to-access-a-website-running-on-localhost-from-a-mobile-phone) for connecting directly from a mobile device.

* When you add images and other resources to be used in ```index.html```, put them all inside the ```static``` folder.