async function updateTask(data) {
    const {MongoClient} = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
  try {
    await client.connect();
    console.log('insiode',data);
    
    const database = client.db('MediMeals');
    const collection = database.collection('allTaskData');

    const {taskId,...updatedFields } = data;
    const result = await collection.updateOne(
      { taskId: taskId},
      { $set: updatedFields }
    );

    if (result.modifiedCount > 0) {
        console.log('Delivery Added');
      return('Delivery Added');
    }
    else{
        console.log('no change');
    }
  } catch (error) {
    console.error('Error updating patient details:', error);
    return('Error updating patient details');
  } finally {
    await client.close();
  }
}

module.exports = updateTask;

