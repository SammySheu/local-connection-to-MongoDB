const express = require('express') ;
const app = express() ;
const router = require('./routes') ;

const mongoose = require('mongoose') ;
const url = 'mongodb://127.0.0.1:27017/game-of-thrones' ;

mongoose.connect(url, {useNewUrlParser: true}) ;

const db = mongoose.connection ;
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.set('view engine', 'pug') ;

app.use(express.json()) ;
app.use(router) ;

app.listen(3000, () => {
  console.log('Server is running on port 3000') ;
})
