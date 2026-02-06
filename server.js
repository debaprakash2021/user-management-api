import app from "./app.js"
const PORT = process.env.PORT || 3009;

app.listen(PORT,(err,data)=>{
   console.log("server running on port",PORT)
})