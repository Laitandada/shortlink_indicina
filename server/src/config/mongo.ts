import mongoose from "mongoose";

const DbConnection = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.DB_CLOUD_CONNECTION}`);
    console.log(
      "Connected to MongoDB"
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default DbConnection;