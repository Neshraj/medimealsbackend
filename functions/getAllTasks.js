async function getAllTasks() {
    const { MongoClient } = require("mongodb");
  
    const client = new MongoClient(
      "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
    );
  
    try {
      await client.connect();
      const database = client.db("MediMeals");
      const collection = database.collection("allTaskData");
  
      const tasks = await collection.find({}).toArray();
      console.log("All tasks retrieved successfully");
      
      return tasks;
    } catch (error) {
      console.log("Error retrieving all tasks");
      return [];
    } finally {
      await client.close();
    }
  }
  
  module.exports = getAllTasks;
  