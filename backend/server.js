const products = require("./data/product")
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const product = require('./data/product')
const bodyParser=require("body-parser")
const express = require("express");
const path = require('path')
//import {useNavigate} from react-router-dom;
//const navigate = useNavigate();



const cors = require('cors');
const { Router } = require("express");



//dotenv config
dotenv.config();
//connecting to mysql database
connectDb.execute('SELECT * FROM logindb')
.then(result => {
    console.log("connected to database");
  })
  .catch(err => {
    console.log(err);
  });
  
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post("/signup", (req,res) => 
{
      const emailid = req.body.email;
      const password = req.body.password;
      const Firstname = req.body.Fname;
      const Lastname = req.body.Lname;

      connectDb.execute('INSERT INTO logindb (emailid ,password, firstname,lastname) VALUES (?,?,?,?)',[emailid,password,Firstname,Lastname])
      .then(result => {
          console.log(result[0]);
          res.status(200).send("added")
        })
        .catch(err => {
          console.log(err);
        });
      
});

app.post("/login", (req,res) => 
{

      const emailid = req.body.email;
      const password = req.body.password;
      
      connectDb.execute("SELECT * From logindb WHERE emailid = ? AND password = ?",[emailid,password])
      .then(result => {
        if(result[0].length >0)
        {
          res.status(200).send("status working")
          console.log(result[0])
        }
        else
        {
          res.status(200).send("not working")
          console.log(result[0]);
        }
      })
        .catch(err => {
          console.log(err);
        });

});




app.get("/product",(req,res)=>
{
    res.json(products);
});


app.get("/product/:ids" ,(req,res) => {
    const pro = products.find((p) => p.id === req.params.ids);
    res.json(pro);

});
const PORT = 8080;
// app.listen(process.env.PORT||PORT,()=>{
//     console.log('server is running in '+ process.env.NODE_ENV + ' mode on port ' +  PORT)  ;
// });
app.listen(8080,()=>{
  console.log("its working")
});



