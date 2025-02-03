import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Container = styled.div`
    position: relative;
`
const NewComment = styled.div`
   display : flex;
   align-items: center;
   justify-content: space-between;
   gap: 10px;
`
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Input = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    padding: 10px 10px;
    outline: none;
    color: ${({theme})=>theme.textSoft};
    width: 100%;
`

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const PostButton = styled.div`
    display: flex;
    align-items: center;
`

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 30%;
    width: 40%;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    gap:20px;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensures it stays above everything */
    color: white;
`

const FuntionalButton = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`




export default function Comments({videoId}) {

  console.log("comments id"+videoId);


  const [comment,setComment] = useState([]);
  const [addcomment,setAddComment] = useState("")
  const {user} = useSelector((state)=>state.user);
  const [popUp,setPopUp] = useState(false);
  const [updateMessage,setUpdateMessage] = useState("");
  const [commentDetails,setCommentDetails] = useState({})

  console.log("popUp",popUp)

  useEffect(()=>{
    const fetchComment = async() =>{
       const comment = await axios.get(`/comments/${videoId}`);
       console.log("here are ur comments", JSON.stringify(comment.data))
       const commentsUn = comment.data
       const orderedComments = [
           ...commentsUn.filter(comment => comment.userId === user?._id),  // My comment first
           ...commentsUn.filter(comment => comment.userId !== user?._id),  // Rest of the comments
         ];
   
       console.log("here is the ordered "+JSON.stringify(orderedComments))
       setComment(orderedComments);
    }

    fetchComment();
  },[videoId]);

  const updatedComments = async()=>{
    const comment = await axios.get(`/comments/${videoId}`);
    console.log("here are ur comments", JSON.stringify(comment.data))
    const commentsUn = comment.data
    const orderedComments = [
        ...commentsUn.filter(comment => comment.userId === user?._id),  // My comment first
        ...commentsUn.filter(comment => comment.userId !== user?._id),  // Rest of the comments
      ];

    console.log("here is the ordered "+JSON.stringify(orderedComments))
    setComment(orderedComments);
  }

  const handleComment = async(e)=>{
    e.preventDefault();
    console.log("user comment"+addcomment);
    console.log("ur update message"+updateMessage)
    const finalComment = (popUp === true) ? updateMessage : addcomment;
    console.log("ur final comment"+finalComment)

    if(popUp === true){
        const comment = await axios.post(`/comments/${commentDetails?._id}`,{desc:finalComment,videoId:videoId})
    }else{
        const comment = await axios.post(`/comments/`,{desc:finalComment,videoId:videoId})
    }
    console.log(comment.data);

    setPopUp(popUp === true && setPopUp(false));

    const updatecomment = await axios.get(`/comments/${videoId}`);
    console.log("here are ur comments", JSON.stringify(comment.data))
    const commentsUn = updatecomment.data
    const orderedComments = [
        ...commentsUn.filter(comment => comment.userId === user?._id),  // My comment first
        ...commentsUn.filter(comment => comment.userId !== user?._id),  // Rest of the comments
      ];

    console.log("here is the ordered "+JSON.stringify(orderedComments))
    setComment(orderedComments);
    setAddComment("")
    setUpdateMessage("")
  }

  

  return (
   <Container>
    {popUp === true && <Popup>  
        <Input placeholder={`Update a comment ${user?.name}`} value={updateMessage} onChange={(e)=>setUpdateMessage(e.target.value)} style={{width:'50%',color:'white'}}/>
        <FuntionalButton>
            <button onClick={()=>setPopUp(false)} style={{height:'30px',width:'fit-content',padding:'10px 20px',borderRadius:'40px',background:'gray',color:'white',font:'16px',display:'flex',alignItems:'center',border:'none',fontWeight:'500'}}>cancel</button>
            <button onClick={handleComment} style={{height:'30px',width:'fit-content',padding:'10px 20px',borderRadius:'40px',background:'gray',color:'white',font:'16px',display:'flex',alignItems:'center',border:'none',fontWeight:'500'}}>Update comment</button>
        </FuntionalButton>

    </Popup>}
    <NewComment>
        <Left>
            <Avatar src={user?.img}/>
            <Input placeholder={`Add a comment ${user?.name}`} value={addcomment} onChange={(e)=>setAddComment(e.target.value)}/>
        </Left>
        <PostButton>
            <button onClick={handleComment} style={{height:'30px',width:'fit-content',padding:'10px 20px',borderRadius:'40px',background:'gray',color:'white',font:'16px',display:'flex',alignItems:'center',border:'none',fontWeight:'500'}}>post</button>
        </PostButton>
    </NewComment>
    {
        comment?.map((comment)=>(
            <Comment key={comment._id} comment={comment} updatecomment={updatedComments} setPopUp={setPopUp} setUpdateMessage={setUpdateMessage} setCommentDetails={setCommentDetails}/>
        ))
    }
   </Container>
  )
}
