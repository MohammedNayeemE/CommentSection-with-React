const express = require('express');
const cors = require('cors');
const {connectToDb , getdb} = require('./db');

const app = express();

app.use(express.json());

app.use(cors());






connectToDb((err) =>{
    if(!err){
        app.listen(5000, ()=>{
            console.log("working .....");
        })

        

      
    }


})

app.get('/' , (req , res) =>{
    const db = getdb();
    const list = [];
    db.collection('comments').find().project({_id:0})
    .forEach(element => {
        list.push(element);
    })
    .then(()=>{
        res.status(200).json(list);
    })
    .catch((err) =>{
        res.status(500).json({err:"Cant Fetch"})
    });
});

app.post('/' ,  (req , res) =>{
    const post = req.body;
    const db = getdb();
    
        db.collection('comments').insertOne(
           post
        )
        .then(result=>{
           res.status(201).json(post);
           console.log(result);
        })
        .catch(err =>{
            res.status(500).json({err : "Some Error Occured"})
        })
    
})


 /*       const list=  [];
db.collection('comments').find().project({_id:0})
.forEach(element => {
    list.push(element);
})
.then(()=>{
    console.log(list);
})
.catch((err)=>{
    console.log(err);
})
app.get('/' , (req , res) =>{
        const list =[];
        db.collection('comments').find().project({_id:0}).
        forEach(element => {
            list.push(element);
        })
        .then(()=>{
            res.status(200).json(list);
        })
        .catch((err) =>{
            res.status(500).json({err:"ERrOR"});
        })
        
        
      })





       try{
        const db = getdb();
        const comments =  await db.collection('comments').findOne();
      //  console.log(comments);
       const commentsArray = await comments.toArray();
       console.log(commentsArray);
        res.status(200).json(commentsArray);
    }
    catch(err){
        res.status(500).json({err : "Cant fetch"})
    }
*/






