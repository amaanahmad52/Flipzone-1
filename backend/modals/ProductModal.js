const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Please Provide a name"],
    trim: true, //this will remove whitespaces
  },

  description: {
    type: String,
    required: [true, "Please Provide Description of Product"],
  },

  rating: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, "Please Provide Price"],
    maxLength: [8, "Price can`t be more than 8 figured"],
  },

  images: [
    //array because mulltiple images will we there
    {
      //we will host image on cloudnary, which will provide a url and a public id
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Provide a product category"],
  },

  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews:[
    {
      Fuser:{
        type: mongoose.Schema.ObjectId,        //its a foreign key which will take reference from user id 
        ref: 'User',   //this user is name of userschema collection
        // required: true
       },
        name:{
            type:String,
            required:[true,"Please Provide Your Name to give review"]
        },
        comment:{
            type:String,
            minLength:1
        },
        rating:{
            type:Number,
            required:true
        }

    }
  ],
  Fuser:{
    type: mongoose.Schema.ObjectId,       //join of 2 schemas 
    ref: 'User',   //this user is name of userschema collection
    // required: true
   },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports=mongoose.model("product",ProductSchema)