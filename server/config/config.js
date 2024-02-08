const mongoose = require('mongoose');
require('colors')

connectDB().catch(err => console.log(`Error : ${err.message}`.bgRed.white));
connectDB().then((conn) => console.log(`mongodb connected successfully...`.bgCyan.white));


async function connectDB() {
  const url = process.env.MONGO_URL
  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectDB