const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

const login = require('./functions/login');

// Middleware
app.use(cors());
app.use(express.json());  // Add this line to parse incoming JSON data

app.post('/login', (req, res) => {
  async function log() {
    const receivedData = req.body;  // Now this will contain the parsed body
    if (!receivedData) {
      return res.status(400).json({ message: 'No data received' });
    }

    let { email, password } = receivedData;
    console.log('Received data:', email, password);
    
    let logres = await login(receivedData);
    res.json({ message: logres });

  }

  log();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
