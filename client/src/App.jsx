import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Image from './image'



function App(){
  return(
    <>
    <Image/>
    <Header/>
    <Comments/>
    
    </>
  )

}
function Header(){
  return(
    <>
    <h1>Comments</h1>
    </>
  )
}

function Comments(){
  const [list,setList] = useState([])
  useEffect(()=>{
    const fetchComments = async ()=>{

      try{
      const Comments = await axios.get('http://localhost:5000/');
      const abc = Comments.data;
      console.log(abc);
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
  const response = await axios.post('http://localhost:5000/' , {name , comment}) 
  console.log(response.data);
 
  setList([...list , response.data])
  }
  catch(err){
     console.log(err);
  }

}


return(
  <>
  <div>
  {list.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Comment: {item.comment}</p>
        </div>
      ))}
    
  </div>

   
  <AddComment onaddComment = {addComment}/>
  
  </>
)


}
function AddComment({onaddComment}){
  
  const [name , setName] = useState("");
  const [comment , setcomment] = useState("");

  const handleClick = ()=>{
    if(name && comment){
      onaddComment(name ,  comment);
      setName("");
      setcomment("");
    }
  }

  return(
    <>
    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input text"/>
    <textarea placeholder="Add your Comment" value={comment} onChange={e => setcomment(e.target.value)} className="input text"/>
    <button className="btn" onClick={handleClick}>
      Add
    </button>

    </>
    )
    

    
  
}

export default App;


/*
{
    name:"RM",
    comment:"Hello"
  },
  {
    name:"Jin",
    comment:"Hey Stob It"
  }
  */

