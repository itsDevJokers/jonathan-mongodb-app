const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://adminDatabase:adminDatabase@cluster0.vrldz.mongodb.net/eduwork-mongoose?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Server database terhubung'));