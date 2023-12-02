// const Message = require('../models/message.model');

// module.exports = function (io) {
//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         socket.on('message', (data) => {
//             const message = new Message({
//                 content: data.message,
//                 sender: data.sender,
//                 receiver: data.receiver,
//             });

//             message.save()
//                 .then(() => {
//                     io.emit('message', data);
//                 })
//                 .catch(err => console.error(err));
//         });
//     });
// };
