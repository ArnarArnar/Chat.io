![Walkthrough](/Chat.io-walkthrough.gif?raw=true)

# Chat.io

Chat.io was a individual final project in Web Programming 2. Given a server we were tasked with creating an front end for a IRC like chat application where users are able to join chatroom's or message privately. Communication with the server is facilitated by socket.io and all routing is controlled by the Redux global state. The structure and webpack was configured without the help of the 'create-react-app' scaffolding tool.

**Built using React, Redux, Socket.io & Bootstrap**

#### [Assignment Description](/Assignment-description-chatio.pdf)

## Installation
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1.  Clone or Download the repository

	```
	$ git clone https://github.com/ArnarArnar/chat.io.git
	$ cd chat.io
	```

2.  Install dependencies for the client

	```
	$ npm install
	```

3.  Start a new cli instance and traverse to server/ folder and install its dependencies and then start the server

	```
	$ npm install
	$ node chatserver.js
	```

4.  From the other cli window start the client

	```
	$ node chatserver.js
	```