async function getPantryStafdetails() {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );
  try {
    await client.connect();
    const database = client.db("MediMeals");
    const collection = database.collection("pantry_details");
    const pantryStaff = await collection.find({}).toArray();
    return pantryStaff;
  } catch (error) {
    console.error("Error fetching pantry staff:", error);
    return "Failed to fetch pantry staff";
  } finally {
    await client.close();
  }
}

module.exports = getPantryStafdetails;
