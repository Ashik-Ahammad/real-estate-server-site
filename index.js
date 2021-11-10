const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xd7k8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log('DB connected successfully')
    }
    finally {
        //await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Hello up!')
})

app.listen(port, () => {
    console.log(`Listening to UnitedP Server at ${port}`)
})