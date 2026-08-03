import express from 'express';
import { join } from 'node:path';
import { test } from './backend/test.js'

import host from './backend/host.js';
import getByGenre from './backend/genre.js';



const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());  
app.use('/node_modules', express.static('node_modules'));


// Serve static files from /public and /static
app.use(express.static(join(process.cwd(), 'public')));
app.use('/static', express.static(join(process.cwd(), 'static')));




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
    const { server, genre } = req.body || {};

    if (!server || typeof server !== 'string' || !server.startsWith('http')) {
      return res.status(400).json({ error: 'A valid server URL is required.' });
    }

    if (!genre || typeof genre !== 'string' || genre.trim() === '') {
      return res.status(400).json({ error: 'A valid genre is required.' });
    }

    const result = await getByGenre(server, genre.trim());
    res.json({ result });
  } catch (error) {
    console.error('Error fetching genre data:', error);
    res.status(502).json({
      error: 'Failed to fetch genre data',
      details: error.message || 'Unknown error'
    });
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




function startServer(port) {
  const server = app.listen(port, '0.0.0.0');

  server.on('listening', () => {
    const address = server.address();
    const actualPort = typeof address === 'string' ? address : address.port;
    console.log(`Server running at http://0.0.0.0:${actualPort}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`Port ${port} is already in use, trying ${port + 1}...`);
      if (server.listening) {
        server.close(() => startServer(port + 1));
      } else {
        startServer(port + 1);
      }
      return;
    }

    console.error(`Unable to start server on 127.0.0.1:${port}: ${error.message}`);
    process.exit(1);
  });
}

startServer(PORT);



