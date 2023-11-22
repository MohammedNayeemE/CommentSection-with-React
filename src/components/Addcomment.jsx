import { useState } from "react";
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
      <div className="form-section">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input-text"/>
      <textarea placeholder="Add your Comment" value={comment} onChange={e => setcomment(e.target.value)} className="input-text"/>
      <button className="btn" onClick={handleClick}>
        Add
      </button>
      </div>
      
      </>
      )
      
  
      
    
  }

  export default AddComment;