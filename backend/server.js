const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;


// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'Password_Manager';

client.connect()
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

//Get passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
});

//Save Passwords
app.post('/', async (req, res) => {
    const item = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(item);
    res.json({ success: true, result: findResult })
});


//Delete Passwords
app.delete('/', async (req, res) => {
    const item = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(item);
    res.json({ success: true, result: findResult })
});


app.listen(port, () => {
    console.log(`Application listening on port http://localhost:${port}`);
});
