'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const storage = multer.memoryStorage();
const maxSize = 2097152;
const upload = multer({ storage, limits: { fileSize: maxSize } });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.json({ error: 'file upload error' });
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size })
});

app.listen(process.env.PORT || 3000, () => console.log('Node.js listening ...'));
