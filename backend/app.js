const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require("./router/routes")
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/", mainRouter)


app.listen(2002)