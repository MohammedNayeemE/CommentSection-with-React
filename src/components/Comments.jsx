import React from "react";

import AddComment from "./Addcomment"
import Reply from "./ReplyAddcomment"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
const userID = "1";
const parentID = null;
const date = new Date();
function Comments(){
    const [list,setList] = useState([])
    const [replystates , setreplystates] = useState([]);
    useEffect(()=>{
      const fetchComments = async ()=>{
  
        try{
        const Comments = await axios.get('http://localhost:5000/');
        const abc = Comments.data;
        //console.log(abc);
        setreplystates(new Array(abc.length).fill(false));

        const nestedc = nestedCommments(abc);
        setList([...nestedc]);
        }
        catch(err){
          console.log(err);
        }
  
      };
  
      fetchComments();
    } , []);

    const nestedCommments = (comments)=>{
      const nested = [];
      const commentMap = {};

      comments.forEach(comment => {
        commentMap[comment.userID] = comment;
        comment.replies = [];
        
      });
      comments.forEach((comment) =>{
        if(comment.parentID !== null){
          const parentComment = commentMap[comment.parentID];
          if(parentComment){
            parentComment.replies.push(comment);
          }
        }
        else{
          nested.push(comment);
        }
      })

      return nested;

    }
    
  const addComment = async (name , comment) =>{
    try{
    const response = await axios.post('http://localhost:5000/' , {name , comment , date , userID , parentID}) 
    console.log(response.data);
   
    setList([...list , response.data])

    setreplystates(new Array(updatedList.length).fill(false));
    }
    catch(err){
       console.log(err);
    }
  
  }
  

  function handleReplyClick(index){
    const updatereplyStatus = [... replystates];
    updatereplyStatus[index] = !updatereplyStatus[index];
    setreplystates(updatereplyStatus);
   
  }
 
  return(
    <>
    <div>
    {list.map((item, index) => (
          <div key={index}>
            <img src="src/usercomment.png" alt="" style={{width:'50px'}}/>
           
            <p>Name: {item.name}</p>
            <p>Comment: {item.comment}</p>
            <button className="reviewbtns">Like</button>
            <button className="reviewbtns">dislike</button>
            <button className="reviewbtns" onClick={()=> handleReplyClick(index)}>Show Replies</button>
            <br/>
            {replystates[index] && <Reply parentID={item.userID}/>}
            {replystates[index] && 

              item.replies.length > 0 && (
                <div style={{ marginLeft: '20px', marginBottom:'20px' , marginTop:'20px' }} className="replies">
                  {item.replies.map((reply, replyIndex) => (
                    
                    <div key={replyIndex} style={{marginLeft:'5px'}}>
                      <img src="src/usercomment.png" alt="" style={{ width: '50px' }} />
                      
                      <p>Name: {reply.name}</p>
                      <p>Comment: {reply.comment}</p>
                      <button className="reviewbtns">Like</button>
                      <button className="reviewbtns">dislike</button>
                    </div>
                  ))}
                </div>
              )}
            
          
        
            
            
            
          </div>
        ))}

        
      
    </div>
  
     
    <AddComment onaddComment = {addComment}/>
    
    </>
  )
  
  
  }
 

  export default Comments;
