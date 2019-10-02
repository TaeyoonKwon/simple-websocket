const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })

    socket.on('send-message', message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        });
    })
})