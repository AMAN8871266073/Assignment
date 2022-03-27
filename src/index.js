const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const route = require("./routes/route")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',route)

mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/TANDON-DB?retryWrites=true&w=majority",
{UseNewUrlParser:true})
.then(()=>console.log("mongoose is connected and running"))
.catch((err)=>console.log(err))

app.listen(process.env.PORT || 3000,function(){
    console.log("express is running on port:"+(process.env.PORT||3000))
})

