const express = require('express');
const posts = require('./posts');
let cors = require("cors");
const multer = require("multer");

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, '../frontend/public/');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.json({message: 'alive'});
})

app.post('/api/posts/new-post', async (req, res, next) => {
  try {
    res.json(await posts.insertPost(req.body));
  } catch (err) {
    next(err);
  }
});

app.post('/api/upload', upload.single('file'), function(req, res) {
  const title = req.body.title;
  const file = req.file;

  console.log(title);
  console.log(file);
  console.log(file.path);

  res.json({path: file.filename});
});

app.get('/api/posts/all', async (req, res, next) => {
  try {
    res.json(await posts.getPosts());
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Example API listening at http://localhost:${port}`)
});