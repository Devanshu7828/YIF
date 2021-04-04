const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, ({
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser:true
}))


const db = mongoose.connection;
  db.once("open", () => {
    console.log("Database Connected");
  }).catch((err) => {
    console.log("unbale to connect ", err);
  });

module.exports = db;