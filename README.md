![Walkthrough](/Chat.io-walkthrough.gif?raw=true)

Chat.io was the final project in Web Programming 2. Given a server we were tasked with creating an front end for a IRC like chat application where users are able to join chatroom's or message privately. Communication with the server is facilitated by socket.io and all routing is controlled by the Redux global state. The structure and webpack was configured without the help of the 'create-react-app' scaffolding tool.

[Assignment Description](/Assignment-description-chatio.pdf)

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/ArnarArnar/chat.io.git
	$ cd chat.io
	```
2. Install Dependencies for the client

	```
	$ npm install
	```

3. Unzip server.7z

  ```
  $ 7z x server.7z
  $ cd server
  ```

4. Install Dependencies for the server

	```
	$ npm install
	```
5. Start the server

	```
	$ node chatserver.js
	```