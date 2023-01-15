const express  = require('express');
const app =  express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan')

const userRoute = require('./routes/users.js')
const authRoute = require('./routes/auth.js')
dotenv.config();

// mongo db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

// middleware connection<password>
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
 
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.get('/', (req, res) =>{
    res.send('welcom to homepage!')
})
app.get('/users', (req, res) =>{
    res.send('welcom to user page!')
})

app.listen(8082, ()=>{
    console.log('backend server is ready!')
})