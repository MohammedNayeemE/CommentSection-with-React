
import axios from 'axios';
import { useState } from 'react';
const userID = "2";
const date = new Date();
function Reply({parentID}){
    const [list , setList] = useState([]);
    const [text , setText] = useState('');
    const addReply = async  (name , comment)=>{
        try{
            const response = await axios.post('http://localhost:5000/' , {name , comment , date , userID , parentID}) 
            console.log(response.data);
           
            setList([...list , response.data])
            }
            catch(err){
               console.log(err);
            }
            setText("");
    }
    return( 
        <>
        <div>
        <input type="text" className="replytext" placeholder="add a reply" value={text} onChange={(e) => setText(e.target.value)}/>
        <button className='reviewbtns' onClick = {(e) => addReply( "user",text )}>reply</button>
        </div>
        </>
    )
}

export default Reply;