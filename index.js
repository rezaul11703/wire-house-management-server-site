const express = require('express');
const cors = require('cors');
const { get } = require('express/lib/response');
require('dotenv').config()
const port = process.env.PORT||5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const ObjectId = require('mongodb').ObjectId;
//midware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wyjle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
      client.connect()
      //testing
app.get('/', (req,res)=>{
  res.send('Smart Inventory management product Created')
})

app.listen(port, ()=>{
  console.log('The Server is running on port no.', port)
})

}
    finally{

    }
}
run().catch(console.dir)

