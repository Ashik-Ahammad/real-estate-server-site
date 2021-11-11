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
        const database = client.db('united_property');
        const homeProductCollection = database.collection('homeProducts');
        const allProductCollection = database.collection('allProducts');

        //GET HOME PRODUCTS
        app.get('/homeProducts', async (req, res) => {
            const cursor = homeProductCollection.find({});
            const homeProducts = await cursor.toArray();
            res.send(homeProducts)
        })

        app.get('/allProducts', async (req, res) => {
            const cursor = allProductCollection.find({});
            const allProducts = await cursor.toArray();
            res.send(allProducts)
        })
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