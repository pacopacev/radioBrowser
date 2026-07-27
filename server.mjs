import express from 'express';
import { join } from 'node:path';
import { test } from './backend/test.js'
const app = express();
const port = 3000;



// Serve static files from /public
app.use(express.static(join(process.cwd(), 'public')));



// Home page
app.get('/', (req, res) => {
  const filePath = join(process.cwd(), 'index.html');
  res.sendFile(filePath);
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
  var t = new Date();
  const result = test(t);
  
  
  res.json({
    status: 'ok',
    time: result
  });
});




app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});




