const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  clientName: {
    type: String,
    required: true,
  },
  salePerson : {
    type: String,
    required: true,
  },
  order: {
    type: Array,
    required:true
  },
  total: {
    type: Number,
    required: true
  },
  time: {
  type:String,
  required: true}
});

module.exports = model("Order", OrderSchema);