const express = require("express"),
  path = require("path"),
  app = express();


// app.get("/",(req,res)=>{
//   res.sendFile(path.join(__dirname,"src",'framed.html'));
// })
// app.use("/wps/PA_PAhorizationStatus/PriorAuthProxy/",express.static('dist'));

app.get("/framed",(req,res)=>{
    res.sendFile(path.join(__dirname,"src",'framed.html'));
})
app.use("/",express.static('dist'));

app.listen(8089);
