async function getMealData() {
  const { MongoClient } = require("mongodb");

  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );

  try {
    await client.connect();
    const database = client.db("MediMeals");
    const collection = database.collection("mealdata");
    const mealPlans = await collection.find({}).toArray();
    return mealPlans;
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    console.log("Failed to fetch meal plans");
  } finally {
    await client.close();
  }
}

module.exports = getMealData;
