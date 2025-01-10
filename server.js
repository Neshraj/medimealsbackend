const express = require('express');
const http = require('http'); // Required to integrate with socket.io
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Importing functions
const login = require('./functions/login');
const getAllPatientDetails = require('./functions/getPatientData');
const updatePatientDetail = require('./functions/updatePatientdata');
const getMealPlans = require('./functions/getMealData');
const updateMealData = require('./functions/updateMealData');
const getPantryStafdetails = require('./functions/getPantryStafdetails');
const getDeliveryStafdetails = require('./functions/getDeliveryStafdetails');
const updatePantryStaffData = require('./functions/updatePantryStaffData');
const updateDeliveryStaffData = require('./functions/updateDeliveryStaffData')
const removePantryStaff = require('./functions/removePantryStaff');
const removeDeliveryStaff = require('./functions/removeDeliveryStaff');
const assignTask = require('./functions/assignTask');
const getTasks = require('./functions/getTasks');
const getAllTasks = require('./functions/getAllTasks');
const updateTaskStatus = require('./functions/updateTaskStatus');
const updateTask = require('./functions/updateTask');
const getDeliveryStaffAllTasks = require('./functions/getDeliveryStaffAllTasks');
const { log } = require('console');

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// WebSocket connection
io.on('connection', (socket) => {

  socket.on('disconnect', () => {
  });
});

// Routes
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

app.put('/updatepatientdetail', (req, res) => {
  const patientdata = req.body;
  async function update() {
    const response = await updatePatientDetail(patientdata);
    res.json({ message: response });
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
  async function getdata() {
    const response = await getPantryStafdetails();
    res.json(response);
  }
  getdata();
});

app.get("/getdeliverystaffdata", async (req, res) => {
  async function getdata() {
    const response = await getDeliveryStafdetails();
    res.json(response);
  }
  getdata();
});

app.post("/pantry-staff", async (req, res) => {
  const staffdata = req.body;
  async function update() {
    const response = await updatePantryStaffData(staffdata);
    res.json({ message: response });
  }
  update();
});

app.post("/add-deliver-staff", async (req, res) => {
  const staffdata = req.body;
  async function update() {
    const response = await updateDeliveryStaffData(staffdata);
    res.json({ message: response });
  }
  update();
});

app.delete('/removepantrystaff', async (req, res) => {
  const staffdata = req.body;
  async function remove() {
    const response = await removePantryStaff(staffdata);
    res.json({ message: response });
  }
  remove();
});

app.delete('/removedeliverystaff', async (req, res) => {
  const staffdata = req.body;
  async function remove() {
    const response = await removeDeliveryStaff(staffdata);
    res.json({ message: response });
  }
  remove();
});

app.post("/assignTask", async (req, res) => {
  const task = req.body;
  async function assign() {
    const response = await assignTask(task);
    io.emit('taskUpdated', task); // Notify all connected clients
    res.json({ message: response });
  }
  assign();
});

app.post("/getTasks", async (req, res) => {
  const { email } = req.body;
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

app.post("/updateTaskStatus", async (req, res) => {
  const task = req.body;
  async function update() {
    const response = await updateTaskStatus(task);
    if (response) {
      io.emit('taskUpdated', task); // Notify all connected clients
      res.json({ message: response });
    } else {
      res.status(400).json({ message: "Failed to update task" });
    }
  }
  update();
});

app.post("/updateTask", async (req, res) => {
  const task = req.body;
  //console.log('sdfjcvbgjivg',task);
  async function update() {
    const response = await updateTask(task);
    if (response) {
      
      io.emit('taskUpdated', task); 
      console.log(response);
      res.json({ message: response });

    }
  }
  update();
});

app.post("/getDeliveryStaffAllTasks", async (req, res) => {
  const { email } = req.body;
  async function getTask() {
    const response = await getDeliveryStaffAllTasks(email);
    
    res.json(response);
  }
  getTask();
});


// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
