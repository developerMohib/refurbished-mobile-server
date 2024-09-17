const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ylmjbhk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("Refurbished");
    const productsCol = database.collection("products");

    // Route to get products with filtering, sorting, and pagination
    app.get("/products", async (req, res) => {
      try {
        const {sort, productName, category = '', brand, price } = req?.query;
console.log('productName 30', productName)
        // Pagination query
        const page = parseInt(req?.query?.page) || 1;
        const size = parseInt(req?.query?.size) || 8;
        const offset = (page - 1) * size;

        let sortOption = {};
        let query = {};

        // Filter products
        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (price) query.price = { $lte: Number(price) };

        // Search Product
        if (productName) {
          query.productName = { $regex: productName, $options: "i" };
        }

        // Sorting
        if (sort === "lowhigh") {
          sortOption.price = 1; // Ascending order
        } else if (sort === "highlow") {
          sortOption.price = -1; // Descending order
        } else if (sort === "newest") {
          sortOption.productCreationDateTime = -1;
        }
        // Fetch products
        const products = await productsCol
          .find(query)
          .sort(sortOption)
          .skip(offset)
          .limit(size)
          .toArray();
          res.json(products);

      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to retrieve products",
          error: error.message,
        });
      }
    });

    app.get('/new-phone', async (req, res) =>{
      const data = req.query ;
      console.log('77 data', data)
      try {
        const result = await productsCol.find().toArray();
        res.send(result)

      } catch (error) {
        res.status(500).send({
          success : false,
          message : "Failed to retrive products",
          error : error.message
        })
      }
    })

    // Route to get the total product count
    app.get("/productCount", async (req, res) => {
      try {
        const count = await productsCol.estimatedDocumentCount();
        res.send({ count });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to retrieve product count",
          error: error.message,
        });
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("refurbished product server is running!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
