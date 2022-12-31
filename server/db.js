const mongoose = require("mongoose");
const mongoURI =
  "mongodb://0.0.0.0:27017/cloudnotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// const mongoURI=process.env.ATLAS

const connecttomongo = () => {
  mongoose.connect(mongoURI, { keepAlive: true }, () =>
    console.log("Connected to mongo succesfully")
  );
};

module.exports = connecttomongo;
