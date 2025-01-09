
async function updatePatientDetail(patientData) {
    const { MongoClient, ObjectId } = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
  try {
    await client.connect();
    const database = client.db('MediMeals');
    const collection = database.collection('allPatientDetails');

    const {admitionno,_id, ...updatedFields } = patientData;
    const result = await collection.updateOne(
      { admitionno: admitionno},
      { $set: updatedFields }
    );

    if (result.modifiedCount > 0) {
        console.log('Patient details updated successfully');
      return('Patient details updated successfully');
      
    } else {
      console.log('Patient not found or no changes made');
      return('No changes made');
    }
  } catch (error) {
    console.error('Error updating patient details:', error);
    return('Error updating patient details');
  } finally {
    await client.close();
  }
}

module.exports = updatePatientDetail;

