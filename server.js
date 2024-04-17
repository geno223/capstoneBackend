require('dotenv').config();
const express = require('express');
const morgan= require('morgan');
require('./models/connections')
const cors = require('cors')
const ApparelRouter = require('./controllers/apparel')


const app = express();


///MIDDLEWRE
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


//ROUTES
app.use('/apparel', ApparelRouter)




const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port ${PORT}`))