import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comments from '../components/Comments'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { dislikes, fetchFailure, fetchStart, fetchSuccess, likes } from '../redux/videoSlice'
import { format, render, cancel, register } from 'timeago.js';
import { Avatar } from '@mui/material'
import { subscriptions } from '../redux/userSlice'


const Container = styled.div`
    display: flex;
    gap : 24px
`
// left
const Content = styled.div`
    flex: 5;
`
const VideoWrapper = styled.div`
    
`
const Title = styled.div`
    font-size: 18px;
    font-weight: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
    color : ${({theme})=>theme.text}
`
const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Info = styled.div`
    color: ${({theme})=>theme.textSoft};
`
const Buttons = styled.div`
    display: flex;
    gap: 10px;

`
const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({theme})=>theme.textSoft};
`


// right
const Recommendation = styled.div`
    flex: 2;
`

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme})=> theme.soft};
`

const Channel= styled.div`
    display: flex;
    justify-content: space-between;
`
const ChannelInfo = styled.div`
    display: flex;
    gap: 24px;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const ChannelDetails = styled.div`
    display: flex;
    flex-direction: column;
    color : ${({theme})=>theme.text}
`

const ChannelName = styled.span`
    font-weight: 500;
`
const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: ${({theme})=>theme.textSoft};
`
const Description = styled.p`
    font-size: 14px;
`
const Subscribe = styled.button`
    background-color : #cc1a00;
    font-weight: 500;
    color: white;
    height:fit-content;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid ${({theme})=>theme.textSoft};
`

export default function Video() {



  /* const [videos,setVideos] = useState({}); */
  /* we cant use this as change in db wont reflect in ui  */
  const [channel,setChannel] = useState({});

  const {user} = useSelector((state)=>state.user);
  const videos = useSelector((state)=>state.video?.videoUser)
 
  console.log("videoUser"+JSON.stringify(videos))

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2]
  console.log("path"+path);

  useEffect(()=>{
    const fetchData = async()=>{
       fetchStart();
       try{
         const videoRes = await axios.get(`/video/find/${path}`);
         console.log("videoRes"+JSON.stringify(videoRes.data));
         /* setVideos(videoRes.data); as this is now taken care by redux */
         dispatch(fetchSuccess(videoRes.data))
         const channelRes = await axios.get(`/user/${videoRes?.data.userId}`)
         console.log("channelRes"+JSON.stringify(channelRes.data))
         setChannel(channelRes.data)

       }
       catch(err){
         fetchFailure();
         console.log("err"+err.message);
       }

    }

    fetchData();
  },[path])


  const handleLike = async () =>{
     await axios.put(`/user/${videos?._id}/like`)
     console.log("userId like "+user?._id)
     dispatch(likes(user?._id));
  }

  const handleDisLike = async () =>{
     await axios.put(`/user/${videos?._id}/dislike`)
     console.log("userId dislike"+user?._id)
     dispatch(dislikes(user?._id));
  }

  const handleSubscription = async() => {
    if(!user?.subscribedUsers?.includes(videos?.userId)){
      await axios.post(`/user/${videos?.userId}/sub`)
    }else{
      await axios.post(`/user/${videos?.userId}/unsub`)
    }
    dispatch(subscriptions(videos?.userId))
    try{
      const videoRes = await axios.get(`/video/find/${path}`);
      const channelRes = await axios.get(`/user/${videoRes?.data.userId}`)
      console.log("channelRes"+JSON.stringify(channelRes.data))
      setChannel(channelRes.data)
    }catch(err){
 
    }
  }

  return (
    <Container>
       <Content>
         <VideoWrapper>
         <iframe
            width="100%"
            height="720"
            src={videos?.videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
         </VideoWrapper>
         <Title>{videos?.title}</Title>
         <Info>{videos?.views} views · {format(videos?.createdAt)}</Info>
         <Details>
            <Buttons>
                <Button onClick={handleLike}>
                   {videos.likes?.includes(user?._id) ?<ThumbUp/>:<ThumbUpOutlined/>}
                   {videos.likes?.length}
                </Button>
                <Button onClick={handleDisLike}>
                {videos.dislikes?.includes(user?._id) ?<ThumbDown/>:<ThumbDownOutlined/>}
                  Dislike
                </Button>
                <Button>
                  <ReplyOutlined/>
                  Share
                </Button>
                <Button>
                  <AddTaskOutlined/>
                  Save
                </Button>
            </Buttons>
         </Details>
         <Hr/>
         <Channel>
           <ChannelInfo>
             {channel?.img ? <Image src={channel?.img}/> : <Avatar/>}
             <ChannelDetails>
               <ChannelName>{channel?.name}</ChannelName>
               <ChannelCounter>{channel?.subscribers} subscriber</ChannelCounter>
               <Description>
                 {videos.desc} 
                </Description>
             </ChannelDetails>
           </ChannelInfo>
           <Subscribe onClick={handleSubscription}>{user?.subscribedUsers?.includes(videos.userId) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
         </Channel>
         <Hr/>
         <Comments videoId={videos._id}/>
       </Content>
       <Recommendation>
        
       </Recommendation>
    </Container>
  )
}
