async function updateDeliveryStaffData(staffdata) {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );

  try {
    const newStaff = staffdata;
    await client.connect();
    const database = client.db("MediMeals");
    const collection = database.collection("delivery_details");

    const result = await collection.insertOne(newStaff);
    return "Staff added successfully";
  } catch (error) {
    console.error("Error adding pantry staff:", error);
    return "Failed to add pantry staff";
  } finally {
    await client.close();
  }
}

module.exports = updateDeliveryStaffData;
