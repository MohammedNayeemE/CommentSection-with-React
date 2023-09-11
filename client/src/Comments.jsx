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
    const [reply , setreply] = useState(false);
    useEffect(()=>{
      const fetchComments = async ()=>{
  
        try{
        const Comments = await axios.get('http://localhost:5000/');
        const abc = Comments.data;
        //console.log(abc);
        setList([...abc]);
        }
        catch(err){
          console.log(err);
        }
  
      };
  
      fetchComments();
    } , []);
    
  const addComment = async (name , comment) =>{
    try{
    const response = await axios.post('http://localhost:5000/' , {name , comment , date , userID , parentID}) 
    console.log(response.data);
   
    setList([...list , response.data])
    }
    catch(err){
       console.log(err);
    }
  
  }
  

  function handleReplyClick(){
    {reply ? (setreply(false)) : (setreply(true))}
  }
  
  return(
    <>
    <div>
    {list.map((item, index) => (
          <div key={index}>
            <p>Name: {item.name}</p>
            <p>Comment: {item.comment}</p>
            <button className="reviewbtns">Like</button>
            <button className="reviewbtns">dislike</button>
            <button className="reviewbtns" onClick={handleReplyClick}>Reply</button>
            <br/>
            {reply ? (<Reply parentID={item.userID}/>) : ''}
            
          </div>
        ))}

        
      
    </div>
  
     
    <AddComment onaddComment = {addComment}/>
    
    </>
  )
  
  
  }

  export default Comments;