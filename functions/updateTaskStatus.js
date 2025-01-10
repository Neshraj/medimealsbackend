async function updateTaskStatus(data) {
  const { MongoClient, ObjectId } = require("mongodb");

  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );

  try {
    await client.connect();
    const database = client.db("MediMeals");
    const collection = database.collection("allTaskData");

    let { taskId, newStatus } = data;

    const result = await collection.updateOne(
      { taskId: taskId },
      { $set: { status: newStatus } }
    );
    console.log(result);

    if (result.modifiedCount > 0) {
      console.log("Task status updated successfully");

      return "Task status updated successfully";
    } else {
      return "Task not found or no change in status";
    }
  } catch (error) {
    return "Error updating task status";
  } finally {
    await client.close();
  }
}

module.exports = updateTaskStatus;
