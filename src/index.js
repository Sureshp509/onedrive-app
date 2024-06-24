require('dotenv').config();
const express = require('express');
const { usersdetails, listFiles, downloadFile, listFilePermissions} = require('./onedrive');
const getAccessToken = require('./auth');

const app = express();
const port = process.env.PORT || 3000;

// Route to get the access token
app.get('/', async (req, res) => {
  try {
      const token = await getAccessToken();
      res.json({ accessToken: token });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

app.get('/users', async (req, res) => {
  try {
      const users = await usersdetails();
      res.json(users);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

app.get('/files', async (req, res) => {
    try {
        const files = await listFiles();
        res.json(files);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/files/:id/download', async (req, res) => {
    try {
        const fileStream = await downloadFile(req.params.id);
        fileStream.pipe(res);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/files/:id/permissions', async (req, res) => {
    try {
        const permissions = await listFilePermissions(req.params.id);
        res.json(permissions);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
