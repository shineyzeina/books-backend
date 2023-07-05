const config = require("./config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
// Connection URL and database name
const url = "mongodb://localhost:27017";
const dbName = "your_database_name";

// Field names to remove
const fieldsToRemove = ["picture", "age"];

// Connect to the MongoDB server
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Get the default connection
const db = mongoose.connection;

// Handle connection error
db.on("error", (err) => {
  console.error("Failed to connect to the database:", err);
});

// Handle connection success
db.once("open", () => {
  console.log("Connected successfully to the database");

  // Get the Author model
  const Author = require("./authors/author.model");

  // Update documents to remove the specified fields
  Author.updateMany({}, { $unset: { picture: 1, age: 1 } }, (err, result) => {
    if (err) {
      console.error("Failed to update documents:", err);
    } else {
      console.log(result);
      console.log(`${result.nModified} documents updated successfully`);
    }

    // Close the MongoDB connection
    mongoose.connection.close();
  });
});
