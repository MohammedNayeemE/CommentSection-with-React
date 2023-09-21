
const sortByDateOld = async () =>{
try{
const sortedDocuments = await collection.find().sort({ date: 1 }).toArray();
return sortedDocuments;
}
  catch(e){
    return e.getMessage();
  }
}
const sortByDateNew = async () =>{
try{
const sortedDocuments = await collection.find().sort({ date: -1 }).toArray();
return sortedDocuments;
}
  catch(e){
    return e.getMessage();
  }
}
const sortByLikes = asyns () =>{
try{
  const sortedDocuments = await collection('users').find().sort({Likes : -1}).toArray();
  return sortedDocuments;
}
  catch(e){
    return e.getMessage();
  }
}

const sortByDisLikes = async ()=>{
  try{
    const sortedDocuments = await collection('user').find().sort({Dislikes : -1}).toArray();
    return sortedDocumnets;
  }
  catch(e){
    return e.getMessage();
  }
}




