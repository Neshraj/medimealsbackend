const { MongoClient } = require("mongodb");

async function login(data) {
  const client = new MongoClient(
    "mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority"
  );

  try {
    await client.connect();
    const database = client.db("MediMeals");
    const collection1 = database.collection("manager_details");
    const collection2 = database.collection("pantry_details");
    const collection3 = database.collection("delivery_details");

    const { email, password } = data;

    console.log(email, password);

    const userInCollection1 = await collection1.findOne({ email, password });
    if (userInCollection1) {
      return "Login success for manager";
    }

    const userInCollection2 = await collection2.findOne({ email, password });
    if (userInCollection2) {
      return "Login success for pantry";
    }

    const userInCollection3 = await collection3.findOne({ email, password });
    if (userInCollection3) {
      return "Login success for delivery";
    }

    return "User not found";
  } catch (error) {
    return "There is a problem in logging in. Try again later";
  } finally {
    await client.close();
  }
}

module.exports = login;
