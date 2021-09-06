require('dotenv').config()
const express= require('express');
const articleRouter= require('./routes/articles');
const Article= require('./models/articles');
const mongoose= require('mongoose');
const methodOverride= require('method-override');
const app= express();
const PORT= process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.set('view engine','ejs');

const DB= process.env.DATABASE_URL.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);


mongoose.connect(DB,{
    useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(connection => console.log('DATABASE CONNECTED'));



app.use('/articles',articleRouter);

app.get('/',async (req,res) =>{
    const articles = await Article.find().sort({ createdAt: 'desc'});
    
    res.render('articles/index',{articles: articles});
})



app.listen(PORT,() =>{
    console.log(`Server have been started on port ${PORT}`)
})