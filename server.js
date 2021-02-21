const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');//calls information from routers folder.
const methodOverride = require('method-override')
const app = express();

mongoose.connect('mongodb+srv://Arcanum:Password1@cluster0.fbckx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true,  useCreateIndex: true}, console.log('connected'))

app.set('view engine', 'ejs')//writes code in ejs and converts into html. It has to be placed before app.use

app.use(express.urlencoded({ extended: false }))//has to come first above all app.use
app.use(methodOverride('_method'))




app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})//gets every article 
    res.render('articles/index', { articles: articles })//passing objects into the index
})

app.use('/articles', articleRouter)//every change we make in articleRouter will be added to /articles

app.listen(5000)
console.log("lifted")