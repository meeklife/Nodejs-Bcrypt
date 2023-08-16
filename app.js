const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const User = require('./models/user');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(session({secret: 'notagoodsecret'}))

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username})
    const validPW = await bcrypt.compare(password, user.password);
    if(validPW){
        req.session.user_id = user._id
        res.redirect('/secret')
    }else{
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null
    // req.session.destroy()
    res.redirect('/login')
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', async(req, res) => {
    const {password, username} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save()
    req.session.user_id = user._id
    res.redirect('/secret');
})

app.get('/secret', (req,res)=>{
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    res.render('secret')
})

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})