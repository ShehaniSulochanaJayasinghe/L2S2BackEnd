const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const routesUrls =require('./routes/parent.js');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => {
  return console.log("Database connected")
});

app.use(express.json());
app.use(cors());
app.use('/parent',  routesUrls);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
console.log(process.env.DATABASE_ACCESS)




var parentRouter = require('./routes/parent.js');
app.use('/parent',parentRouter);