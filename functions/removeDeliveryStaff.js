async function removeDeliveryStaff(staffdata) {
    const { MongoClient } = require("mongodb");
    const client = new MongoClient("mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority");
  
    try {
      const { email } = staffdata;  // Assuming staffdata contains the _id of the staff to be removed
      await client.connect();
      const database = client.db("MediMeals");
      const collection = database.collection("delivery_details");
  
      // Remove the staff document by _id
      const result = await collection.deleteOne({ email });
  
      if (result.deletedCount === 1) {
        return "Staff removed successfully";
      } else {
        return "Staff not found";
      }
    } catch (error) {
      console.error("Error removing pantry staff:", error);
      return "Failed to remove pantry staff";
    } finally {
      await client.close();
    }
  }


module.exports = removeDeliveryStaff; 