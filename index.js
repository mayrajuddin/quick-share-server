const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Quick Share Server')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oejruqx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const usersCollection = client.db("quickShare").collection("users");
        const postsCollection = client.db("quickShare").collection("posts");
        // insert user
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        // save post to db
        app.post('/posts', async (req, res) => {
            const post = req.body
            const result = await postsCollection.insertOne(post)
            res.send(result)
        })
    }
    finally { }
}
run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`quick share server running on  ${port}`);
})