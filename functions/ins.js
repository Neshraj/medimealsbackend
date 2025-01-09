// const { MongoClient } = require('mongodb');

// const preData = require('./mealdata.js');

// async function insertPreData() {
//   const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db('MediMeals');
//     const collection = database.collection('mealdata');

//     const formattedData = Object.entries(preData).map(([day, meals]) => ({
//       day,
//       meals,
//     }));

//     const result = await collection.insertMany(formattedData);
//     console.log(`${result.insertedCount} documents inserted.`);
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   } finally {
//     await client.close();
//   }
// }

// module.exports = insertPreData;
