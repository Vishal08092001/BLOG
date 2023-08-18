const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog')
const  app=express();

mongoose
.connect(
 'mongodb+srv://blog:blog@cluster0.ypfsov0.mongodb.net/'
)
.then(() => {
  console.log("database connected ");
})
.catch((error) => {
  console.log(error);
  });

app.set('view engine','ejs');
app.set('views','myviews');
app.listen(3000);



app.use(express.urlencoded({extended: true}));

  
app.get('/',(req,res)=>{
 res.redirect('/blog');
});

app.get('/about',(req,res)=>{
 res.render('about',{title: 'About' });
});

app.get('/about-us',(req,res)=>{
res.redirect('about',{title: 'About' });
 }); 

 app.get('/blog',(req,res)=>{
  Blog.find().sort ({createdAt:-1})
  .then((result)=>{
    res.render('index',{title:'All Blogs',blog:result});
  })
  .catch((err)=>{
    console.log(err);
  })
 })

 app.post('/blog',(req,res)=>{
   const blog=new Blog(req.body);
   blog.save()
   .then((result)=>{
    res.redirect('/blog');
   })
   .catch((err)=>{
    console.log(err);
   })
 })

app.get('/blog/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findById(id)
  .then(result=>{
    res.render('details',{blog:result,title:'Blog Details'});
  })
  .catch(err=>{
    console.log(err);
  })
})

app.delete('/blog/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findByIdAndDelete(id)
  .then(result=>{
       res.json({redirect: '/blog'})
  })
  .catch(err=>{
    console.log(err);
  })
})

 app.get('/blogs/create',(req,res)=>{
res.render('create',{title: 'Create' });
 }); 
   

app.use((req,res)=>{
res.status(404).render('404');
});