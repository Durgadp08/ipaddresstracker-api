const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http')
const app = express();

app.use(cors());
app.use(bodyParser.json());
let ip = null;
app.get("/", (req, res) => {
   if(ip===null){
    ip=req.headers('x-forwarded-for')|| req.socket.remoteAddress;
  }
  http.get(`http://ip-api.com/json/${ip}`,response=>{
    response.on('data',data=>{
      res.json(JSON.parse(data))
    })
    response.on('error',err=>{
      console.error(err);
    })
  })
});

app.post("/", (req, res) => {
  const data = req.body;
  console.log(data)
  ip=data.input;
  res.redirect('/')
});

app.listen(process.env.PORT||5000, () => {
  console.log("Server Started at port 5000");
});
