const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  DeliveryAddress: {
    Address: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      default: "India",
    },
    Pincode: {
      type: Number,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      maxlength: 10,
      required: true,
    },
  },
  OrderDetails: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      quantity:{
        type:Number,
        default:1
      },

      Fproduct: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true,
      },
    },
  ],
  PaymentDetails: {
    pid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  orderedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  Fuser: {
    type: mongoose.Schema.ObjectId, //join
    ref: "User", //this user is name of userschema collection
    // required: true
  },

  itemPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  DeliveredAt: {
    type: Date,
    // default:Date.now()
  },
});

module.exports = mongoose.model("Order", OrderSchema);
