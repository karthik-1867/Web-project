import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from "axios"
import { useSelector } from 'react-redux'
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap : wrap;

`

export default function Home() {

  const [videos,setVideos] = useState([]);

  const user = useSelector(state=>state.user.user);
  console.log("user"+user?.name)

  useEffect(()=>{
    console.log("use effect called")
    const fetchVideos = async()=> {
      const res = await axios.get("/video/random");
      console.log(res.data)
      setVideos(res.data)
      console.log("axioz called")
    }

    fetchVideos();
  },[])

  return (
     <Container>
      {
        videos.map((video)=>(
          <Card key={video.id} cardData={video}/>
        ))
      }
     </Container>
  )
}
