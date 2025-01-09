async function updateMealData(mealdata) {
  const { MongoClient } = require("mongodb");

  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );

  try {
    await client.connect();
    const database = client.db("MediMeals");
    const collection = database.collection("mealdata");

    const { day, meals } = mealdata;

    const result = await collection.updateOne(
      { day },
      { $set: { meals } },
      { upsert: true }
    );
    return "Meal plan updated successfully";
    
  } catch (error) {
    return "Error updating meal plan:";
  } finally {
    await client.close();
  }
}

module.exports = updateMealData;