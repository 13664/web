const express = require('express')
const app = express()
const fs = require('fs')
const PORT = 8000

app.set('view engine', 'pug')

app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: false}))

//localhost:8000
app.get('/',(req, res) =>{
  res.render('home')
})



app.get('/create',(req, res) =>{
  res.render('create')
})

app.post('/create',(req, res) =>{
  const title = req.body.title
  const description = req.body.description

  if(title.trim() === '' && description.trim() === '')
    res.render('create', {error:true})
  else{
  fs.readFile('./data/notes.json', (err, data)=>{
    if(err) throw err
    
    const notes = JSON.parse(data)
    notes.push({
      id: id (),
      title: title, 
      description: description,
    })
    fs.writeFile('./data/notes.json', JSON.stringify(notes), err =>{
      if(err) throw err

      res.render('create', { success: true }) 
    })
  })
  }


})

app.get('/create',(req, res) =>{
  fs.readFile('./data/notes.json', (err, data)=>{
    if(err) throw err

    const  notes = JSON.parse(data)
    res.render('create', {create: create})

  })
})





app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`This app is running on port ${PORT}`)
})


function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
