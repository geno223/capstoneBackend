require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)

const db= mongoose.connection
db.on('error', (err)=>console.log(err.message + 'sum wrong')) 
db.on('connected', ()=>console.log('mongoose connected'))
db.on("disconnected", ()=>console.log('mongoose disco'))

