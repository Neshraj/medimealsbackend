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
const getPantryStafdetails = require('./functions/getPantryStafdetails'); 
const updatePantryStaffData = require('./functions/updatePantryStaffData');  
const removePantryStaff = require('./functions/removePantryStaff');
const assignTask = require('./functions/assignTask');   
const getTasks = require('./functions/getTasks'); 
const getAllTasks = require('./functions/getAllTasks');  

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

app.get("/getpantrystaffdata", async (req, res) => {

    async function getdata(){
        const response = await getPantryStafdetails();
        res.json(response);
    }
    getdata();

});

app.post("/pantry-staff", async (req, res) => {
    const staffdata = req.body;
    async function update() {
        const response = await updatePantryStaffData(staffdata);
        res.json({message:response});
    }
    update();
});

app.delete('/removepantrystaff', async (req, res) => {
    const staffdata = req.body;
    async function remove() {
        const response = await removePantryStaff(staffdata);
        res.json({message:response});
    }
    remove();
});

app.post("/assignTask", async (req, res) => {
    const task = req.body;
    async function assign() {
        const response = await assignTask(task);
        res.json({ message: response });
    }
    assign();
});

app.post("/getTasks", async (req, res) => {
    const {email} = req.body;
    async function getTask() {
        const response = await getTasks(email);
        res.json(response);
    }
    getTask();
});

app.get("/getAllTasks", async (req, res) => {
    async function getTask() {
        const response = await getAllTasks();
        res.json(response);
    }
    getTask();
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
