const {MongoClient} = require('mongodb');

// const url = `mongodb+srv://adminDatabase:adminDatabase@cluster0.vrldz.mongodb.net/eduwork-native?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URL_1;
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect()
        console.log('Koneksi ke mongodb berhasil')
    } catch (error) {
        console.log(error)
    }
}
)();

const db = client.db('eduwork-native');

module.exports = db;