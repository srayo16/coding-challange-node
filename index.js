const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mkemw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db("code-challenge").collection("todo");
        const inProgressDatabase = client.db("code-challenge").collection("progress");
        const inDoneDatabase = client.db("code-challenge").collection("done");

        app.get('/todo', async (req, res) => {
            const query = {};
            const result = await database.find(query).toArray();
            res.send(result);
        })
        app.post('/postdata', async (req, res) => {
            const query = req.body;
            const result = await database.insertOne(query);
            res.send(result);
        })
        app.post('/inprogress', async (req, res) => {
            const query = req.body;
            const result = await inProgressDatabase.insertOne(query);
            res.send(result);
        })
        app.post('/indone', async (req, res) => {
            const query = req.body;
            const result = await inDoneDatabase.insertOne(query);
            res.send(result);
        })
        app.get('/displayprogress', async (req, res) => {
            const query = {};
            const result = await inProgressDatabase.find(query).toArray();
            res.send(result);
        })
        app.get('/displaydone', async (req, res) => {
            const query = {};
            const result = await inDoneDatabase.find(query).toArray();
            res.send(result);
        })



    } finally {

    }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('Alhamdulillah, server is running!')
})

app.listen(port, () => {
    console.log('listening to port', port)
})