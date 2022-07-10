const posts = require('./post-functions');
const multer = require("multer");
const { Router } = require("express");
const middleware = require("./middleware")


var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, '../frontend/public/photos');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
  });
  
const upload = multer({ storage: storage });
const router = Router(); 

router.post('/new-post', middleware, async (req, res, next) => {
    try {
      res.json(await posts.insertPost(req.body));
    } catch (err) {
      next(err);
    }
  });
  
router.post('/upload', upload.single('file'), middleware, function(req, res) {
const file = req.file;

res.json({path: file.filename});
});

router.get('/all', middleware, async (req, res, next) => {
try {
    res.json(await posts.getPosts());
} catch (err) {
    next(err);
}
});

module.exports = router