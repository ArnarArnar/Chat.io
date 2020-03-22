// import React from 'react';
// import PropTypes from 'prop-types';
// import { socket } from '../../services/socketService';

// class ChatWindow extends React.Component {
//   componentDidMount() {
//     // console.log(socket);
//     // socket.on('message', message => {
//     //   const { messages } = this.state;
//     //   this.setState({ messages: [...messages, message] });
//     // });
//   }
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [] /* List of all messages within the public lobby */,
//       message: '' /* Current message */,
//     };
//   }
//   sendMessage(message) {
//     if (message === '') {
//       return false;
//     }
//     socket.emit('message', message);
//     this.setState({ message: '' });
//   }
//   render() {
//     //const { users } = this.props;
//     return (
//       <div className="chat-window">
//         {/* <ChatWindow.Users users={users} />
//         <div className="input-container">
//           <input
//             type="text"
//             onChange={e => this.setState({ message: e.target.value })}
//             placeholder="Enter your message here..."
//           />
//           Send
//         </div> */}
//       </div>
//     );
//   }
// }

// ChatWindow.propTypes = {
//   users: PropTypes.object,
// };

// export default ChatWindow;

// // import React from 'react';
// // import PropTypes from 'prop-types';
// // import { socket } from '../../services/socketService';

// // class ChatWindow extends React.Component {
// //   componentDidMount() {
// //     // console.log(socket);
// //     // socket.on('message', message => {
// //     //   const { messages } = this.state;
// //     //   this.setState({ messages: [...messages, message] });
// //     // });
// //   }
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       messages: [] /* List of all messages within the public lobby */,
// //       message: '' /* Current message */,
// //     };
// //   }
// //   sendMessage(message) {
// //     if (message === '') {
// //       return false;
// //     }
// //     socket.emit('message', message);
// //     this.setState({ message: '' });
// //   }
// //   render() {
// //     //const { users } = this.props;
// //     return (
// //       <div className="chat-window">
// //         {/* <ChatWindow.Users users={users} />
// //         <div className="input-container">
// //           <input
// //             type="text"
// //             onChange={e => this.setState({ message: e.target.value })}
// //             placeholder="Enter your message here..."
// //           />
// //           Send
// //         </div> */}
// //       </div>
// //     );
// //   }
// // }

// // ChatWindow.propTypes = {
// //   users: PropTypes.object,
// // };

// // export default ChatWindow;
