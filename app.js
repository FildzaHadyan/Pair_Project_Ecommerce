const express = require("express");
const app = express();
const port = 3006;

app.use(express.urlencoded({extended:false}))
app.set("view engine", "ejs")



app.use(require("./routers"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})