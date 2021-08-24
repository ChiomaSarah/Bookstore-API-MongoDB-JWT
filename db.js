// const mongoose = require("mongoose");
// const mongoose = require("mongoose");

// require("dotenv").config();

// const url = process.env.MONGODB_URI;

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

// mongoose.connection.on("error", (e) => {
//   console.error("Error connecting to MongoDB", e.message);
// });


// ============================================================================

require("dotenv").config();

const url = process.env.MONGODB_URI;
const express = require("express")
const mongoose = require("mongoose") // new

// Connect to MongoDB database
mongoose
	.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } 
  )
	.then(() => {
		const app = express()

		
			console.log("Connected to MongoDB")
		})
	