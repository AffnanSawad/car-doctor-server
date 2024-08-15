const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000 ;

// dotENV
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.db_user)
// console.log(process.env.db_pass)


// mongoDB copy 

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@atlascluster.5qhzsjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// imp
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// root
app.get('/',(req,res)=>{

    res.send('Car-Doctor Running');
}  )

app.listen(port,()=>{

    console.log(`Car-Doctor Server Is Running : ${port}`);
})