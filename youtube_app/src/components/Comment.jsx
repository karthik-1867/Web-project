import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import { Avatar, Avatar1Group } from '@mui/material';
import { AvTimerRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';


const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px;
`
const Avatar1 = styled.img`
    width: 50px;
    height:50px;
    border-radius: 50%;
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${({theme})=>theme.text};
`

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme})=>theme.textSoft};
    margin-left: 5px;
`
const Text = styled.span`
     color: ${({theme})=>theme.text};
`

const PostButton = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const FulContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`


export default function Comment({comment,updatecomment,setPopUp,setUpdateMessage,setCommentDetails}) {

  console.log("reched comment in comment sceo"+JSON.stringify(comment))



  const [isHover,setIsHover] = useState(false);
  const [channel,setChannel] = useState({});
  const user = useSelector(state=>state.user.user);


  useEffect(()=>{
    const fetchChannel = async()=>{
        const channel = await axios.get(`/user/${comment.userId}`)
        console.log("channel detaik in commentr "+JSON.stringify(channel.data));
        setChannel(channel.data);
    }

    fetchChannel();
  },[comment?.userId])

  const handleDelete = async() =>{
     const deleteComment = await axios.delete(`/comments/${comment._id}`);
     console.log("u deleted ",deleteComment);
     updatecomment();
  }

  const handleUpdate = async() =>{
    console.log("handle update called")
    setPopUp(true);
    setUpdateMessage(comment.desc);
    setCommentDetails(comment)
  }

  console.log("cuuren"+JSON.stringify(channel?.name))
  return (
    <FulContainer style={{background: isHover ? '#aaaaaa':'none',borderRadius:'50px',transition:'all 0.5s ease'}} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

    <Container>
        {channel?.img ? <Avatar1 src={channel?.img}/> : <Avatar style={{height:'50px',width:'50px'}}/>}
        <Details>
            <Name>{channel?.name} <Date>{format(comment.createdAt)}</Date></Name>
            <Text>{comment.desc}</Text>

        </Details>
    </Container>
        <PostButton>
                <button onClick={handleDelete} style={{height:'30px',width:'fit-content',padding:'10px 20px',borderRadius:'40px',background:'black',color:'white',font:'16px',display:'flex',opacity: isHover && comment.userId==user._id ? '1' : '0',alignItems:'center',border:'none',fontWeight:'500', transition:'all 0.5s ease',marginRight:'10px',borderRadius:'50px'}}>Delete</button>
                <button onClick={handleUpdate} style={{height:'30px',width:'fit-content',padding:'10px 20px',borderRadius:'40px',background:'black',color:'white',font:'16px',display:'flex',opacity: isHover && comment.userId==user._id ? '1' : '0',alignItems:'center',border:'none',fontWeight:'500', transition:'all 0.5s ease',marginRight:'10px',borderRadius:'50px'}}>Update</button>
        </PostButton>
    </FulContainer>
  )
}
