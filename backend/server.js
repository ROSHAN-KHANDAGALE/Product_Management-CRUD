const constants = require("./config/constants");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const cors = require("cors");
const app = express();
const productRoute = require("./routes/product.routes");

app.use(cors());
app.use(bodyParser.json());
app.use("/product", productRoute);

app.listen(PORTNO, () => {
  console.log(`The Server is started on  http://localhost:${PORTNO}`);
});
