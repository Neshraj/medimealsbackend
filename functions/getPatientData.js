const { MongoClient } = require('mongodb');

async function getAllPatientDetails() {
  const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');

  try {
    await client.connect();
    const database = client.db('MediMeals');
    const collection = database.collection('allPatientDetails');
    const allPatientDetails = await collection.find({}).toArray();   
    return allPatientDetails;

  } catch (error) {
    console.error('Error fetching patient details:', error);
    return 'There is a problem fetching patient details. Try again later.';
  } finally {
    await client.close();
  }
}

module.exports = getAllPatientDetails;
