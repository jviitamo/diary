const posts = require('../helpers/post-functions');
const multer = require("multer");
const { Router } = require("express");
const { isLoggedIn, hasAccesstoContent } = require("../helpers/middleware")


var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, '/usr/src/app/temp_uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
  });
  
const upload = multer({ storage: storage });
const router = Router(); 

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
      if (req.query.location === null) res.json(400, {error: "Tarvitse sijainnin postauksia varten"})
      else res.json(await posts.insertPost(req.body, req.query));
    } catch (err) {
      next(err);
    }
  });
  
router.post('/upload', upload.single('file'), isLoggedIn, function(req, res) {
const file = req.file;

res.json({path: file.filename});
});

router.get('/', isLoggedIn, hasAccesstoContent, async (req, res, next) => {
  try {
      res.json(await posts.getPosts(req.query));
  } catch (err) {
      next(err);
  }
});



module.exports = router