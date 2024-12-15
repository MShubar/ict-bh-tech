const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shopdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String
})

const Product = mongoose.model('Product', ProductSchema)

// API Endpoints
app.get('/api/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.json(newProduct)
})

app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: 'Product deleted' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
