const express = require('express')
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Nayana:3kvhVbRGZHrAXBl8@cluster0.7vy2lxj.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true})
.then(() => console.log('Connected!'))
 


const product = new Schema({
  title:String,
  body:String,
  photo_url:String,
  price:Number,
  stock:Number
})


const Product = mongoose.model("Product", product);



app.set("view engine",'ejs')
app.set("views",path.join(__dirname,"view"))


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get("/",async (req,res)=>{

  const products = await Product.find({});
  res.render('index',{products})
})


app.get("/add_data",(req,res)=>{
  res.render('add')
})

app.post("/add_data",async (req,res)=>{

  let newProduct = new Product(req.body.superMart);
  newProduct.photo_url = "https://www.pngitem.com/pimgs/m/364-3641594_shopping-cart-clipart-black-and-white-shopping-trolley.png"
  await newProduct.save()
  res.redirect('/')
})

app.get("/delete/:id",async(req,res)=>{
  const { id } = req.params
  await Product.findByIdAndDelete(id);
  res.redirect('/')
})

app.listen(3000,()=>{
  console.log("Server connected")
})

