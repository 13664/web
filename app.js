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

app.get('/allnotes', (req, res)=>{
  fs.readFile('./data/notes.json', (err, data)=>{
    if(err) throw err 
    const allnotes = JSON.parse(data)
    res.render('allnotes', {allnotes: allnotes})

  })
})

app.get('/allnotes/:id', (req, res)=>{
  const id =req.params.id
  fs.readFile('./data/notes.json', (err, data)=>{
    if(err) throw err

    const  allnotes = JSON.parse(data)
    const note = allnotes.filter(note => note.id == id)[0]

   res.render('allnotes', {note: note})   
})
})

app.post('/create',(req, res) =>{
  const title = req.body.title
  const description = req.body.description

  if(title.trim() === '' && description.trim() === '')
    res.render('create', {error:true})
  else{
  fs.readFile('./data/notes.json', (err, data)=>{
    if(err) throw err
    
    const allnotes = JSON.parse(data)
    allnotes.push({
      id: id (),
      title: title, 
      description: description,
    })
    fs.writeFile('./data/notes.json', JSON.stringify(allnotes), err =>{
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






app.get('/:id/delete', (req, res) =>{
  const id = req.params.id

  fs.readFile('./data/notes.json', (err, data)=>{
    if(err) throw err

    const  allnotes = JSON.parse(data)
    const filteredNotes = allnotes.filter(note =>note.id != id)
    fs.writeFile('./data/notes.json', JSON.stringify(filteredNotes), (err)=>{
      if(err) throw err

      res.render('home', {allnotes: filteredNotes, deleted:true})
    })
})
app.listen(PORT, (err) => {
  if(err) throw err
  console.log(`This app is running on port ${PORT}`)
})


function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
