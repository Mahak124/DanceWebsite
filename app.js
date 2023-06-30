const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
}

// define mongoose schema now
const ContactSchema = new mongoose.Schema({
  myName: String,
  myGender: String,
  myAge: String,
  myContact: String,
  myaddress: String,
  myconcern: String,
  myEmail: String
});
const Contact = mongoose.model('Contact', ContactSchema);

const app = express();
const port = 8000;

// express specific stuff
app.use('/static' , express.static('static'));
app.use(express.urlencoded());

// pug specific stuff
app.set('view engine' , 'pug');
app.set('views' , path.join(__dirname , 'views'));

app.get('/', (req, res) => {
  const params = { }
  res.status(200).render('home.pug' , params)
});

app.get('/contact', (req, res) => {
  const params = { }
  res.status(200).render('contact.pug' , params)
});

app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the database")
  }).catch(()=>{
    res.status(404).send("Item has not been saved to the database.")
  });
});

// start the localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 