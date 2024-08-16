const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 8000;

// middle-wares 
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ylmjbhk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


//https://refurbished-mobile-server.vercel.app/ 
async function run() {
  try {
    const database = client.db("Refurbished");
    const productsCol = database.collection("products");

    // All products get
    app.get('/products', async(req, res)=>{

      try {
        const result = await productsCol.find().toArray();
        res.status(200).send({
            success: true,
            message: 'Products retrieved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to retrieve products',
            error: error.message
        });
    }   

    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Refurbished product server is running !! ");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
