const express = require('express') ;
const app = express() ;
const characterModel = require('./models.js') ;
const bodyParser= require('body-parser') ;

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendfile('index.html') ;
})

app.get('/show', async (request, response) => {
  const characters = await characterModel.find();
  // console.log(typeof characters[1].name)
  try {
    // response.send(characters) ;
    // const characterName = Array.from(characters, x => x.name) ;
    // console.log(characterName)
    const nameAndID = tidyUp(characters) ;
    response.render('show.pug', {nameAndID});
  } catch (error) {
    response.status(500).send(error);
  }
}) ;

function tidyUp(arrayOfObject){
  const nesArray = [] ;
  arrayOfObject.forEach((item, i) => {
    nesArray.push({
      name: item.name,
      id: item._id
    })
  });
  return nesArray;
}

app.post('/show', async (request, response) => {
    const character = new characterModel(request.body);
    try {
      await character.save();
      response.redirect('/show') ;
    } catch (error) {
      response.status(500).send(error);
    }
  }) ;

// function tidyUp(arr) = {
//     const name
// }

module.exports = app ;
