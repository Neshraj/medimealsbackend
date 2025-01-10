async function getDeliveryStaffAllTasks(email){
    const { MongoClient } = require("mongodb");

  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );

  try {
    await client.connect();
    const database = client.db("MediMeals");
    const collection = database.collection("allTaskData");

    const tasks = await collection.find({ deliveryId: email }).toArray();
    console.log("Tasks retrieved successfully");
    console.log(email);
    
    
    return tasks;
  } catch (error) {
    console.log("Error retrieving tasks"); 
    return [];
  } finally {
    await client.close();
  }
}

module.exports = getDeliveryStaffAllTasks; 