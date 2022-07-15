const posts = require('./post-functions');
const multer = require("multer");
const { Router } = require("express");
const middleware = require("./middleware")


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

router.post('/new-post', middleware, async (req, res, next) => {
    try {
      const location = await posts.getUserLocation(req.user)
      if (location === null) res.json(400, {error: "Tarvitse sijainnin postauksia varten"})
      else res.json(await posts.insertPost(req.body, req.user.username, location));
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
      res.json(await posts.getPosts(req.user));
  } catch (err) {
      next(err);
  }
});

router.get('/my-posts', middleware, async (req, res, next) => {
  try {
      res.json(await posts.getOwnPosts(req.user));
  } catch (err) {
      next(err);
  }
});

module.exports = router