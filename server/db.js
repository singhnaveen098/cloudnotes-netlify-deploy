const mongoose = require("mongoose");
const mongoURI=process.env.ATLAS

const connecttomongo = () => {
  mongoose.connect(mongoURI, { keepAlive: true }, () =>
    console.log("Connected to mongo succesfully")
  );
};

module.exports = connecttomongo;
