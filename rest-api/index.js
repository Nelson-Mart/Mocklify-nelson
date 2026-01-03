const express = require('express');
const productsRoutes = require("./routes/products.routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
