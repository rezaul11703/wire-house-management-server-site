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

      const itemsInfo= client.db("ManageItems").collection('ALL Inventories')
      const homeProductInfo= client.db("ManageItems").collection('dashboardProduct')
        app.post('/addedItems',async(req,res)=>{
          const newItem= req.body
          const result= await itemsInfo.insertOne(newItem)
          console.log(result)
          res.send(result)
        })
        app.post('/displayProduct', async(req,res)=>{
          const itemNumber= req.body
          const result=await homeProductInfo.insertOne(itemNumber)
          res.send(result)
        })
        app.get('/displayProduct',async(req,res)=>{
          const query={}
          const cursor=homeProductInfo.find(query)
          const users= await cursor.limit(6).toArray()
          res.send(users)
        })
        ///For Getting New Items
        app.get('/addedItems',async(req,res)=>{
          const query={}
          const cursor=itemsInfo.find(query)
          const users= await cursor.toArray()
          res.send(users)
        })
        app.get('/smartmonitor', async(req,res)=>{
          const query={catagory:"Smart TV"}
          const cursor=itemsInfo.find(query)
          const users=await cursor.toArray()
          res.send(users)
            })
            app.get('/smartwatch', async(req,res)=>{
              const query={catagory:"Smart Watch"}
              const cursor=itemsInfo.find(query)
              const users=await cursor.toArray()
              res.send(users)
                })
               
        app.get('/inventory/:id',async(req,res)=>{
          const id=req.params.id
          const query={_id:ObjectId(id)}
          const result= await homeProductInfo.findOne(query)
          res.send(result)
    })
    app.put('/inventory/:id', async(req,res)=>{
      const id=req.params.id
      const updatedUser=req.body
      const  query={_id:ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity:updatedUser.finalUser,
        },
      };
      const result = await homeProductInfo.updateOne(query,updateDoc,options)
      res.send(result)
    })
        app.delete('/inventory/:id',async(req,res)=>{
          const id=req.params.id
          const query={_id:ObjectId(id)}
          const result= await itemsInfo.deleteOne(query)
          res.send(result)
    })
  }
    finally{

    }
}
run().catch(console.dir)

