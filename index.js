const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
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
        const purchaseCollection = database.collection('purchaseList');
        const reviewCollection = database.collection('reviews');




        //GET HOME PRODUCTS
        app.get('/homeProducts', async (req, res) => {
            const cursor = homeProductCollection.find({});
            const homeProducts = await cursor.toArray();
            res.send(homeProducts)
        })

        //GET ALL PRODUCTS                              
        app.get('/allProducts', async (req, res) => {
            const cursor = allProductCollection.find({});
            const allProducts = await cursor.toArray();
            res.send(allProducts)
        })

        // GET PURCHASELIST
        app.get('/purchaseList', async (req, res) => {
            const cursor = purchaseCollection.find({});
            const purchaseList = await cursor.toArray();
            res.send(purchaseList);
        })




        // GET REVIEWS
        app.get('/reviews', async (req, res) => {
            const cursor = reviewCollection.find({});
            const review = await cursor.toArray();
            res.send(review);
        })




        //POST PURCHASE
        app.post('/purchaseList', async (req, res) => {
            const purchase = req.body;
            console.log('Purchase post hitted', purchase);
            const result = await purchaseCollection.insertOne(purchase);
            console.log(result);
            res.json(result);
        })


        // POST REVIEW
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            console.log('Review hitted', review);
            const result = await reviewCollection.insertOne(review);
            console.log(result);
            res.json(result);
        })

        // POST ALL TO PRODUCTS
        app.post('/allProducts', async (req, res) => {
            const allProduct = req.body;
            console.log('All P hitted', allProduct);
            const result = await allProductCollection.insertOne(allProduct);
            console.log(result);
            res.json(result);
        })
    }
    finally {
        //await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Hello unp!')
})

app.listen(port, () => {
    console.log(`Listening to UnitedP Server at ${port}`)
})