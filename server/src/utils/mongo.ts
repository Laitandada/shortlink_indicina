import mongoose from "mongoose";

// Function to connect to a MongoDB database
export async function connectToMongo() {
  // Get the database connection string from environment variables
  const connString = process.env.DB_CLOUD_CONNECTION as string;

  try {
    // Attempt to connect to the MongoDB database using the connection string
    await mongoose.connect(connString);
    
    // If the connection is successful, log a message
    console.log("DB CONNECTED");
  } catch (error) {
    // If an error occurs during connection, log the error and exit the process
    console.error(error);
    process.exit(1);
  }
}
