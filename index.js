const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000 ;

// dotENV
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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


     //services
    const database = client.db("carDoctor");
    const serviceCollection = database.collection("services");
      
    //booking/checkout
    const database2 = client.db("carDoctor");
    const bookingsCollection = database2.collection("bookings");

   
    // get
    app.get('/services',async (req,res)=>{

        const cursor = serviceCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    } )


    // checkout
    app.get('/services/:id',async(req,res)=>{

       
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const options = {
            
            // Include only the `title` and `imdb` fields in the returned document
            projection: {  title: 1, price: 1 , service_id: 1 },
          };


        const result = await serviceCollection.findOne(query,options);
        res.send(result);
   

    } )

    // bookings
    app.post('/bookings', async(req,res)=>{

       
        const bookings = req.body;
        console.log(bookings);

        const result = await bookingsCollection.insertOne(bookings);

        res.send(result);



    } )





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