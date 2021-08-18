const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const seatSchema = new Schema({
   seatNo: {
        type:String
   },
   seatNoNum:{
        type: Number
   },
   isAvailable:{
        type:Boolean
   },
   userId:{
         type:String
   },
   endTime:{
          type: Date
   }
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = { Seat };
