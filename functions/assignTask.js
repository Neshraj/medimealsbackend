async function assignTask(task) {
    const { MongoClient } = require("mongodb");
  
    const client = new MongoClient(
      "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
    );
  
    try {
      await client.connect();
      const database = client.db("MediMeals");
      const collection = database.collection("allTaskData");
  
      const result = await collection.insertOne(task);
      console.log("Task assigned successfully");
      
      return "Task assigned successfully";
    } catch (error) {
        console.log("Error assigning task");
        
      return "Error assigning task";
    } finally {
      await client.close();
    }
  }
  
  module.exports = assignTask;
  