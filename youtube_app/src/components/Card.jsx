import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Hill from '../img/hill.png'
import { Link } from 'react-router-dom'
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';

const Container = styled.div`
    width: ${(props)=>props.type !== "sm"&&"360px"};
    margin-bottom:${(props)=>props.type=="sm"?"10px":"45px"};
    display: ${(props)=>props.type=="sm"&&"flex"};
    gap : 10px;
    
`
const Image = styled.img`
    width: 100%;
    height: ${(props)=>props.type=="sm"?"100px":"202px"};
    background-color: #999;
    flex: 1;
`

const Details = styled.div`
    display: flex;
    margin-top: ${(props)=>props.type!=="sm"&&"16px"};
    gap : 20px;
    flex: 1;

`
const ChannelImage = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 50%;
    display: ${(props)=>props.type=='sm'&&'none'};
    
`
const Texts = styled.div`
    
`

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color : ${({theme}) => theme.text};

`

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme})=> theme.textSoft};
    margin: 5px 0px;
`

const Info = styled.div`
    font-size: 15px;
    color: ${({theme}) => theme.textSoft};
`


export default function Card({type,cardData}) {

const [channel,setChannel] = useState({});


  useEffect(()=>{
    const fetchChannel = async() => {
        const res = await axios.get(`/user/${cardData.userId}`)
        console.log("channel"+res.data.name)
        setChannel(res.data);

        
    }

    fetchChannel();

  },[cardData.userId])

  console.log("card data",channel)

  return (
    <Link to={`/video/${cardData?._id}`} style={{textDecoration:'none',color:'inherit'}}>
    <Container type={type}>
        <Image type={type} src={cardData?.imgUrl}/>
        <Details type={type}>
            <ChannelImage type={type} src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo'/>
            <Texts>
                <Title>{cardData?.title}</Title>
                <Info>{cardData?.views} views · {format(cardData?.createdAt)}</Info>
                <ChannelName>{channel?.name}</ChannelName>
            </Texts>
        </Details>
    </Container>
    </Link>
  )
}
