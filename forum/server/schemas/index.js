const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      'mongodb+srv://root:1234@logindb.xsreo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      //최종적으로 사용할 데이터베이스의 주소로 교체해주면 된다.
      {
        dbName: "webDB"
      },
      error => {
        if (error) {
          console.log("MongoDB connection error", error);
        } else {
          console.log("MongoDB connection success");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.log("mongoDB connection error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB connection is closed, retrying...");
    connect();
  });
  require("./user");
  require("./board");
};
