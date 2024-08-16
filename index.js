const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Refurbished product server is running !! ");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
