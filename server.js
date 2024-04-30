require('dotenv').config();
const express = require('express');
const morgan= require('morgan');
require('./models/connections')
const cors = require('cors')
const ApparelRouter = require('./controllers/apparel')
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const app = express();

//user schema. 
//Users to signup and login
const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
  });
  
  const User = mongoose.model("User", userSchema);

///MIDDLEWARE

const authCheck = async (req, res, next) => {
    //look for a token on the request headers
    //it should be from Authorization
    //there should be Bearer <space> <token> hence the split
    //[1] is the token ([0] is the word 'Bearer');
    // put the token in variable form
    const token = req.header('Authorization')?.split(' ')[1];
  
    //if no token return a 401 with unauthorized message
    if (!token) {
      return res.status(401).json({ message: 'unauthorized' })
    }
  
    try {
      //decode the token to see if it is value
      const decoded = await jwt.verify(token, process.env.SECRET);
      console.log(decoded);
      //attach username to EVERY request
      req.username = decoded.userId;
  
      //proceed or move to the next middleware
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden' })
    }
  }



app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


//ROUTES
//signing up 
app.post("/signup", async (req, res) => {
    try {
      //destructure the request. Every request has a body with a property called username and password (see the schema)
      let { username, password } = req.body;
      //hash password. EG if password is 123, this will ensure that 123 is NOT save in the db. its going to save a hashed version of 123 using our encryption package
      password = await bcrypt.hash(password, await bcrypt.genSalt(10));
      //create the user
      const user = await User.create({ username, password })
  
      res.json(user);
    } catch (err) {
      res.status(400).json({err})
    }
    
})
  
// logging in
app.post("/login", async (req, res) => {
    //destructure the request. Every request has a body with a property called username and password (see the schema)
    let { username, password } = req.body;
    //find the user in the databases
    const user = await User.findOne({ username });
  
    //NEW!!!
    //look for invalid passwords and nonexistant users
    if(!user || !bcrypt.compareSync(password, user.password)){
      // return an error message saying invalid credentials
      return res.status(401).json({ error: 'Invalid Credentials' });
    }
  
    //NEW!!!
    // generate a token
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {expiresIn: '1h'});
  
    // return it in the response
    res.json({ token })
  
  })
app.use('/apparel', authCheck, ApparelRouter)




const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port ${PORT}`))