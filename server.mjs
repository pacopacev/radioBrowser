import express from 'express';
import { join } from 'node:path';
import { test } from './backend/test.js'

import host from './backend/host.js';
import getByGenre from './backend/genre.js';



const app = express();
const port = 3000;
app.use(express.json());


// Serve static files from /public
app.use(express.static(join(process.cwd(), 'public')));



// Home page
app.get('/', (req, res) => {
  
  const filePath = join(process.cwd(), 'index.html');
  
  res.sendFile(filePath);
  
  
});

app.get('/api/host', async (req, res) => {
  const result = await host();   // host() is async
  res.json({ result });
});

app.post('/api/genre', async (req, res) => {
  try {
    const { server, genre } = req.body;  // Get genre from request body

    // console.log('Received - Server:', server);
    // console.log('Received - Genre:', genre);

    const result = await getByGenre(server, genre);  // Await the async function
    res.json({ result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch genre data' });
  }
});

// About page
app.get('/about', (req, res) => {
  res.send('About page');
});
// Contact page
app.get('/contact', (req, res) => {
  res.send('Contact page');
});

app.get('/status', (req, res) => {
  const filePath = join(process.cwd(), 'status.html');
  res.sendFile(filePath);
});

app.get('/api/status', (req, res) => {
  // var t = new Date();
  // const result = test(t);
  
  
  // res.json({
  //   status: 'ok',
  //   time: result
  // });
});




const server = app.listen(port, '127.0.0.1');

server.on('listening', () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});

server.on('error', (error) => {
  console.error(`Unable to start server on 127.0.0.1:${port}: ${error.message}`);
  process.exitCode = 1;
});



