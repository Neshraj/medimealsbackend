const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

const login = require('./functions/login');
const getAllPatientDetails = require('./functions/getPatientData');
const updatePatientDetail = require('./functions/updatePatientdata');
const getMealPlans = require('./functions/getMealData');
const updateMealData = require('./functions/updateMealData');  

app.use(cors());
app.use(express.json());
app.post('/login', (req, res) => {
  async function log() {
    const receivedData = req.body;
    if (!receivedData) {
      return res.status(400).json({ message: 'No data received' });
    }
    let logres = await login(receivedData);
    res.json({ message: logres });

  }

  log();
});


app.get("/getpatientsdetails", (req, res) => {
    async function getdata() {
        const receivedData = req.body;
        const patientsData = await getAllPatientDetails(receivedData);
        res.json(patientsData);
    }
    getdata();
  });

app.put('/updatepatientdetail',(req, res) => {
    const patientdata = req.body;
    
    async function update() {
        const response = await updatePatientDetail(patientdata);
        res.json({message:response});
    }
    update();
  });

app.get('/mealdata', async (req, res) => {
    async function getdata() {
        const response = await getMealPlans();
        res.json(response);
    }
    getdata();
});

app.put("/updatemealplane", async (req, res) => {
    const mealdata = req.body;
    async function update() {
        const response = await updateMealData(mealdata);
        res.json({ message: response });
    }
    update();
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
