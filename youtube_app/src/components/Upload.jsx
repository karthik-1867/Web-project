
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 30;
    background-color: #00000094;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 50px 50px;
    height: 600px;
    width: 600px;
    background-color: ${({theme})=>theme.bgLighter};
    color : ${({theme})=>theme.text};
    display: flex;
    flex-direction: column;
    gap:20px;
    position: relative;
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right : 10px;
    cursor: pointer;
    font-weight: 500;
`

const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
    border: 2px solid ${({theme})=>theme.soft};
    color: ${({theme})=>theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`

const Desc = styled.textarea`
    border: 2px solid ${({theme})=>theme.soft};
    color: ${({theme})=>theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    resize: none;
`

const Button = styled.button`
    height: fit-content;
    width: 100%;
    padding: 10px 20px;
    background-color: ${({theme})=>theme.soft};
    color: ${({theme})=>theme.textSoft};
    border-radius: 3px;
    border: 1px solid ${({theme})=>theme.textSoft} ;
`

export default function Upload({setOpen}) {

   const [img,setImg] = useState(undefined);
   const [video,setVideo] = useState(undefined);
//   const [title,setTitle] = useState("");
//   const [desc,setDesc] = useState("");
   const [tags,setTags] = useState([]);

    //  better way of storing input as object instead of single values leadinf to multiple useSTate
     const [input,setInput] = useState({});

     console.log("ur inpur",input)

  const handleImageUpload = async(file) => {
    console.log(file)
    const data = new FormData()
    data.append("file",file);
    data.append("upload_preset","first_time_cloudinnary")
    data.append("cloud_name","dnitpjr1v")

    const res = await fetch("https://api.cloudinary.com/v1_1/dnitpjr1v/image/upload",{
        method:"POST",
        body:data
    })

    const imageUrl = await res.json()

    setInput((prev)=>{
        return {...prev, imgUrl:imageUrl.url}
    })

  }

  const handleTags = (e) =>{
    e.preventDefault();
    setTags(e.target.value.split(","))
    setInput((prev)=>{
        return {...prev, [e.target.name]:tags}
    })
  }

  const handleVideoUpload = async(file) => {
    const data = new FormData()
    data.append("file",file);
    data.append("upload_preset","first_time_cloudinnary")
    data.append("cloud_name","dnitpjr1v")

    const res = await fetch("https://api.cloudinary.com/v1_1/dnitpjr1v/video/upload",{
        method:"POST",
        body:data
    })

    const videoUrl = await res.json()

    console.log("res data",videoUrl.url);
    setInput((prev)=>{
        return {...prev, videoUrl:videoUrl.url}
    })

  }

  useEffect(()=>{
    img && handleImageUpload(img)
  },[img])

  useEffect(()=>{
    video && handleVideoUpload(video);
  },[video])

  const handleInputData = (e) =>{
    e.preventDefault();
    setInput((prev)=>{
        return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleUploadToDb = async(e) =>{
    console.log("hanle upload td db",input);

    const res = await axios.post("/video",{...input});
    console.log("uploaded",res);
    setOpen(false);
  }


  return (
    <Container>
        <Wrapper>
          <Close onClick={()=>setOpen(false)}>X</Close>
          <Title>Upload a new video</Title>
          <Input name='videoUrl' onChange={(e)=>setVideo(e.target.files[0])} type='file' accept='video/*'/>
          <Input name='title' placeholder='title' onChange={(e)=>handleInputData(e)}/>
          <Desc name='desc' placeholder='description' rows={8} onChange={(e)=>handleInputData(e)}/>
          <Input name='tags' placeholder='separate tags with comma' onChange={handleTags}/>
          <Input name="imgUrl" onChange={(e)=>setImg(e.target.files[0])} type='file' accept='image/*'/>
          <Button onClick={(e)=>handleUploadToDb(e)}>Submit</Button>
        </Wrapper>
    </Container>
  )
}
