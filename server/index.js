const express = require('express');
const cors = require("cors");
const UserRouter = require("./auth")
const PostRouter = require("./posts")
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/users", UserRouter) 
app.use("/posts", PostRouter)


app.get('/', (req, res) => {
  res.json({message: 'alive'});
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Example API listening at http://localhost:${port}`)
});
